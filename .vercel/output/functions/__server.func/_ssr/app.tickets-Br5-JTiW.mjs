import { r as __toESM } from "../_runtime.mjs";
import { n as api } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CYB-gyWu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.tickets-Br5-JTiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var statusStyle = {
	open: "bg-signal/15 text-signal border-signal/30",
	pending: "bg-mist text-ink border-line",
	resolved: "bg-signal/15 text-signal border-signal/30",
	closed: "bg-mist text-slate border-line"
};
function TicketsPage() {
	const qc = useQueryClient();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [subject, setSubject] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("medium");
	const [body, setBody] = (0, import_react.useState)("");
	const [reply, setReply] = (0, import_react.useState)("");
	const list = useQuery({
		queryKey: ["tickets"],
		queryFn: () => api.get("/api/tickets")
	});
	const detail = useQuery({
		queryKey: ["ticket", selected],
		queryFn: () => api.get(`/api/tickets/${selected}`),
		enabled: !!selected
	});
	const create = useMutation({
		mutationFn: () => api.post("/api/tickets", {
			subject,
			priority,
			body,
			category: "general"
		}),
		onSuccess: (res) => {
			setSubject("");
			setBody("");
			qc.invalidateQueries({ queryKey: ["tickets"] });
			setSelected(res.ticket.id);
			toast.success("Ticket creado");
		},
		onError: (e) => toast.error(e.message)
	});
	const sendReply = useMutation({
		mutationFn: () => api.patch(`/api/tickets/${selected}`, { message: reply }),
		onSuccess: () => {
			setReply("");
			qc.invalidateQueries({ queryKey: ["ticket", selected] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Soporte"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate text-sm",
				children: "Reportá problemas y seguí el estado de tus tickets."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "font-display",
						children: "Nuevo ticket"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "subject",
									children: "Asunto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "subject",
									value: subject,
									onChange: (e) => setSubject(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prioridad" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: priority,
									onValueChange: setPriority,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "low",
											children: "Baja"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "medium",
											children: "Media"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "high",
											children: "Alta"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "urgent",
											children: "Urgente"
										})
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "body",
									children: "Descripción"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "body",
									rows: 4,
									value: body,
									onChange: (e) => setBody(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => create.mutate(),
								disabled: create.isPending || !subject || !body,
								children: "Crear ticket"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "font-display",
						children: "Tus tickets"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-2",
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
									t.priority,
									" · ",
									new Date(t.updatedAt).toLocaleDateString("es-AR")
								]
							})]
						}, t.id)), list.data?.tickets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate text-sm",
							children: "Sin tickets."
						})]
					})]
				})]
			}),
			selected && detail.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "font-display",
						children: detail.data.ticket.subject
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: statusStyle[detail.data.ticket.status],
						children: detail.data.ticket.status
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
							placeholder: "Escribí una respuesta…"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => sendReply.mutate(),
							disabled: sendReply.isPending || !reply,
							children: "Enviar"
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { TicketsPage as component };
