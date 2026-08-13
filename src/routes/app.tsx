import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/set-api/app-sidebar";
import { AppNoticeStack } from "@/components/set-api/app-notice-stack";
import { NavbarControls } from "@/components/set-api/navbar-controls";
import { TourLauncher } from "@/components/set-api/tour-launcher";
import { TourProvider } from "@/lib/tour/tour-context";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { isKycBlocking } from "@/lib/kyc";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { user, hydrated, activeOrg, refreshMe } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  useEffect(() => {
    if (!hydrated || !user || !activeOrg) return;
    if (user.systemRole === "SUPERADMIN") return;
    const done = Boolean(activeOrg.onboardingCompletedAt) || Boolean(user.onboardingSkippedAt);
    if (!done) {
      navigate({ to: "/onboarding" });
    }
  }, [hydrated, user, activeOrg, navigate]);

  useEffect(() => {
    if (!hydrated || !user) return;
    if (isKycBlocking(user)) {
      navigate({ to: "/kyc" });
    }
  }, [hydrated, user, navigate]);

  useEffect(() => {
    if (!user) return;
    void refreshMe().catch(() => undefined);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!hydrated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate font-mono text-sm">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <TourProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-paper">
          <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between border-b border-line bg-card/60 px-3 backdrop-blur">
            <div className="flex items-center gap-2 min-w-0">
              <SidebarTrigger
                className="h-9 w-9 md:h-7 md:w-7"
                aria-label={t("nav.openMenu")}
              />
              <span className="text-xs font-mono text-slate md:hidden truncate">
                {t("nav.menu")}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <TourLauncher />
              <NavbarControls />
            </div>
          </header>
          <div className="flex-1 p-6 md:p-8">
            <AppNoticeStack />
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TourProvider>
  );
}
