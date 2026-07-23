import { r as __toESM } from "../_runtime.mjs";
import { n as api } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as LogoMark } from "./logo-CE7-q2wi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as LoaderCircle, w as CircleCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kyc.complete-BX7nSdTs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KycComplete() {
	const { refreshMe } = useAuth();
	const navigate = useNavigate();
	const [approved, setApproved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let attempts = 0;
		const poll = async () => {
			attempts += 1;
			try {
				if ((await api.get("/api/kyc/status")).kycStatus === "APPROVED") {
					setApproved(true);
					await refreshMe();
					setTimeout(() => navigate({ to: "/app" }), 1200);
					return;
				}
			} catch {}
			if (attempts < 20) setTimeout(poll, 3e3);
			else navigate({ to: "/kyc" });
		};
		poll();
	}, [navigate, refreshMe]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper flex flex-col items-center justify-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), approved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-2 text-signal",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg",
				children: "¡Verificación aprobada!"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-2 text-slate",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "Confirmando tu verificación…"
			})]
		})]
	});
}
//#endregion
export { KycComplete as component };
