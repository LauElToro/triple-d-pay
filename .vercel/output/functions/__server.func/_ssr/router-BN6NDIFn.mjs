import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as AuthProvider } from "./auth-context-CNJ3HpJu.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$18 } from "./invite.accept-DFfobD0l.mjs";
import { t as Route$19 } from "./register-nXLWkwee.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BN6NDIFn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DB9F34Ok.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-display font-bold text-ink",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Página no encontrada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "La ruta que buscás no existe o fue movida."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Volver al inicio"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-ink",
					children: "Esta página no cargó"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Algo falló de nuestro lado. Probá recargar o volver al inicio."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Reintentar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
						children: "Inicio"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Triple D — Facturación electrónica ARCA para desarrolladores" },
			{
				name: "description",
				content: "SDK + API Key para facturar electrónicamente en Argentina. Planes free, fijo o por uso. Ciclo mensual, cobro con MercadoPago."
			},
			{
				property: "og:title",
				content: "Triple D — Facturación electrónica ARCA"
			},
			{
				property: "og:description",
				content: "SDK + API para facturar en ARCA. Integrá en minutos."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$16 = () => import("./routes-BPmIkyt4.mjs");
var Route$16 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./admin-DtoV0qM5.mjs");
var Route$15 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./app-2h-OZGHb.mjs");
var Route$14 = createFileRoute("/app")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./kyc-CpKZv-4d.mjs");
var Route$13 = createFileRoute("/kyc")({
	head: () => ({ meta: [{ title: "Verificación de identidad · Triple D" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./login-CxOh9RfW.mjs");
var Route$12 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Entrar · Triple D" }, {
		name: "description",
		content: "Accedé a tu panel de facturación electrónica Triple D."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin.index-Bw_7XK7O.mjs");
var Route$11 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./admin.clients-CyHUjLR0.mjs");
var Route$10 = createFileRoute("/admin/clients")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin.tickets-CPftKNKU.mjs");
var Route$9 = createFileRoute("/admin/tickets")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./app.index-DxhQUcjF.mjs");
var Route$8 = createFileRoute("/app/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./app.invoices-BHY5WaKX.mjs");
var Route$7 = createFileRoute("/app/invoices")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./app.keys-DWylh2Od.mjs");
var Route$6 = createFileRoute("/app/keys")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./app.plans-BCHHa7ZA.mjs");
var Route$5 = createFileRoute("/app/plans")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./app.settings-Dman4dBu.mjs");
var Route$4 = createFileRoute("/app/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./app.team-BfHz2ZEo.mjs");
var Route$3 = createFileRoute("/app/team")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./app.tickets-Br5-JTiW.mjs");
var Route$2 = createFileRoute("/app/tickets")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./app.usage-COS7rV8f.mjs");
var Route$1 = createFileRoute("/app/usage")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./kyc.complete-BX7nSdTs.mjs");
var Route = createFileRoute("/kyc/complete")({
	head: () => ({ meta: [{ title: "Verificación en proceso · Triple D" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var AdminRoute = Route$15.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$17
});
var AppRoute = Route$14.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$17
});
var KycRoute = Route$13.update({
	id: "/kyc",
	path: "/kyc",
	getParentRoute: () => Route$17
});
var LoginRoute = Route$12.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$17
});
var RegisterRoute = Route$19.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$17
});
var AdminIndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminClientsRoute = Route$10.update({
	id: "/clients",
	path: "/clients",
	getParentRoute: () => AdminRoute
});
var AdminTicketsRoute = Route$9.update({
	id: "/tickets",
	path: "/tickets",
	getParentRoute: () => AdminRoute
});
var AppIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppInvoicesRoute = Route$7.update({
	id: "/invoices",
	path: "/invoices",
	getParentRoute: () => AppRoute
});
var AppKeysRoute = Route$6.update({
	id: "/keys",
	path: "/keys",
	getParentRoute: () => AppRoute
});
var AppPlansRoute = Route$5.update({
	id: "/plans",
	path: "/plans",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppTeamRoute = Route$3.update({
	id: "/team",
	path: "/team",
	getParentRoute: () => AppRoute
});
var AppTicketsRoute = Route$2.update({
	id: "/tickets",
	path: "/tickets",
	getParentRoute: () => AppRoute
});
var AppUsageRoute = Route$1.update({
	id: "/usage",
	path: "/usage",
	getParentRoute: () => AppRoute
});
var InviteAcceptRoute = Route$18.update({
	id: "/invite/accept",
	path: "/invite/accept",
	getParentRoute: () => Route$17
});
var KycCompleteRoute = Route.update({
	id: "/complete",
	path: "/complete",
	getParentRoute: () => KycRoute
});
var AdminRouteChildren = {
	AdminClientsRoute,
	AdminTicketsRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var AppRouteChildren = {
	AppInvoicesRoute,
	AppKeysRoute,
	AppPlansRoute,
	AppSettingsRoute,
	AppTeamRoute,
	AppTicketsRoute,
	AppUsageRoute,
	AppIndexRoute
};
var AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
var KycRouteChildren = { KycCompleteRoute };
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRouteWithChildren,
	AppRoute: AppRouteWithChildren,
	KycRoute: KycRoute._addFileChildren(KycRouteChildren),
	LoginRoute,
	RegisterRoute,
	InviteAcceptRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
