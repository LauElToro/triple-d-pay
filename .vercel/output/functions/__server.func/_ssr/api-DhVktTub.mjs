//#region node_modules/.nitro/vite/services/ssr/assets/api-DhVktTub.js
/**
* Triple D API client.
*
* - Access token lives in memory only (never in localStorage) and is sent as a
*   Bearer header.
* - The refresh token is an httpOnly cookie managed by the backend; requests
*   use `credentials: "include"` so it travels automatically.
* - On a 401 the client transparently tries to refresh once and retries.
*/
var API_URL = "http://localhost:4000";
var accessToken = null;
var activeOrgId = null;
function setAccessToken(token) {
	accessToken = token;
}
function setActiveOrgId(orgId) {
	activeOrgId = orgId;
}
var ApiError = class extends Error {
	status;
	code;
	details;
	constructor(status, message, code, details) {
		super(message);
		this.status = status;
		this.code = code;
		this.details = details;
	}
};
async function raw(path, opts = {}) {
	const headers = new Headers(opts.headers);
	if (opts.body !== void 0) headers.set("Content-Type", "application/json");
	if (accessToken && opts.auth !== false) headers.set("Authorization", `Bearer ${accessToken}`);
	if (activeOrgId) headers.set("X-Org-Id", activeOrgId);
	return fetch(`${API_URL}${path}`, {
		...opts,
		headers,
		credentials: "include",
		body: opts.body !== void 0 ? JSON.stringify(opts.body) : void 0
	});
}
var refreshPromise = null;
async function refreshSession() {
	if (!refreshPromise) refreshPromise = (async () => {
		try {
			const res = await raw("/api/auth/refresh", {
				method: "POST",
				auth: false,
				skipRefresh: true
			});
			if (!res.ok) return false;
			accessToken = (await res.json()).accessToken;
			return true;
		} catch {
			return false;
		} finally {
			setTimeout(() => refreshPromise = null, 0);
		}
	})();
	return refreshPromise;
}
async function apiFetch(path, opts = {}) {
	let res = await raw(path, opts);
	if (res.status === 401 && !opts.skipRefresh && opts.auth !== false) {
		if (await refreshSession()) res = await raw(path, opts);
	}
	const text = await res.text();
	const data = text ? JSON.parse(text) : null;
	if (!res.ok) throw new ApiError(res.status, data?.error ?? "Error de red", data?.code, data?.details);
	return data;
}
var api = {
	get: (path) => apiFetch(path, { method: "GET" }),
	post: (path, body) => apiFetch(path, {
		method: "POST",
		body
	}),
	patch: (path, body) => apiFetch(path, {
		method: "PATCH",
		body
	}),
	put: (path, body) => apiFetch(path, {
		method: "PUT",
		body
	}),
	del: (path) => apiFetch(path, { method: "DELETE" })
};
//#endregion
export { setActiveOrgId as a, setAccessToken as i, api as n, refreshSession as r, ApiError as t };
