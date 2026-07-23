import { r as __toESM } from "../_runtime.mjs";
import { n as api, t as ApiError } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as LogoMark } from "./logo-CE7-q2wi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ShieldCheck, g as LoaderCircle } from "../_libs/lucide-react.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kyc-CpKZv-4d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KycPage() {
	const { user, hydrated, refreshMe } = useAuth();
	const navigate = useNavigate();
	const [status, setStatus] = (0, import_react.useState)("NOT_STARTED");
	const [starting, setStarting] = (0, import_react.useState)(false);
	const [checking, setChecking] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (hydrated && !user) navigate({ to: "/login" });
	}, [
		hydrated,
		user,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		if (user.systemRole === "SUPERADMIN" || user.kycStatus === "APPROVED") {
			navigate({ to: "/app" });
			return;
		}
		api.get("/api/kyc/status").then((d) => setStatus(d.kycStatus)).catch(() => void 0);
	}, [user, navigate]);
	const start = async () => {
		setStarting(true);
		try {
			const { url } = await api.post("/api/kyc/session");
			window.location.href = url;
		} catch (err) {
			toast.error(err instanceof ApiError ? err.message : "No se pudo iniciar la verificación");
			setStarting(false);
		}
	};
	const recheck = async () => {
		setChecking(true);
		try {
			const d = await api.get("/api/kyc/status");
			setStatus(d.kycStatus);
			if (d.kycStatus === "APPROVED") {
				await refreshMe();
				navigate({ to: "/app" });
			} else toast.info("Todavía no está aprobada. Probá de nuevo en unos minutos.");
		} finally {
			setChecking(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 flex items-center justify-center px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "w-full max-w-md border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 font-display text-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6 text-signal" }), " Verificación de identidad"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate",
					children: "Para operar en Triple D necesitás completar la verificación KYC. Es un paso único y seguro."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-mono text-slate",
							children: ["Estado: ", status]
						}),
						status === "DECLINED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-red-600",
							children: "La verificación fue rechazada. Podés reintentar el proceso."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: start,
							disabled: starting,
							children: starting ? "Redirigiendo…" : status === "PENDING" ? "Continuar verificación" : "Iniciar verificación"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "w-full",
							onClick: recheck,
							disabled: checking,
							children: checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Ya la completé — verificar"
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { KycPage as component };
