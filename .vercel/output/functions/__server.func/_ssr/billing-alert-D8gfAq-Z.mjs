import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { a as TriangleAlert, x as Clock } from "../_libs/lucide-react.mjs";
import { n as formatARS } from "./mock-data-BbnzLyJp.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-CX7GK8Td.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/billing-alert-D8gfAq-Z.js
var import_jsx_runtime = require_jsx_runtime();
function BillingAlert({ invoice }) {
	if (invoice.status === "paid") return null;
	const overdue = invoice.status === "overdue";
	const due = new Date(invoice.dueAt).toLocaleDateString("es-AR");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
		className: overdue ? "border-seal bg-seal/10" : "border-signal bg-signal/5",
		children: [
			overdue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-seal" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-signal" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
				className: "font-display",
				children: overdue ? "Riesgo de suspensión del servicio" : "Factura pendiente de pago"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
				className: "flex flex-col md:flex-row md:items-center md:justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: overdue ? `Tu factura ${invoice.id.slice(0, 8)} está vencida. Si no se paga, la key será suspendida.` : `Factura ${invoice.id.slice(0, 8)} por ${formatARS(invoice.amount)} vence el ${due}. Tenés 15 días de gracia.` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => alert("Redirección a MercadoPago (placeholder)"),
					children: "Pagar con MercadoPago"
				})]
			})
		]
	});
}
//#endregion
export { BillingAlert as t };
