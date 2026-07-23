import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/key-status-badge-CuUQuFfK.js
var import_jsx_runtime = require_jsx_runtime();
function KeyStatusBadge({ status }) {
	if (status === "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		className: "bg-signal text-primary-foreground font-mono uppercase text-xs",
		children: "Active"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		className: "bg-seal text-destructive-foreground font-mono uppercase text-xs",
		children: "Suspended"
	});
}
//#endregion
export { KeyStatusBadge as t };
