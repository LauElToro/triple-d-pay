import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogoMark } from "@/components/triple-d/logo";
import { Button } from "@/components/ui/button";
import { TourProvider } from "@/lib/tour/tour-context";
import { TourLauncher } from "@/components/triple-d/tour-launcher";
import { useAuth } from "@/lib/auth-context";
import {
  BarChart3,
  Building2,
  LifeBuoy,
  LogOut,
  ArrowLeft,
  Activity,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const nav = [
  { title: "KPIs", url: "/admin", icon: BarChart3 },
  { title: "Clientes", url: "/admin/clients", icon: Building2 },
  { title: "Tráfico", url: "/admin/traffic", icon: Activity },
  { title: "Rentabilidad", url: "/admin/profitability", icon: Wallet },
  { title: "Tickets", url: "/admin/tickets", icon: LifeBuoy },
];

function AdminLayout() {
  const { user, hydrated, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!hydrated) return;
    if (!user) navigate({ to: "/login" });
    else if (user.systemRole !== "SUPERADMIN") navigate({ to: "/app" });
  }, [hydrated, user, navigate]);

  if (!hydrated || !user || user.systemRole !== "SUPERADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate font-mono text-sm">
        Cargando…
      </div>
    );
  }

  return (
    <TourProvider>
      <div className="min-h-screen flex bg-paper">
        <aside className="w-60 border-r border-line flex flex-col">
          <div className="border-b border-line px-4 py-4"><LogoMark /></div>
          <nav className="flex-1 p-3 space-y-1">
            {nav.map((i) => (
              <Link
                key={i.url}
                to={i.url}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  pathname === i.url || (i.url !== "/admin" && pathname.startsWith(i.url))
                    ? "bg-signal/10 text-signal"
                    : "text-ink hover:bg-mist"
                }`}
              >
                <i.icon className="h-4 w-4" /> {i.title}
              </Link>
            ))}
          </nav>
          <div className="border-t border-line p-3 space-y-2">
            <div className="flex justify-end">
              <TourLauncher />
            </div>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/app"><ArrowLeft className="h-4 w-4 mr-2" /> Ir al panel</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => logout()}>
              <LogOut className="h-4 w-4 mr-2" /> Salir
            </Button>
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </TourProvider>
  );
}
