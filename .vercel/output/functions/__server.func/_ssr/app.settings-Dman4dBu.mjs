import { r as __toESM } from "../_runtime.mjs";
import { n as api } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { c as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.settings-Dman4dBu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user, activeOrg, refreshMe, hasPermission } = useAuth();
	const canManage = hasPermission("org:manage");
	const [setup, setSetup] = (0, import_react.useState)(null);
	const [code, setCode] = (0, import_react.useState)("");
	const [cuit, setCuit] = (0, import_react.useState)(activeOrg?.arcaCuit ?? "");
	const [orgName, setOrgName] = (0, import_react.useState)(activeOrg?.name ?? "");
	const startSetup = async () => {
		try {
			const res = await api.post("/api/auth/2fa/setup");
			setSetup(res);
		} catch (e) {
			toast.error(e.message);
		}
	};
	const enable = async () => {
		try {
			await api.post("/api/auth/2fa/enable", {
				code: code.trim(),
				enable: true
			});
			await refreshMe();
			setSetup(null);
			setCode("");
			toast.success("2FA activado");
		} catch (e) {
			toast.error(e.message);
		}
	};
	const disable = async () => {
		try {
			await api.post("/api/auth/2fa/enable", {
				code: code.trim(),
				enable: false
			});
			await refreshMe();
			setCode("");
			toast.success("2FA desactivado");
		} catch (e) {
			toast.error(e.message);
		}
	};
	const saveOrg = async () => {
		try {
			await api.patch("/api/organizations", {
				name: orgName || void 0,
				arcaCuit: cuit || void 0
			});
			await refreshMe();
			toast.success("Organización actualizada");
		} catch (e) {
			toast.error(e.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Ajustes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate text-sm",
				children: "Seguridad de la cuenta y datos de la organización."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "flex items-center gap-2 font-display",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" }), " Verificación en dos pasos (2FA)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: user?.twoFactorEnabled ? "bg-signal/15 text-signal border-signal/30" : "",
						children: user?.twoFactorEnabled ? "Activo" : "Inactivo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-4",
					children: !user?.twoFactorEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: !setup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: startSetup,
						children: "Configurar 2FA"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate",
								children: "Escaneá el QR con Google Authenticator o similar, luego ingresá el código."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: setup.qr,
								alt: "QR 2FA",
								className: "h-44 w-44 border border-line rounded"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-mono text-slate",
								children: ["Secreto: ", setup.secret]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: code,
									onChange: (e) => setCode(e.target.value),
									placeholder: "Código de 6 dígitos",
									className: "font-mono"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: enable,
									disabled: !code,
									children: "Activar"
								})]
							})
						]
					}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: code,
							onChange: (e) => setCode(e.target.value),
							placeholder: "Código actual",
							className: "font-mono"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: disable,
							disabled: !code,
							children: "Desactivar"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display",
					children: "Organización"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "orgName",
								children: "Nombre"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "orgName",
								value: orgName,
								onChange: (e) => setOrgName(e.target.value),
								disabled: !canManage
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "cuit",
									children: "CUIT emisor (ARCA)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "cuit",
									value: cuit,
									onChange: (e) => setCuit(e.target.value),
									placeholder: "20111111112",
									disabled: !canManage,
									className: "font-mono"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate",
									children: "Se usa como cuit_emisor al emitir comprobantes en ARCA."
								})
							]
						}),
						canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: saveOrg,
							children: "Guardar"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
