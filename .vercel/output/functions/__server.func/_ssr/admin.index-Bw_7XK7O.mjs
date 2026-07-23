import { n as api } from "./api-DhVktTub.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as StatChip } from "./stat-chip-CXilUwMi.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { n as formatARS } from "./mock-data-BbnzLyJp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-Bw_7XK7O.js
var import_jsx_runtime = require_jsx_runtime();
function Distribution({ title, data }) {
	const total = Math.max(1, data.reduce((s, d) => s + d.count, 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "font-display text-lg",
			children: title
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-2",
			children: [data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "capitalize",
					children: d.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono",
					children: d.count
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 bg-mist rounded",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 bg-signal rounded",
					style: { width: `${d.count / total * 100}%` }
				})
			})] }, d.label)), data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate text-sm",
				children: "Sin datos."
			})]
		})]
	});
}
function AdminKpis() {
	const { data, isLoading } = useQuery({
		queryKey: ["metrics"],
		queryFn: () => api.get("/api/metrics")
	});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-slate text-sm font-mono",
		children: "Cargando KPIs…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Consola global"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate text-sm",
				children: "KPIs de toda la plataforma."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "Clientes",
						value: data.totals.clients
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "Usuarios",
						value: data.totals.users
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "Keys activas",
						value: data.totals.activeKeys
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "KYC aprobados",
						value: data.totals.kycApproved
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "Comprobantes 30d",
						value: data.totals.unitsLast30
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "Gasto 30d",
						value: formatARS(data.totals.spendLast30)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
						label: "MRR estimado",
						value: formatARS(data.totals.mrr)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Distribution, {
						title: "Por plan",
						data: data.byPlan.map((p) => ({
							label: p.planId,
							count: p.count
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Distribution, {
						title: "Tipo de cliente",
						data: data.byClientType.map((p) => ({
							label: p.type,
							count: p.count
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Distribution, {
						title: "Derivaciones (origen)",
						data: data.bySource.map((p) => ({
							label: p.source,
							count: p.count
						}))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display text-lg",
					children: "Altas recientes"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-2",
					children: data.recentClients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm border-b border-line pb-2 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-slate",
							children: [
								c.planId,
								" · ",
								c.kycStatus
							]
						})]
					}, c.id))
				})]
			})
		]
	});
}
//#endregion
export { AdminKpis as component };
