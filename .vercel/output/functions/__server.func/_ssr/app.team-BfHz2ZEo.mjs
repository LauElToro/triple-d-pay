import { r as __toESM } from "../_runtime.mjs";
import { n as api } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { i as UserPlus, o as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CYB-gyWu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.team-BfHz2ZEo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUBROLE_LABEL = {
	DEV: "Desarrollo",
	CONTABILIDAD: "Contabilidad",
	ADMINISTRACION: "Administración"
};
function TeamPage() {
	const { hasPermission } = useAuth();
	const qc = useQueryClient();
	const canWrite = hasPermission("team:write");
	const [email, setEmail] = (0, import_react.useState)("");
	const [subRole, setSubRole] = (0, import_react.useState)("DEV");
	const members = useQuery({
		queryKey: ["members"],
		queryFn: () => api.get("/api/team/members")
	});
	const invitations = useQuery({
		queryKey: ["invitations"],
		queryFn: () => api.get("/api/team/invitations")
	});
	const invite = useMutation({
		mutationFn: () => api.post("/api/team/invitations", {
			email,
			subRole
		}),
		onSuccess: () => {
			setEmail("");
			qc.invalidateQueries({ queryKey: ["invitations"] });
			toast.success("Invitación enviada");
		},
		onError: (e) => toast.error(e.message)
	});
	const updateRole = useMutation({
		mutationFn: (v) => api.patch(`/api/team/members/${v.id}`, { subRole: v.subRole }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["members"] });
			toast.success("Rol actualizado");
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (id) => api.del(`/api/team/members/${id}`),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["members"] });
			toast.success("Miembro eliminado");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Equipo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate text-sm",
				children: "Invitá colaboradores y asigná permisos por sub-rol."
			})] }),
			canWrite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display",
					children: "Invitar colaborador"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row gap-3 md:items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "invite-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "invite-email",
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "colaborador@empresa.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Sub-rol" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: subRole,
								onValueChange: (v) => setSubRole(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-48",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "DEV",
										children: "Desarrollo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "CONTABILIDAD",
										children: "Contabilidad"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "ADMINISTRACION",
										children: "Administración"
									})
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => invite.mutate(),
							disabled: invite.isPending || !email,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4 mr-2" }), " Invitar"]
						})
					]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display",
					children: "Miembros"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [members.data?.members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium truncate",
								children: m.name ?? m.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate font-mono truncate",
								children: m.email
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: m.orgRole
							}), m.orgRole === "OWNER" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-slate",
								children: "Propietario"
							}) : canWrite ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: m.subRole ?? "DEV",
								onValueChange: (v) => updateRole.mutate({
									id: m.id,
									subRole: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-40 h-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "DEV",
										children: "Desarrollo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "CONTABILIDAD",
										children: "Contabilidad"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "ADMINISTRACION",
										children: "Administración"
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => remove.mutate(m.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: m.subRole ? SUBROLE_LABEL[m.subRole] : "—"
							})]
						})]
					}, m.id)), members.data?.members.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate text-sm",
						children: "Sin miembros todavía."
					})]
				})]
			}),
			(invitations.data?.invitations.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display",
					children: "Invitaciones pendientes"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-2",
					children: invitations.data?.invitations.filter((i) => i.status === "PENDING").map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm border-b border-line pb-2 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: i.email
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: SUBROLE_LABEL[i.subRole]
						})]
					}, i.id))
				})]
			})
		]
	});
}
//#endregion
export { TeamPage as component };
