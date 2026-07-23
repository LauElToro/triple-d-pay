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
import {
  LayoutDashboard,
  KeyRound,
  BarChart3,
  Receipt,
  Package,
  Users,
  LifeBuoy,
  Settings,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import type { Permission } from "@/lib/api-types";

interface NavItem {
  title: string;
  url: string;
  icon: typeof LayoutDashboard;
  perm?: Permission;
}

const items: NavItem[] = [
  { title: "Resumen", url: "/app", icon: LayoutDashboard },
  { title: "API Keys", url: "/app/keys", icon: KeyRound, perm: "keys:read" },
  { title: "Uso", url: "/app/usage", icon: BarChart3, perm: "usage:read" },
  { title: "Facturas", url: "/app/invoices", icon: Receipt, perm: "invoices:read" },
  { title: "Equipo", url: "/app/team", icon: Users, perm: "team:read" },
  { title: "Soporte", url: "/app/tickets", icon: LifeBuoy, perm: "tickets:read" },
  { title: "Planes", url: "/app/plans", icon: Package },
  { title: "Ajustes", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, activeOrg, logout, hasPermission } = useAuth();

  const visible = items.filter((i) => !i.perm || hasPermission(i.perm));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-line px-4 py-4">
        <LogoMark />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase">Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visible.map((item) => (
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

        {user?.systemRole === "SUPERADMIN" && (
          <SidebarGroup>
            <SidebarGroupLabel className="font-mono text-[10px] uppercase">Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/admin")}>
                    <Link to="/admin">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Consola global</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t border-line p-3 space-y-2">
        {user && (
          <div className="text-xs font-mono text-slate truncate" title={user.id}>
            {user.email}
            <div className="opacity-60">
              {activeOrg?.subRole ?? activeOrg?.orgRole ?? user.systemRole}
            </div>
          </div>
        )}
        <Button variant="outline" size="sm" onClick={() => logout()} className="w-full">
          <LogOut className="h-4 w-4 mr-2" /> Salir
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
