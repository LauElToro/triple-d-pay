/**
 * Set-Api API client.
 *
 * - Access token lives in memory only (never in localStorage) and is sent as a
 *   Bearer header.
 * - The refresh token is an httpOnly cookie managed by the backend; requests
 *   use `credentials: "include"` so it travels automatically.
 * - On a 401 the client transparently tries to refresh once and retries.
 */

const DEFAULT_API_URL = import.meta.env.PROD
  ? "https://set-api-backend.vercel.app"
  : "http://localhost:4000";

export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() || DEFAULT_API_URL;

let accessToken: string | null = null;
let activeOrgId: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function setActiveOrgId(orgId: string | null) {
  activeOrgId = orgId;
}

export function getActiveOrgId(): string | null {
  return activeOrgId;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: unknown,
    public requestId?: string,
    public retryAfter?: number
  ) {
    super(message);
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Skip the automatic refresh-and-retry on 401 (used by refresh itself). */
  skipRefresh?: boolean;
  auth?: boolean;
}

async function raw(path: string, opts: RequestOptions = {}): Promise<Response> {
  const headers = new Headers(opts.headers);
  if (opts.body !== undefined) headers.set("Content-Type", "application/json");
  if (accessToken && opts.auth !== false) headers.set("Authorization", `Bearer ${accessToken}`);
  if (activeOrgId) headers.set("X-Org-Id", activeOrgId);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    return await fetch(`${API_URL}${path}`, {
      ...opts,
      headers,
      credentials: "include",
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal ?? controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

let refreshPromise: Promise<boolean> | null = null;

export async function refreshSession(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await raw("/api/auth/refresh", { method: "POST", auth: false, skipRefresh: true });
        if (!res.ok) return false;
        const data = await res.json();
        accessToken = data.accessToken;
        return true;
      } catch {
        return false;
      } finally {
        // allow the next refresh cycle
        setTimeout(() => (refreshPromise = null), 0);
      }
    })();
  }
  return refreshPromise;
}

export async function apiFetch<T = unknown>(path: string, opts: RequestOptions = {}): Promise<T> {
  let res: Response;
  try {
    res = await raw(path, opts);
  } catch (cause) {
    const message = cause instanceof DOMException && cause.name === "AbortError"
      ? "La solicitud tardó demasiado"
      : "No se pudo conectar con Set-Api";
    throw new ApiError(0, message, cause instanceof DOMException ? "timeout" : "network_error");
  }

  if (res.status === 401 && !opts.skipRefresh && opts.auth !== false) {
    const refreshed = await refreshSession();
    if (refreshed) {
      try {
        res = await raw(path, opts);
      } catch {
        throw new ApiError(0, "No se pudo renovar la sesión", "refresh_network_error");
      }
    }
  }

  const text = await res.text();
  let data: { error?: string; code?: string; details?: unknown } | null = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: "Respuesta inválida del servidor", code: "invalid_response" };
    }
  }

  if (!res.ok) {
    const retryAfterRaw = res.headers.get("retry-after");
    const retryAfter = retryAfterRaw ? Number(retryAfterRaw) : undefined;
    throw new ApiError(
      res.status,
      data?.error ?? "Error de API",
      data?.code,
      data?.details,
      res.headers.get("x-correlation-id") ?? undefined,
      Number.isFinite(retryAfter) ? retryAfter : undefined
    );
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "POST", body }),
  patch: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "PATCH", body }),
  put: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "PUT", body }),
  del: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" }),
  async download(path: string, filename: string): Promise<void> {
    let res = await raw(path, { method: "GET" });
    if (res.status === 401) {
      const refreshed = await refreshSession();
      if (refreshed) res = await raw(path, { method: "GET" });
    }
    if (!res.ok) {
      const text = await res.text();
      let data: { error?: string; code?: string } | null = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        // ignore
      }
      throw new ApiError(res.status, data?.error ?? "Error de descarga", data?.code);
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },
};
