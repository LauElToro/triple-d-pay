import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { generateKeyPlaintext, type MockUser, type PlanId } from "./mock-data";

interface AuthState {
  user: MockUser | null;
  issuedKey: string | null;
  hydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, plan: PlanId) => Promise<void>;
  logout: () => void;
  selectPlan: (plan: PlanId) => void;
  clearIssuedKey: () => void;
}

const AuthContext = createContext<AuthState | null>(null);
const SESSION_KEY = "td_session";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "u_" + Math.random().toString(36).slice(2, 12);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [issuedKey, setIssuedKey] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const persist = (u: MockUser | null) => {
    setUser(u);
    try {
      if (u) sessionStorage.setItem(SESSION_KEY, JSON.stringify(u));
      else sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  };

  const login = async (email: string, _password: string) => {
    persist({
      id: uuid(),
      email,
      planId: "free",
      createdAt: new Date().toISOString(),
    });
  };

  const register = async (email: string, _password: string, plan: PlanId) => {
    persist({
      id: uuid(),
      email,
      planId: plan,
      createdAt: new Date().toISOString(),
    });
    setIssuedKey(generateKeyPlaintext());
  };

  const logout = () => {
    persist(null);
    setIssuedKey(null);
  };

  const selectPlan = (plan: PlanId) => {
    if (!user) return;
    persist({ ...user, planId: plan });
  };

  const clearIssuedKey = () => setIssuedKey(null);

  return (
    <AuthContext.Provider
      value={{ user, issuedKey, hydrated, login, register, logout, selectPlan, clearIssuedKey }}
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
