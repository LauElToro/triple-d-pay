import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DocsLayout } from "@/components/triple-d/docs-layout";
import { DocsSidebarExtra } from "@/components/triple-d/docs-sidebar";

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
