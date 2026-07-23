import { r as __toESM } from "../_runtime.mjs";
import { a as setActiveOrgId, i as setAccessToken, n as api, r as refreshSession } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-CNJ3HpJu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
var REFRESH_INTERVAL_MS = 6600 * 1e3;
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [organizations, setOrganizations] = (0, import_react.useState)([]);
	const [activeOrg, setActiveOrg] = (0, import_react.useState)(null);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [issuedKey, setIssuedKey] = (0, import_react.useState)(null);
	const timer = (0, import_react.useRef)(null);
	const loadMe = async () => {
		const data = await api.get("/api/me");
		setUser(data.user);
		setOrganizations(data.organizations);
		const active = data.activeOrg ?? data.organizations[0] ?? null;
		setActiveOrg(active);
		setActiveOrgId(active?.id ?? null);
	};
	const applySession = async (auth) => {
		setAccessToken(auth.accessToken);
		setUser(auth.user);
		await loadMe();
	};
	(0, import_react.useEffect)(() => {
		(async () => {
			if (await refreshSession()) try {
				await loadMe();
			} catch {
				setUser(null);
			}
			setHydrated(true);
		})();
		return () => {
			if (timer.current) clearInterval(timer.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (timer.current) clearInterval(timer.current);
		if (user) timer.current = setInterval(() => {
			refreshSession();
		}, REFRESH_INTERVAL_MS);
		return () => {
			if (timer.current) clearInterval(timer.current);
		};
	}, [user]);
	const register = async (input) => {
		return api.post("/api/auth/register", input);
	};
	const verifyEmail = async (email, code) => {
		const auth = await api.post("/api/auth/verify-email", {
			email,
			code
		});
		await applySession(auth);
	};
	const login = async (email, password) => {
		const res = await api.post("/api/auth/login", {
			email,
			password
		});
		if ("status" in res && res.status === "twofa_required") return res;
		await applySession(res);
		return { status: "ok" };
	};
	const loginWithGoogle = async (credential) => {
		const res = await api.post("/api/auth/google", { credential });
		if ("status" in res && res.status === "twofa_required") return res;
		await applySession(res);
		return { status: "ok" };
	};
	const verifyTwoFactor = async (pendingToken, code) => {
		setAccessToken(pendingToken);
		const auth = await api.post("/api/auth/2fa/verify", { code });
		await applySession(auth);
	};
	const logout = async () => {
		try {
			await api.post("/api/auth/logout");
		} catch {}
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
	const selectOrg = (orgId) => {
		const org = organizations.find((o) => o.id === orgId) ?? null;
		setActiveOrg(org);
		setActiveOrgId(org?.id ?? null);
	};
	const hasPermission = (p) => Boolean(activeOrg?.permissions?.includes(p)) || user?.systemRole === "SUPERADMIN";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
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
			hasPermission
		},
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
