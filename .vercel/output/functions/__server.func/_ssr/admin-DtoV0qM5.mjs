import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-CNJ3HpJu.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as LogoMark } from "./logo-CE7-q2wi.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as ChartColumn, _ as LifeBuoy, h as LogOut, j as ArrowLeft, k as Building2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DtoV0qM5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		title: "KPIs",
		url: "/admin",
		icon: ChartColumn
	},
	{
		title: "Clientes",
		url: "/admin/clients",
		icon: Building2
	},
	{
		title: "Tickets",
		url: "/admin/tickets",
		icon: LifeBuoy
	}
];
function AdminLayout() {
	const { user, hydrated, logout } = useAuth();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		if (!user) navigate({ to: "/login" });
		else if (user.systemRole !== "SUPERADMIN") navigate({ to: "/app" });
	}, [
		hydrated,
		user,
		navigate
	]);
	if (!hydrated || !user || user.systemRole !== "SUPERADMIN") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center text-slate font-mono text-sm",
		children: "Cargando…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-60 border-r border-line flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-line px-4 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 p-3 space-y-1",
					children: nav.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: i.url,
						className: `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${pathname === i.url ? "bg-signal/10 text-signal" : "text-ink hover:bg-mist"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i.icon, { className: "h-4 w-4" }),
							" ",
							i.title
						]
					}, i.url))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line p-3 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-2" }), " Ir al panel"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "w-full",
						onClick: () => logout(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 mr-2" }), " Salir"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 p-6 md:p-8 overflow-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		})]
	});
}
//#endregion
export { AdminLayout as component };
