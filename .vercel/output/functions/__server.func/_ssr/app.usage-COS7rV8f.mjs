import { n as api } from "./api-DhVktTub.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as StatChip } from "./stat-chip-CXilUwMi.mjs";
import { n as formatARS } from "./mock-data-BbnzLyJp.mjs";
import { t as UsageChart } from "./usage-chart-gj4BAmx5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.usage-COS7rV8f.js
var import_jsx_runtime = require_jsx_runtime();
function UsagePage() {
	const { data, isLoading } = useQuery({
		queryKey: ["usage"],
		queryFn: () => api.get("/api/usage")
	});
	const daily = data?.daily ?? [];
	const total = daily.reduce((s, d) => s + d.count, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-display font-bold",
			children: "Uso"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-slate text-sm",
			children: "Metering del ciclo actual (30 días)."
		})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-slate text-sm font-mono",
			children: "Cargando…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 md:grid-cols-4 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
					label: "Comprobantes ciclo",
					value: data?.cycle.units ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
					label: "Últimos 7 días",
					value: total
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
					label: "Restante",
					value: data?.cycle.remaining === null ? "∞" : data?.cycle.remaining ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
					label: "Gasto ciclo",
					value: formatARS(data?.cycle.cost ?? 0),
					hint: data?.plan.name
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageChart, { data: daily })] })]
	});
}
//#endregion
export { UsagePage as component };
