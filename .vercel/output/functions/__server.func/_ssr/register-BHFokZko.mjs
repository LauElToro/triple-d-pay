import { r as __toESM } from "../_runtime.mjs";
import { t as ApiError } from "./api-DhVktTub.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as LogoMark } from "./logo-CE7-q2wi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Circle } from "../_libs/lucide-react.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { t as PLANS } from "./mock-data-BbnzLyJp.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as GoogleButton } from "./google-button-CsdwWW38.mjs";
import { t as Route } from "./register-nXLWkwee.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/@radix-ui/react-radio-group+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BHFokZko.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
function RegisterPage() {
	const { plan: initialPlan } = Route.useSearch();
	const { register, verifyEmail, loginWithGoogle, user, hydrated } = useAuth();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [plan, setPlan] = (0, import_react.useState)(initialPlan ?? "free");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [pendingEmail, setPendingEmail] = (0, import_react.useState)(null);
	const [code, setCode] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (hydrated && user) navigate({ to: "/app" });
	}, [
		hydrated,
		user,
		navigate
	]);
	const submit = async (e) => {
		e.preventDefault();
		if (!email.includes("@")) return toast.error("Email inválido");
		if (password.length < 8) return toast.error("Mínimo 8 caracteres");
		setLoading(true);
		try {
			const res = await register({
				email,
				password,
				name: name || void 0,
				plan
			});
			setPendingEmail(res.email);
			toast.success("Te enviamos un código de verificación por email");
		} catch (err) {
			toast.error(err instanceof ApiError ? err.message : "No se pudo crear la cuenta");
		} finally {
			setLoading(false);
		}
	};
	const submitVerify = async (e) => {
		e.preventDefault();
		if (!pendingEmail) return;
		setLoading(true);
		try {
			await verifyEmail(pendingEmail, code.trim());
			navigate({ to: "/kyc" });
		} catch (err) {
			toast.error(err instanceof ApiError ? err.message : "Código inválido");
		} finally {
			setLoading(false);
		}
	};
	const onGoogle = async (credential) => {
		setLoading(true);
		try {
			await loginWithGoogle(credential);
			navigate({ to: "/kyc" });
		} catch (err) {
			toast.error(err instanceof ApiError ? err.message : "No se pudo registrar con Google");
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
			className: "flex-1 flex items-center justify-center px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "w-full max-w-lg border-line",
				children: !pendingEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display text-2xl",
					children: "Crear cuenta"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate",
					children: "Elegí tu plan. Podés cambiarlo después."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Nombre"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									value: name,
									onChange: (e) => setName(e.target.value)
								})]
							}),
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
									value: plan,
									onValueChange: (v) => setPlan(v),
									children: PLANS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: `plan-${p.id}`,
										className: `flex items-start gap-3 border rounded-md p-3 cursor-pointer transition ${plan === p.id ? "border-signal bg-signal/5" : "border-line"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											value: p.id,
											id: `plan-${p.id}`,
											className: "mt-0.5"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium",
													children: p.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-sm",
													children: p.price
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate",
												children: p.tagline
											})]
										})]
									}, p.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: loading,
								children: loading ? "Creando…" : "Crear cuenta"
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
						children: ["¿Ya tenés cuenta? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-signal underline",
							children: "Entrar"
						})]
					})
				] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display text-2xl",
					children: "Verificá tu email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-slate",
					children: [
						"Ingresá el código que enviamos a ",
						pendingEmail,
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submitVerify,
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							maxLength: 6,
							className: "font-mono tracking-widest text-center text-lg"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: loading,
						children: loading ? "Verificando…" : "Confirmar y continuar"
					})]
				}) })] })
			})
		})]
	});
}
//#endregion
export { RegisterPage as component };
