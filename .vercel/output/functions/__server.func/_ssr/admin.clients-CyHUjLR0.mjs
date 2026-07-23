import { n as api } from "./api-DhVktTub.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.clients-CyHUjLR0.js
var import_jsx_runtime = require_jsx_runtime();
function AdminClients() {
	const { data, isLoading } = useQuery({
		queryKey: ["admin-clients"],
		queryFn: () => api.get("/api/admin/clients")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-display font-bold",
			children: "Clientes"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-slate text-sm",
			children: "Todas las organizaciones de la plataforma."
		})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-slate text-sm font-mono",
			children: "Cargando…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border border-line rounded-md bg-card overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "font-mono text-xs uppercase",
					children: "Cliente"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "font-mono text-xs uppercase",
					children: "Owner"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "font-mono text-xs uppercase",
					children: "Plan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "font-mono text-xs uppercase",
					children: "KYC"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "font-mono text-xs uppercase",
					children: "Keys"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "font-mono text-xs uppercase",
					children: "Miembros"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "font-mono text-xs uppercase",
					children: "Tickets"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data?.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: c.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-sm text-slate",
					children: c.owner
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: c.planId
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: c.kycStatus === "APPROVED" ? "bg-signal/15 text-signal border-signal/30" : "",
					children: c.kycStatus
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono",
					children: c.keys
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono",
					children: c.members
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono",
					children: c.tickets
				})
			] }, c.id)) })] })
		})]
	});
}
//#endregion
export { AdminClients as component };
