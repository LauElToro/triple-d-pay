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
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./logo";
import { Home, Hash, Activity, Zap, CreditCard, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";

function isNavActive(url: string, pathname: string) {
  if (url === "/app") return pathname === "/app" || pathname === "/app/";
  return pathname === url;
}

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const { t, plans } = useTranslation();
  const collapsed = state === "collapsed";
  const planName = plans.find((p) => p.id === user?.planId)?.name ?? "Free";

  const items = [
    { title: t("sidebar.home"), url: "/app", icon: Home },
    { title: t("sidebar.cuits"), url: "/app/cuits", icon: Hash },
    { title: t("sidebar.requests"), url: "/app/requests", icon: Activity },
    { title: t("sidebar.automations"), url: "/app/automations", icon: Zap },
    { title: t("sidebar.subscription"), url: "/app/subscription", icon: CreditCard },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="overflow-hidden border-b border-line px-4 py-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-3">
        <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:items-center">
          <LogoMark compact={collapsed} />
          {!collapsed && (
            <span className="text-[10px] font-mono uppercase text-slate pl-0.5">{planName}</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase">
            {t("sidebar.panel")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isNavActive(item.url, pathname)}
                    tooltip={item.title}
                  >
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
      <SidebarFooter className="border-t border-line p-3 space-y-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-2">
        {user && (
          <div
            className="truncate text-xs font-mono text-slate group-data-[collapsible=icon]:hidden"
            title={user.id}
          >
            {user.email}
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="w-full group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0"
          title={t("nav.logout")}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="ml-2 group-data-[collapsible=icon]:hidden">{t("nav.logout")}</span>
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
