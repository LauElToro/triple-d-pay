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
  BarChart3,
  Building2,
  LifeBuoy,
  LogOut,
  ArrowLeft,
  Activity,
  Wallet,
  HeartPulse,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

function isAdminNavActive(url: string, pathname: string) {
  if (url === "/admin") return pathname === "/admin" || pathname === "/admin/";
  return pathname === url || pathname.startsWith(`${url}/`);
}

const activeNavClass =
  "!bg-[color-mix(in_oklch,var(--signal)_18%,transparent)] !text-signal !font-bold [&_svg]:!text-signal hover:!bg-[color-mix(in_oklch,var(--signal)_22%,transparent)] hover:!text-signal";

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { logout } = useAuth();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const { t } = useTranslation();
  const collapsed = state === "collapsed";

  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [pathname, isMobile, setOpenMobile]);

  const items = [
    { title: t("admin.nav.kpis"), url: "/admin", icon: BarChart3 },
    { title: t("admin.nav.clients"), url: "/admin/clients", icon: Building2 },
    { title: t("admin.nav.traffic"), url: "/admin/traffic", icon: Activity },
    { title: t("admin.nav.health"), url: "/admin/health", icon: HeartPulse },
    { title: t("admin.nav.profitability"), url: "/admin/profitability", icon: Wallet },
    { title: t("admin.nav.tickets"), url: "/admin/tickets", icon: LifeBuoy },
  ];

  return (
    <Sidebar collapsible="icon" data-tour="admin-sidebar">
      <SidebarHeader className="overflow-hidden border-b border-line px-4 py-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-3">
        <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:items-center">
          <LogoMark compact={collapsed} />
          {!collapsed && (
            <span className="text-[10px] font-mono uppercase text-slate pl-0.5">
              {t("admin.badge")}
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase">
            {t("admin.section")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isAdminNavActive(item.url, pathname);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className={cn(active && activeNavClass)}
                    >
                      <Link to={item.url} aria-current={active ? "page" : undefined}>
                        <item.icon className={cn("h-4 w-4", active && "!text-signal")} />
                        <span className={cn(active && "!text-signal !font-bold")}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-line p-3 space-y-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0"
          title={t("admin.backToApp")}
        >
          <Link to="/app">
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="ml-2 group-data-[collapsible=icon]:hidden">{t("admin.backToApp")}</span>
          </Link>
        </Button>
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
