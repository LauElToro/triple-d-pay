import { useEffect } from "react";
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
import {
  Home,
  Activity,
  CreditCard,
  LogOut,
  KeyRound,
  Settings,
  Users,
  LifeBuoy,
  Shield,
  FileText,
  Gift,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

function isNavActive(url: string, pathname: string) {
  if (url === "/app") return pathname === "/app" || pathname === "/app/";
  return pathname === url || pathname.startsWith(`${url}/`);
}

const activeNavClass =
  "!bg-[color-mix(in_oklch,var(--signal)_18%,transparent)] !text-signal !font-bold [&_svg]:!text-signal hover:!bg-[color-mix(in_oklch,var(--signal)_22%,transparent)] hover:!text-signal";

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, activeOrg, logout } = useAuth();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const { t, plans } = useTranslation();
  const collapsed = state === "collapsed";

  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [pathname, isMobile, setOpenMobile]);
  const planName = plans.find((p) => p.id === activeOrg?.planId)?.name ?? "Free";

  const items = [
    { title: t("sidebar.home"), url: "/app", icon: Home, tour: "nav-home" },
    { title: t("sidebar.apiKey"), url: "/app/keys", icon: KeyRound, tour: "nav-keys" },
    { title: t("sidebar.requests"), url: "/app/requests", icon: Activity, tour: "nav-requests" },
    { title: t("sidebar.comprobantes"), url: "/app/comprobantes", icon: FileText, tour: "nav-comprobantes" },
    { title: t("sidebar.subscription"), url: "/app/subscription", icon: CreditCard, tour: "nav-subscription" },
    { title: t("sidebar.team"), url: "/app/team", icon: Users, tour: "nav-team" },
    { title: t("sidebar.tickets"), url: "/app/tickets", icon: LifeBuoy, tour: "nav-tickets" },
    { title: t("sidebar.referrals"), url: "/app/referrals", icon: Gift, tour: "nav-referrals" },
    { title: t("sidebar.settings"), url: "/app/settings", icon: Settings, tour: "nav-settings" },
  ];

  return (
    <Sidebar collapsible="icon" data-tour="sidebar">
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
              {items.map((item) => {
                const active = isNavActive(item.url, pathname);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className={cn(active && activeNavClass)}
                    >
                      <Link to={item.url} data-tour={item.tour} aria-current={active ? "page" : undefined}>
                        <item.icon className={cn("h-4 w-4", active && "!text-signal")} />
                        <span className={cn(active && "!text-signal !font-bold")}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              {user?.systemRole === "SUPERADMIN" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith("/admin")}
                    tooltip="Admin"
                    className={cn(pathname.startsWith("/admin") && activeNavClass)}
                  >
                    <Link to="/admin" aria-current={pathname.startsWith("/admin") ? "page" : undefined}>
                      <Shield className={cn("h-4 w-4", pathname.startsWith("/admin") && "!text-signal")} />
                      <span className={cn(pathname.startsWith("/admin") && "!text-signal !font-bold")}>
                        Admin
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
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
