import { r as __toESM } from "../_runtime.mjs";
import { n as api } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CYB-gyWu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tickets-CPftKNKU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusStyle = {
	open: "bg-signal/15 text-signal border-signal/30",
	pending: "bg-mist text-ink border-line",
	resolved: "bg-signal/15 text-signal border-signal/30",
	closed: "bg-mist text-slate border-line"
};
function AdminTickets() {
	const qc = useQueryClient();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [reply, setReply] = (0, import_react.useState)("");
	const list = useQuery({
		queryKey: ["admin-tickets"],
		queryFn: () => api.get("/api/tickets")
	});
	const detail = useQuery({
		queryKey: ["admin-ticket", selected],
		queryFn: () => api.get(`/api/tickets/${selected}`),
		enabled: !!selected
	});
	const update = useMutation({
		mutationFn: (v) => api.patch(`/api/tickets/${selected}`, v),
		onSuccess: () => {
			setReply("");
			qc.invalidateQueries({ queryKey: ["admin-ticket", selected] });
			qc.invalidateQueries({ queryKey: ["admin-tickets"] });
			toast.success("Ticket actualizado");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-display font-bold",
			children: "Tickets"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-slate text-sm",
			children: "Soporte a clientes — respondé y resolvé rápido."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display",
					children: "Cola"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-2 max-h-[70vh] overflow-y-auto",
					children: [list.data?.tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelected(t.id),
						className: `w-full text-left border rounded-md p-3 transition ${selected === t.id ? "border-signal bg-signal/5" : "border-line"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium truncate",
								children: t.subject
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: statusStyle[t.status],
								children: t.status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-slate mt-1",
							children: [
								t.org,
								" · ",
								t.author,
								" · ",
								t.priority
							]
						})]
					}, t.id)), list.data?.tickets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate text-sm",
						children: "Sin tickets."
					})]
				})]
			}), selected && detail.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "font-display truncate",
						children: detail.data.ticket.subject
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: detail.data.ticket.status,
						onValueChange: (v) => update.mutate({ status: v }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-36 h-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "open",
								children: "Abierto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "pending",
								children: "Pendiente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "resolved",
								children: "Resuelto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "closed",
								children: "Cerrado"
							})
						] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 max-h-72 overflow-y-auto",
						children: detail.data.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-md p-3 text-sm ${m.isStaff ? "bg-signal/5 border border-signal/20" : "bg-mist border border-line"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-slate font-mono mb-1",
								children: [
									m.isStaff ? "Soporte" : m.author,
									" · ",
									new Date(m.createdAt).toLocaleString("es-AR")
								]
							}), m.body]
						}, m.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: reply,
							onChange: (e) => setReply(e.target.value),
							placeholder: "Responder…"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => update.mutate({ message: reply }),
							disabled: !reply,
							children: "Enviar"
						})]
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { AdminTickets as component };
