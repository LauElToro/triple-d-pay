import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/triple-d/app-sidebar";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { user, hydrated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  if (!hydrated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate font-mono text-sm">
        Cargando…
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-paper">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b border-line bg-card/60 backdrop-blur px-3">
            <SidebarTrigger />
          </header>
          <main className="flex-1 p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
