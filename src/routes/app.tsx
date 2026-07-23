import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/triple-d/app-sidebar";
import { NavbarControls } from "@/components/triple-d/navbar-controls";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { user, hydrated } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  if (!hydrated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate font-mono text-sm">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-paper">
        <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between border-b border-line bg-card/60 px-3 backdrop-blur">
          <SidebarTrigger />
          <NavbarControls />
        </header>
        <div className="flex-1 p-6 md:p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
