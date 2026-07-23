import { n as api } from "./api-DhVktTub.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { D as Check } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { t as PLANS } from "./mock-data-BbnzLyJp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.plans-BCHHa7ZA.js
var import_jsx_runtime = require_jsx_runtime();
function PlansPage() {
	const { activeOrg, refreshMe, hasPermission } = useAuth();
	const qc = useQueryClient();
	const canManage = hasPermission("org:manage");
	const change = useMutation({
		mutationFn: (planId) => api.patch("/api/organizations", { planId }),
		onSuccess: async (_data, planId) => {
			await refreshMe();
			qc.invalidateQueries({ queryKey: ["usage"] });
			toast.success(`Plan cambiado a ${PLANS.find((p) => p.id === planId)?.name}`);
		},
		onError: (e) => toast.error(e.message)
	});
	const onChange = (id) => {
		if (id !== "free") {
			if (!confirm("Los planes pagos se cobran con MercadoPago al cierre de ciclo. ¿Continuar?")) return;
		}
		change.mutate(id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Planes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate text-sm",
				children: "Cambio inmediato. Los pagos usan MercadoPago (próximamente)."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-3 gap-6",
				children: PLANS.map((p) => {
					const current = activeOrg?.planId === p.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: current ? "border-signal border-2" : "border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "font-display text-2xl",
									children: p.name
								}), current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-mono uppercase text-signal",
									children: "Actual"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate",
								children: p.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xl mt-2 text-ink",
								children: p.price
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-sm",
								children: p.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-signal shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
								}, f))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								variant: current ? "outline" : "default",
								disabled: current || !canManage || change.isPending,
								onClick: () => onChange(p.id),
								children: current ? "Plan actual" : `Cambiar a ${p.name}`
							})]
						})]
					}, p.id);
				})
			}),
			!canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate",
				children: "Solo el propietario o un admin pueden cambiar el plan."
			})
		]
	});
}
//#endregion
export { PlansPage as component };
