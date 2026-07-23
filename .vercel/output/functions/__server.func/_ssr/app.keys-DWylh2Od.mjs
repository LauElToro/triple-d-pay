import { r as __toESM } from "../_runtime.mjs";
import { n as api } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { D as Check, a as TriangleAlert, b as Copy, f as Plus, o as Trash2, u as RotateCw, y as KeyRound } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-CX7GK8Td.mjs";
import { t as KeyStatusBadge } from "./key-status-badge-CuUQuFfK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.keys-DWylh2Od.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CopyField({ value, label, masked = false }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const display = masked ? `${value.slice(0, 12)}${"•".repeat(20)}` : value;
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			toast.success("Copiado al portapapeles");
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			toast.error("No se pudo copiar");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs text-slate mb-1 uppercase tracking-wider font-mono",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 bg-mist border border-line rounded-md px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "flex-1 text-sm font-mono truncate",
			children: display
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "ghost",
			onClick: copy,
			"aria-label": "Copiar",
			children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
		})]
	})] });
}
function KeysPage() {
	const { issuedKey, setIssuedKey, hasPermission } = useAuth();
	const qc = useQueryClient();
	const canWrite = hasPermission("keys:write");
	const { data, isLoading } = useQuery({
		queryKey: ["keys"],
		queryFn: () => api.get("/api/keys")
	});
	const create = useMutation({
		mutationFn: () => api.post("/api/keys"),
		onSuccess: (res) => {
			setIssuedKey(res.plaintext);
			qc.invalidateQueries({ queryKey: ["keys"] });
			toast.success("API Key generada");
		},
		onError: (e) => toast.error(e.message)
	});
	const rotate = useMutation({
		mutationFn: (id) => api.post(`/api/keys/${id}/rotate`),
		onSuccess: (res) => {
			setIssuedKey(res.plaintext);
			qc.invalidateQueries({ queryKey: ["keys"] });
			toast.success("Key rotada");
		},
		onError: (e) => toast.error(e.message)
	});
	const revoke = useMutation({
		mutationFn: (id) => api.del(`/api/keys/${id}`),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["keys"] });
			toast.success("Key revocada");
		},
		onError: (e) => toast.error(e.message)
	});
	const keys = data?.keys.filter((k) => k.status !== "revoked") ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-display font-bold",
					children: "API Keys"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate text-sm",
					children: "Autenticá tu SDK con estas keys. El gasto se registra por key."
				})] }), canWrite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => create.mutate(),
					disabled: create.isPending,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), " Nueva key"]
				})]
			}),
			issuedKey && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				className: "border-signal bg-signal/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-signal" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
						className: "font-display",
						children: "Tu API Key — se muestra una sola vez"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Copiala ahora. No la vamos a volver a mostrar." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyField, {
								value: issuedKey,
								label: "Key completa"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => setIssuedKey(null),
								children: "Ya la guardé"
							})
						]
					})
				]
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate text-sm font-mono",
				children: "Cargando…"
			}),
			keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "flex items-center gap-2 font-display",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-5 w-5" }),
							" ",
							key.name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyStatusBadge, { status: key.status === "active" ? "active" : "suspended" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyField, {
							value: key.prefix,
							masked: true,
							label: "Prefijo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate uppercase tracking-wider font-mono",
								children: "Uso desde"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono",
								children: new Date(key.usageStartedAt).toLocaleDateString("es-AR")
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate uppercase tracking-wider font-mono",
								children: "Cierra ciclo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono",
								children: key.cycleEndsAt ? new Date(key.cycleEndsAt).toLocaleDateString("es-AR") : "—"
							})] })]
						}),
						canWrite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => rotate.mutate(key.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-4 w-4 mr-2" }), " Rotar"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => revoke.mutate(key.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 mr-2" }), " Revocar"]
							})]
						})
					]
				})]
			}, key.id)),
			!isLoading && keys.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-line border-dashed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-10 text-center text-slate text-sm",
					children: ["No tenés keys activas. ", canWrite ? "Generá una para empezar." : "Pedile a un admin que genere una."]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display",
					children: "Uso con el SDK"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "bg-ink text-paper rounded-md p-4 text-sm font-mono overflow-x-auto",
					children: `// Emitir un comprobante a través de Triple D
await fetch("http://localhost:4000/api/arca/comprobantes", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + process.env.TRIPLE_D_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ cbteTipo: 11, ptoVta: 1, /* ... */ }),
});`
				}) })]
			})
		]
	});
}
//#endregion
export { KeysPage as component };
