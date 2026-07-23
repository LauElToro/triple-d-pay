import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usage-chart-gj4BAmx5.js
var import_jsx_runtime = require_jsx_runtime();
function UsageChart({ data }) {
	const max = Math.max(1, ...data.map((d) => d.count));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line bg-card rounded-md p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-wider text-slate font-mono mb-4",
			children: "Uso · últimos 7 días"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-end gap-3 h-40",
			children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-mono text-ink",
						children: d.count
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full bg-signal/80 rounded-t-sm transition-all",
						style: { height: `${d.count / max * 100}%` },
						"aria-label": `${d.day}: ${d.count} comprobantes`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-slate font-mono",
						children: d.day
					})
				]
			}, d.day))
		})]
	});
}
//#endregion
export { UsageChart as t };
