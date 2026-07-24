import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DocsLayout } from "@/components/set-api/docs-layout";
import { DocsSidebarExtra } from "@/components/set-api/docs-sidebar";

export const Route = createFileRoute("/docs")({
  component: DocsRouteLayout,
});

function DocsRouteLayout() {
  return (
    <DocsLayout aside={<DocsSidebarExtra />}>
      <Outlet />
    </DocsLayout>
  );
}
