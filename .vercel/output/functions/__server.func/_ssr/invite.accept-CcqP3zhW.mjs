import { r as __toESM } from "../_runtime.mjs";
import { n as api, t as ApiError } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as LogoMark } from "./logo-CE7-q2wi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./invite.accept-DFfobD0l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invite.accept-CcqP3zhW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AcceptInvite() {
	const { token } = Route.useSearch();
	const { user, hydrated, refreshMe } = useAuth();
	const navigate = useNavigate();
	const [status, setStatus] = (0, import_react.useState)("idle");
	const accept = async () => {
		if (!token) return;
		setStatus("joining");
		try {
			await api.post("/api/team/invitations/accept", { token });
			await refreshMe();
			setStatus("done");
			toast.success("Te uniste a la organización");
			setTimeout(() => navigate({ to: "/app" }), 1e3);
		} catch (err) {
			setStatus("error");
			toast.error(err instanceof ApiError ? err.message : "No se pudo aceptar la invitación");
		}
	};
	(0, import_react.useEffect)(() => {
		if (hydrated && user && token && status === "idle") accept();
	}, [
		hydrated,
		user,
		token
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 flex items-center justify-center px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "w-full max-w-md border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display text-2xl",
					children: "Invitación"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						!token && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-red-600",
							children: "Falta el token de invitación."
						}),
						hydrated && !user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate",
							children: "Iniciá sesión o creá tu cuenta para aceptar la invitación."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "Entrar"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/register",
									children: "Crear cuenta"
								})
							})]
						})] }),
						user && status === "joining" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate",
							children: "Uniéndote…"
						}),
						user && status === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-signal",
							children: "¡Listo! Redirigiendo…"
						}),
						user && status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: accept,
							children: "Reintentar"
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { AcceptInvite as component };
