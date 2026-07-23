import { r as __toESM } from "../_runtime.mjs";
import { t as ApiError } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as LogoMark } from "./logo-CE7-q2wi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as GoogleButton } from "./google-button-CsdwWW38.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CxOh9RfW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { login, loginWithGoogle, verifyTwoFactor, user, hydrated } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [twofa, setTwofa] = (0, import_react.useState)(null);
	const [code, setCode] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (hydrated && user) navigate({ to: "/app" });
	}, [
		hydrated,
		user,
		navigate
	]);
	const handleOutcome = async (outcome) => {
		if (outcome.status === "twofa_required") {
			setTwofa({
				pendingToken: outcome.pendingToken,
				method: outcome.method
			});
			toast.info(outcome.method === "email" ? "Te enviamos un código por email" : "Ingresá el código de tu app de autenticación");
		} else navigate({ to: "/app" });
	};
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await handleOutcome(await login(email, password));
		} catch (err) {
			toast.error(err instanceof ApiError ? err.message : "No se pudo iniciar sesión");
		} finally {
			setLoading(false);
		}
	};
	const onGoogle = async (credential) => {
		setLoading(true);
		try {
			await handleOutcome(await loginWithGoogle(credential));
		} catch (err) {
			toast.error(err instanceof ApiError ? err.message : "No se pudo iniciar sesión con Google");
		} finally {
			setLoading(false);
		}
	};
	const submitTwoFactor = async (e) => {
		e.preventDefault();
		if (!twofa) return;
		setLoading(true);
		try {
			await verifyTwoFactor(twofa.pendingToken, code.trim());
			navigate({ to: "/app" });
		} catch (err) {
			toast.error(err instanceof ApiError ? err.message : "Código inválido");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 flex items-center justify-center px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "w-full max-w-md border-line",
				children: !twofa ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display text-2xl",
					children: "Entrar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate",
					children: "Con tu cuenta Triple D."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "password",
									children: "Contraseña"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true,
									minLength: 8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: loading,
								children: loading ? "Entrando…" : "Entrar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-4 flex items-center gap-3 text-xs text-slate",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" }),
							" o ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleButton, { onCredential: onGoogle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-center text-slate mt-4",
						children: ["¿No tenés cuenta? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							className: "text-signal underline",
							children: "Crear cuenta"
						})]
					})
				] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display text-2xl",
					children: "Verificación en dos pasos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate",
					children: twofa.method === "email" ? "Ingresá el código que enviamos a tu email." : "Ingresá el código de tu app."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submitTwoFactor,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "code",
								children: "Código"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "code",
								inputMode: "numeric",
								autoFocus: true,
								value: code,
								onChange: (e) => setCode(e.target.value),
								maxLength: 8,
								className: "font-mono tracking-widest text-center text-lg"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: loading,
							children: loading ? "Verificando…" : "Verificar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-slate underline w-full",
							onClick: () => {
								setTwofa(null);
								setCode("");
							},
							children: "Volver"
						})
					]
				}) })] })
			})
		})]
	});
}
//#endregion
export { LoginPage as component };
