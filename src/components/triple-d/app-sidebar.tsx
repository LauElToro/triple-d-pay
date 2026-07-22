import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./logo";
import { LayoutDashboard, KeyRound, BarChart3, Receipt, Package, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const items = [
  { title: "Resumen", url: "/app", icon: LayoutDashboard },
  { title: "API Key", url: "/app/keys", icon: KeyRound },
  { title: "Uso", url: "/app/usage", icon: BarChart3 },
  { title: "Facturas", url: "/app/invoices", icon: Receipt },
  { title: "Planes", url: "/app/plans", icon: Package },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-line px-4 py-4">
        <LogoMark />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase">
            Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-line p-3 space-y-2">
        {user && (
          <div className="text-xs font-mono text-slate truncate" title={user.id}>
            {user.email}
            <div className="opacity-60">id: {user.id.slice(0, 8)}…</div>
          </div>
        )}
        <Button variant="outline" size="sm" onClick={logout} className="w-full">
          <LogOut className="h-4 w-4 mr-2" /> Salir
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
