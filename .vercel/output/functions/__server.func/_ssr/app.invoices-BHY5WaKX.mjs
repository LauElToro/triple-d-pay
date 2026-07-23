import { n as api } from "./api-DhVktTub.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as formatARS } from "./mock-data-BbnzLyJp.mjs";
import { t as BillingAlert } from "./billing-alert-D8gfAq-Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.invoices-BHY5WaKX.js
var import_jsx_runtime = require_jsx_runtime();
var statusStyle = {
	paid: "bg-signal/15 text-signal border-signal/30",
	pending: "bg-mist text-ink border-line",
	overdue: "bg-seal/15 text-seal border-seal/30",
	void: "bg-mist text-slate border-line"
};
var statusLabel = {
	paid: "Pagada",
	pending: "Pendiente",
	overdue: "Vencida",
	void: "Anulada"
};
function fmt(d) {
	return new Date(d).toLocaleDateString("es-AR");
}
function InvoiceTable({ invoices }) {
	if (invoices.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border border-line border-dashed rounded-md bg-card p-10 text-center text-slate text-sm",
		children: "Todavía no hay facturas emitidas."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border border-line rounded-md bg-card overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "font-mono text-xs uppercase",
				children: "Factura"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "font-mono text-xs uppercase",
				children: "Período"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "font-mono text-xs uppercase",
				children: "Monto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "font-mono text-xs uppercase",
				children: "Estado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "font-mono text-xs uppercase",
				children: "Vence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: invoices.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-mono",
				children: inv.id.slice(0, 8)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
				className: "text-sm text-slate",
				children: [
					fmt(inv.periodStart),
					" → ",
					fmt(inv.periodEnd)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-mono",
				children: formatARS(inv.amount)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				className: statusStyle[inv.status],
				children: statusLabel[inv.status]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-mono text-sm",
				children: fmt(inv.dueAt)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: inv.status !== "paid" && inv.status !== "void" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => alert("Redirección a MercadoPago (placeholder)"),
				children: "Pagar"
			}) })
		] }, inv.id)) })] })
	});
}
function InvoicesPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["invoices"],
		queryFn: () => api.get("/api/invoices")
	});
	const invoices = data?.invoices ?? [];
	const pending = invoices.find((i) => i.status !== "paid" && i.status !== "void");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Facturas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate text-sm",
				children: "Ciclos cerrados y pendientes de cobro."
			})] }),
			pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillingAlert, { invoice: pending }),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate text-sm font-mono",
				children: "Cargando…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceTable, { invoices })
		]
	});
}
//#endregion
export { InvoicesPage as component };
