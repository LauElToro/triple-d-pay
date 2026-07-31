import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DocsLayout } from "@/components/set-api/docs-layout";

export const Route = createFileRoute("/docs")({
  component: DocsRouteLayout,
});

function DocsRouteLayout() {
  return (
    <DocsLayout>
      <Outlet />
    </DocsLayout>
  );
}
