import { createFileRoute } from "@tanstack/react-router";
import { AccessTokenCard } from "@/components/triple-d/access-token-card";
import { AppPageHeader } from "@/components/triple-d/app-page-header";
import { BillingAlert } from "@/components/triple-d/billing-alert";
import { UsageLimitCard } from "@/components/triple-d/usage-limit-card";
import { DASHBOARD_PERIOD, USAGE_LIMITS } from "@/content/dashboard";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { MOCK_INVOICES, MOCK_KEY } from "@/lib/mock-data";

export const Route = createFileRoute("/app/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { user } = useAuth();
  const { t, plans } = useTranslation();
  const pending = MOCK_INVOICES.find((i) => i.status !== "paid");
  const plan = plans.find((p) => p.id === user?.planId);

  return (
    <div className="space-y-8 max-w-6xl">
      <AppPageHeader
        title={t("sidebar.home")}
        description={user?.email}
        crumbs={[{ label: t("sidebar.home") }]}
      />

      {pending && <BillingAlert invoice={pending} />}

      <AccessTokenCard prefix={MOCK_KEY.prefix} status={MOCK_KEY.status} />

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold">{t("dashboard.usageSummary.title")}</h2>
          <p className="text-sm text-slate font-mono mt-1">
            {t("dashboard.usageSummary.period", {
              start: DASHBOARD_PERIOD.start,
              end: DASHBOARD_PERIOD.end,
            })}
            {plan && (
              <span className="ml-2 text-ink">· {plan.name}</span>
            )}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USAGE_LIMITS.map((item) => (
            <UsageLimitCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
