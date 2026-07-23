import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { api, refreshSession, setAccessToken, setActiveOrgId } from "@/lib/api";
import type {
  AuthResponse,
  OrgSummary,
  Permission,
  PlanId,
  SessionUser,
  TwoFactorChallenge,
  VerifyEmailChallenge,
} from "@/lib/api-types";

type LoginResult = AuthResponse | TwoFactorChallenge;
type RegisterInput = {
  email: string;
  password: string;
  name?: string;
  plan?: PlanId;
  orgName?: string;
};

interface AuthState {
  user: SessionUser | null;
  organizations: OrgSummary[];
  activeOrg: OrgSummary | null;
  hydrated: boolean;
  issuedKey: string | null;
  register: (input: RegisterInput) => Promise<VerifyEmailChallenge>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  login: (email: string, password: string) => Promise<LoginResult>;
  loginWithGoogle: (credential: string) => Promise<LoginResult>;
  verifyTwoFactor: (pendingToken: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
  selectOrg: (orgId: string) => void;
  selectPlan: (plan: PlanId) => Promise<void>;
  setIssuedKey: (key: string | null) => void;
  clearIssuedKey: () => void;
  hasPermission: (p: Permission) => boolean;
}

const AuthContext = createContext<AuthState | null>(null);

/** Refresh a bit before the 2h access token expires. */
const REFRESH_INTERVAL_MS = 6600 * 1000;

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
    setActiveOrg((prev) => {
      const preferred =
        (prev ? data.organizations.find((o) => o.id === prev.id) : undefined) ??
        data.activeOrg ??
        data.organizations[0] ??
        null;
      setActiveOrgId(preferred?.id ?? null);
      return preferred;
    });
  };

  const applySession = async (auth: AuthResponse) => {
    setAccessToken(auth.accessToken);
    setUser(auth.user);
    await loadMe();
  };

  useEffect(() => {
    (async () => {
      if (await refreshSession()) {
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

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (user) {
      timer.current = setInterval(() => {
        void refreshSession();
      }, REFRESH_INTERVAL_MS);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [user]);

  const register = async (input: RegisterInput) => {
    return api.post<VerifyEmailChallenge>("/api/auth/register", input);
  };

  const verifyEmail = async (email: string, code: string) => {
    const auth = await api.post<AuthResponse>("/api/auth/verify-email", {
      email,
      code,
    });
    await applySession(auth);
  };

  const login = async (email: string, password: string): Promise<LoginResult> => {
    const res = await api.post<AuthResponse | TwoFactorChallenge>("/api/auth/login", {
      email,
      password,
    });
    if ("status" in res && res.status === "twofa_required") return res;
    await applySession(res as AuthResponse);
    return res as AuthResponse;
  };

  const loginWithGoogle = async (credential: string): Promise<LoginResult> => {
    const res = await api.post<AuthResponse | TwoFactorChallenge>("/api/auth/google", {
      credential,
    });
    if ("status" in res && res.status === "twofa_required") return res;
    await applySession(res as AuthResponse);
    return res as AuthResponse;
  };

  const verifyTwoFactor = async (pendingToken: string, code: string) => {
    setAccessToken(pendingToken);
    const auth = await api.post<AuthResponse>("/api/auth/2fa/verify", { code });
    await applySession(auth);
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // ignore network errors on logout
    }
    setAccessToken(null);
    setActiveOrgId(null);
    setUser(null);
    setOrganizations([]);
    setActiveOrg(null);
    setIssuedKey(null);
  };

  const refreshMe = async () => {
    await loadMe();
  };

  const selectOrg = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId) ?? null;
    setActiveOrg(org);
    setActiveOrgId(org?.id ?? null);
  };

  const selectPlan = async (plan: PlanId) => {
    await api.patch("/api/organizations", { planId: plan });
    await loadMe();
  };

  const hasPermission = (p: Permission) =>
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
        selectPlan,
        setIssuedKey,
        clearIssuedKey: () => setIssuedKey(null),
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
