import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  api,
  refreshSession,
  setAccessToken,
  setActiveOrgId,
} from "./api";
import type {
  AuthResponse,
  OrgSummary,
  SessionUser,
  TwoFactorChallenge,
  VerifyEmailChallenge,
  PlanId,
  Permission,
} from "./api-types";

type LoginOutcome = { status: "ok" } | TwoFactorChallenge;
type RegisterOutcome = VerifyEmailChallenge;

interface AuthState {
  user: SessionUser | null;
  organizations: OrgSummary[];
  activeOrg: OrgSummary | null;
  hydrated: boolean;
  issuedKey: string | null;

  register: (input: {
    email: string;
    password: string;
    name?: string;
    plan?: PlanId;
  }) => Promise<RegisterOutcome>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  login: (email: string, password: string) => Promise<LoginOutcome>;
  loginWithGoogle: (credential: string) => Promise<LoginOutcome>;
  verifyTwoFactor: (pendingToken: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
  selectOrg: (orgId: string) => void;
  setIssuedKey: (key: string | null) => void;
  hasPermission: (p: Permission) => boolean;
}

const AuthContext = createContext<AuthState | null>(null);

// Refresh a bit before the 2h access token expires.
const REFRESH_INTERVAL_MS = 110 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [organizations, setOrganizations] = useState<OrgSummary[]>([]);
  const [activeOrg, setActiveOrg] = useState<OrgSummary | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [issuedKey, setIssuedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadMe = async () => {
    const data = await api.get<{
      user: SessionUser;
      organizations: OrgSummary[];
      activeOrg: OrgSummary | null;
    }>("/api/me");
    setUser(data.user);
    setOrganizations(data.organizations);
    const active = data.activeOrg ?? data.organizations[0] ?? null;
    setActiveOrg(active);
    setActiveOrgId(active?.id ?? null);
  };

  const applySession = async (auth: AuthResponse) => {
    setAccessToken(auth.accessToken);
    setUser(auth.user);
    await loadMe();
  };

  // Bootstrap: try to silently restore a session via the refresh cookie.
  useEffect(() => {
    (async () => {
      const ok = await refreshSession();
      if (ok) {
        try {
          await loadMe();
        } catch {
          setUser(null);
        }
      }
      setHydrated(true);
    })();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  // Auto-refresh loop while authenticated.
  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (user) {
      timer.current = setInterval(() => {
        refreshSession();
      }, REFRESH_INTERVAL_MS);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [user]);

  const register: AuthState["register"] = async (input) => {
    return api.post<VerifyEmailChallenge>("/api/auth/register", input);
  };

  const verifyEmail: AuthState["verifyEmail"] = async (email, code) => {
    const auth = await api.post<AuthResponse>("/api/auth/verify-email", { email, code });
    await applySession(auth);
  };

  const login: AuthState["login"] = async (email, password) => {
    const res = await api.post<AuthResponse | TwoFactorChallenge>("/api/auth/login", {
      email,
      password,
    });
    if ("status" in res && res.status === "twofa_required") return res;
    await applySession(res as AuthResponse);
    return { status: "ok" };
  };

  const loginWithGoogle: AuthState["loginWithGoogle"] = async (credential) => {
    const res = await api.post<AuthResponse | TwoFactorChallenge>("/api/auth/google", { credential });
    if ("status" in res && res.status === "twofa_required") return res;
    await applySession(res as AuthResponse);
    return { status: "ok" };
  };

  const verifyTwoFactor: AuthState["verifyTwoFactor"] = async (pendingToken, code) => {
    // Use the pending token directly for this single call.
    setAccessToken(pendingToken);
    const auth = await api.post<AuthResponse>("/api/auth/2fa/verify", { code });
    await applySession(auth);
  };

  const logout: AuthState["logout"] = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // ignore
    }
    setAccessToken(null);
    setActiveOrgId(null);
    setUser(null);
    setOrganizations([]);
    setActiveOrg(null);
    setIssuedKey(null);
  };

  const refreshMe: AuthState["refreshMe"] = async () => {
    await loadMe();
  };

  const selectOrg: AuthState["selectOrg"] = (orgId) => {
    const org = organizations.find((o) => o.id === orgId) ?? null;
    setActiveOrg(org);
    setActiveOrgId(org?.id ?? null);
  };

  const hasPermission: AuthState["hasPermission"] = (p) =>
    Boolean(activeOrg?.permissions?.includes(p)) || user?.systemRole === "SUPERADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        organizations,
        activeOrg,
        hydrated,
        issuedKey,
        register,
        verifyEmail,
        login,
        loginWithGoogle,
        verifyTwoFactor,
        logout,
        refreshMe,
        selectOrg,
        setIssuedKey,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
