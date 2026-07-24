import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPageHeader } from "@/components/set-api/app-page-header";
import { UsageChart } from "@/components/set-api/usage-chart";
import { StatChip } from "@/components/set-api/stat-chip";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import type { UsageView } from "@/lib/api-types";
import { formatARS } from "@/lib/format";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/app/requests")({
  component: RequestsPage,
});

function RequestsPage() {
  const { t } = useTranslation();
  const { activeOrg, hasPermission } = useAuth();

  const usage = useQuery({
    queryKey: ["usage", activeOrg?.id],
    queryFn: () => api.get<UsageView>("/api/usage"),
    enabled: Boolean(activeOrg) && hasPermission("usage:read"),
  });

  const daily = usage.data?.daily ?? [];
  const total7d = daily.reduce((s, d) => s + d.count, 0);
  const peak = daily.reduce((m, d) => Math.max(m, d.count), 0);
  const avg = daily.length ? Math.round(total7d / daily.length) : 0;

  return (
    <div className="space-y-6 max-w-6xl">
      <AppPageHeader
        title={t("usage.title")}
        description={
          usage.data
            ? t("usage.subtitle", {
                date: usage.data.plan.name,
              })
            : t("requests.subtitle")
        }
        crumbs={[{ label: t("usage.title") }]}
      />

      {usage.isLoading ? (
        <p className="text-sm text-slate font-mono">{t("common.loading")}</p>
      ) : usage.data ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatChip label={t("usage.total7d")} value={total7d} />
            <StatChip label={t("usage.avgDay")} value={avg} />
            <StatChip label={t("usage.peak")} value={peak} />
            <StatChip
              label={t("dashboard.vouchers7d")}
              value={
                usage.data.cycle.remaining === null
                  ? `${usage.data.cycle.units} / ∞`
                  : `${usage.data.cycle.units} / ${usage.data.plan.cap}`
              }
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="border border-line rounded-md p-4 bg-card">
              <div className="text-xs uppercase tracking-wider text-slate font-mono mb-1">
                {t("invoices.colAmount")}
              </div>
              <div className="font-mono text-xl">{formatARS(usage.data.cycle.cost)}</div>
            </div>
            <div className="border border-line rounded-md p-4 bg-card">
              <div className="text-xs uppercase tracking-wider text-slate font-mono mb-1">
                {t("dashboard.currentPlan")}
              </div>
              <div className="font-display text-xl">{usage.data.plan.name}</div>
            </div>
          </div>

          <UsageChart days={daily} />
        </>
      ) : (
        <p className="text-sm text-slate">{t("requests.empty")}</p>
      )}
    </div>
  );
}
