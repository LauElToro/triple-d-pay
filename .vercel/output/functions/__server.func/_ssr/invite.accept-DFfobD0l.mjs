import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invite.accept-DFfobD0l.js
var $$splitComponentImporter = () => import("./invite.accept-CcqP3zhW.mjs");
var searchSchema = objectType({ token: stringType().optional() });
var Route = createFileRoute("/invite/accept")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
