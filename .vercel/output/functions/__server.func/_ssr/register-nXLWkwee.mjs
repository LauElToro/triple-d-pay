import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-nXLWkwee.js
var $$splitComponentImporter = () => import("./register-BHFokZko.mjs");
var searchSchema = objectType({ plan: enumType([
	"free",
	"fixed",
	"usage"
]).optional() });
var Route = createFileRoute("/register")({
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "Crear cuenta · Triple D" }, {
		name: "description",
		content: "Creá tu cuenta Triple D y obtené tu API Key para facturar electrónicamente."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
