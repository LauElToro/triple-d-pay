import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as LogoMark } from "./logo-CE7-q2wi.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowRight, C as CircleDollarSign, D as Check, s as Shield, t as Zap } from "../_libs/lucide-react.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXjpJ96D.mjs";
import { t as PLANS } from "./mock-data-BbnzLyJp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BPmIkyt4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-line bg-card/70 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 h-16 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Entrar"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						children: "Crear cuenta"
					})
				})]
			})]
		})
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-line mt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "text-ink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs",
				children: "Facturación electrónica ARCA · SDK + API para desarrolladores"
			})]
		})
	});
}
var LINES = [
	"TRIPLE D · COMPROBANTE ELECTRÓNICO",
	"CUIT EMISOR   30-71234567-8",
	"PTO. VTA      00005    TIPO  FC A",
	"Nº            0000-00012845",
	"CAE           74123456789012",
	"VTO. CAE      2026-08-14",
	"-------------------------------",
	"SUBTOTAL          $ 128.400,00",
	"IVA 21%           $  26.964,00",
	"TOTAL             $ 155.364,00",
	"-------------------------------",
	"STATUS            ACTIVE ✓"
];
function HeroComprobante() {
	const [visible, setVisible] = (0, import_react.useState)(0);
	const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	(0, import_react.useEffect)(() => {
		if (reduced) {
			setVisible(LINES.length);
			return;
		}
		const t = setInterval(() => {
			setVisible((v) => v >= LINES.length ? v : v + 1);
		}, 140);
		return () => clearInterval(t);
	}, [reduced]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-line rounded-md shadow-lg p-6 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-widest text-slate mb-2",
				children: "ARCA · AFIP"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-0",
				children: LINES.slice(0, visible).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ticket-line",
					children: l
				}, i))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute -top-3 left-6 h-3 w-16 bg-seal rounded-b-sm",
			"aria-hidden": true
		})]
	});
}
function PlanCard({ plan, featured = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: featured ? "border-signal border-2 shadow-md relative" : "border-line",
		children: [
			featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-signal text-primary-foreground text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider",
				children: "Recomendado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display text-2xl",
					children: plan.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: plan.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xl mt-2 text-ink",
					children: plan.price
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: plan.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-signal shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
					}, f))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "w-full",
					variant: featured ? "default" : "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						search: { plan: plan.id },
						children: plan.cta
					})
				})]
			})
		]
	});
}
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-signal border border-signal/30 bg-signal/5 rounded-full px-3 py-1 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-signal" }), " ARCA · AFIP · Argentina"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-5xl md:text-6xl font-display font-bold text-ink leading-[1.05]",
						children: [
							"Facturación electrónica",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-signal",
								children: "en 3 líneas de código."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-slate max-w-lg",
						children: "Triple D es el SDK + API para emitir comprobantes ARCA sin pelearte con SOAP, certificados ni pantallas del AFIP. Integrás con tu API Key y listo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/register",
								search: { plan: "free" },
								children: ["Empezar gratis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#planes",
								children: "Ver planes"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex gap-6 text-xs font-mono text-slate uppercase tracking-wider",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "· 30 días sin costo" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "· MercadoPago" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "· Sin tarjeta" })
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroComprobante, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-line bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-8",
					children: [
						{
							icon: Zap,
							title: "Integrás la API Key",
							body: "Al crear tu cuenta recibís una API Key única (mostrada una sola vez). El metering arranca cuando emitís el primer comprobante."
						},
						{
							icon: CircleDollarSign,
							title: "Ciclo de 30 días",
							body: "Cada ciclo se cierra con una factura clara según tu plan: fijo o por uso. Sin sorpresas."
						},
						{
							icon: Shield,
							title: "15 días de gracia",
							body: "Si no pagás, tenés 15 días antes de que la key se suspenda. Cero cortes silenciosos."
						}
					].map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-signal mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl mb-2",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate",
							children: body
						})
					] }, title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "planes",
				className: "mx-auto max-w-6xl px-6 py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl font-display font-bold",
						children: "Elegí tu plan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate mt-2",
						children: "Cambiá de plan cuando quieras desde el panel."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-3 gap-6",
					children: PLANS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
						plan: p,
						featured: p.id === "fixed"
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-4xl px-6 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-ink text-paper rounded-md p-6 font-mono text-sm overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-slate mb-2",
						children: "// npm i @triple-d/sdk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "whitespace-pre",
						children: `import { TripleD } from "@triple-d/sdk";

const td = new TripleD({ apiKey: process.env.TRIPLE_D_KEY });

await td.invoices.create({
  cuit: "30-71234567-8",
  tipo: "FC_A",
  items: [{ descripcion: "Servicio", total: 155364 }],
});`
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Landing as component };
