import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AccessTokenCard } from "@/components/triple-d/access-token-card";
import { AppPageHeader } from "@/components/triple-d/app-page-header";
import { BillingAlert } from "@/components/triple-d/billing-alert";
import { UsageLimitCard } from "@/components/triple-d/usage-limit-card";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import type { ApiKeyView, InvoiceView, UsageView } from "@/lib/api-types";
import { formatDate } from "@/lib/format";
import { useTranslation } from "@/lib/i18n-context";
import type { UsageLimit } from "@/content/dashboard";

export const Route = createFileRoute("/app/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { user, activeOrg, hasPermission } = useAuth();
  const { t, plans } = useTranslation();
  const plan = plans.find((p) => p.id === activeOrg?.planId);

  const keys = useQuery({
    queryKey: ["keys", activeOrg?.id],
    queryFn: () => api.get<{ keys: ApiKeyView[] }>("/api/keys"),
    enabled: Boolean(activeOrg) && hasPermission("keys:read"),
  });

  const invoices = useQuery({
    queryKey: ["invoices", activeOrg?.id],
    queryFn: () => api.get<{ invoices: InvoiceView[] }>("/api/invoices"),
    enabled: Boolean(activeOrg) && hasPermission("invoices:read"),
  });

  const usage = useQuery({
    queryKey: ["usage", activeOrg?.id],
    queryFn: () => api.get<UsageView>("/api/usage"),
    enabled: Boolean(activeOrg) && hasPermission("usage:read"),
  });

  const activeKey =
    keys.data?.keys.find((k) => k.status === "active") ??
    keys.data?.keys.find((k) => k.status !== "revoked") ??
    null;

  const pending = invoices.data?.invoices.find(
    (i) => i.status === "pending" || i.status === "overdue",
  );

  const periodStart = activeKey?.usageStartedAt;
  const periodEnd = activeKey?.cycleEndsAt;

  const usageLimits: UsageLimit[] = [];
  if (usage.data) {
    const cap = usage.data.plan.cap;
    usageLimits.push({
      id: "requests",
      used: usage.data.cycle.units,
      limit: cap ?? usage.data.cycle.units,
      unlimited: cap === null,
      productionOnly: true,
    });
  }
  if (activeOrg) {
    usageLimits.push({
      id: "cuits",
      used: activeOrg.arcaCuit ? 1 : 0,
      limit: 1,
      productionOnly: true,
    });
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <AppPageHeader
        title={t("sidebar.home")}
        description={user?.email}
        crumbs={[{ label: t("sidebar.home") }]}
      />

      {pending && <BillingAlert invoice={pending} />}

      {keys.isLoading ? (
        <p className="text-sm text-slate font-mono">{t("common.loading")}</p>
      ) : activeKey ? (
        <AccessTokenCard apiKey={activeKey} />
      ) : (
        <AccessTokenCard apiKey={null} />
      )}

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold">{t("dashboard.usageSummary.title")}</h2>
          <p className="text-sm text-slate font-mono mt-1">
            {periodStart && periodEnd
              ? t("dashboard.usageSummary.period", {
                  start: formatDate(periodStart),
                  end: formatDate(periodEnd),
                })
              : t("requests.empty")}
            {plan && <span className="ml-2 text-ink">· {plan.name}</span>}
          </p>
        </div>
        {usageLimits.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {usageLimits.map((item) => (
              <UsageLimitCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate">{t("common.loading")}</p>
        )}
      </section>
    </div>
  );
}
