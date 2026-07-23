import { n as api } from "./api-DhVktTub.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Receipt, y as KeyRound } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as StatChip } from "./stat-chip-CXilUwMi.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { n as formatARS, t as PLANS } from "./mock-data-BbnzLyJp.mjs";
import { t as BillingAlert } from "./billing-alert-D8gfAq-Z.mjs";
import { t as UsageChart } from "./usage-chart-gj4BAmx5.mjs";
import { t as KeyStatusBadge } from "./key-status-badge-CuUQuFfK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.index-DxhQUcjF.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { user, activeOrg } = useAuth();
	const usage = useQuery({
		queryKey: ["usage"],
		queryFn: () => api.get("/api/usage")
	});
	const invoices = useQuery({
		queryKey: ["invoices"],
		queryFn: () => api.get("/api/invoices")
	});
	const keys = useQuery({
		queryKey: ["keys"],
		queryFn: () => api.get("/api/keys")
	});
	const pending = invoices.data?.invoices.find((i) => i.status !== "paid" && i.status !== "void");
	const plan = PLANS.find((p) => p.id === activeOrg?.planId);
	const activeKey = keys.data?.keys.find((k) => k.status === "active");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Hola de nuevo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-slate text-sm font-mono",
				children: [
					user?.email,
					" · ",
					activeOrg?.name
				]
			})] }),
			pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillingAlert, { invoice: pending }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "Comprobantes ciclo",
						value: usage.data?.cycle.units ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "Plan actual",
						value: plan?.name ?? "—",
						hint: plan?.price
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "Gasto ciclo",
						value: formatARS(usage.data?.cycle.cost ?? 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "Estado key",
						value: activeKey ? "Activa" : "Sin key"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageChart, { data: usage.data?.daily ?? [] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex flex-row items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "font-display text-lg",
							children: "API Key"
						}), activeKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyStatusBadge, { status: "active" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "block bg-mist border border-line rounded px-2 py-1 text-sm font-mono truncate",
								children: activeKey ? `${activeKey.prefix}••••••••` : "Sin key activa"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app/keys",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4 mr-2" }), " Gestionar"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app/invoices",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4 mr-2" }), " Facturas"]
								})
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
