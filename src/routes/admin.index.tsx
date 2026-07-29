import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { StatChip } from "@/components/set-api/stat-chip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { formatARS, formatDate } from "@/lib/format";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/admin/")({
  component: AdminKpis,
});

interface Metrics {
  totals: {
    clients: number;
    users: number;
    activeKeys: number;
    kycApproved: number;
    unitsLast30: number;
    spendLast30: number;
    providerCostLast30?: number;
    marginLast30?: number;
    mrr: number;
    loginsLast30?: number;
  };
  byPlan: { planId: string; count: number }[];
  byClientType: { type: string; count: number }[];
  bySource: { source: string; count: number }[];
  ticketsByStatus: { status: string; count: number }[];
  topServices?: {
    service: string;
    calls: number;
    units: number;
    revenue: number;
    providerCost: number;
    margin: number;
  }[];
  recentClients: {
    id: string;
    name: string;
    planId: string;
    kycStatus: string;
    source?: string | null;
    owner?: string;
    lastLoginAt?: string | null;
    createdAt: string;
  }[];
}

function Distribution({ title, data, empty }: { title: string; data: { label: string; count: number }[]; empty: string }) {
  const total = Math.max(1, data.reduce((s, d) => s + d.count, 0));
  return (
    <Card className="border-line">
      <CardHeader><CardTitle className="font-display text-lg">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-sm">
              <span className="capitalize">{d.label}</span>
              <span className="font-mono">{d.count}</span>
            </div>
            <div className="h-2 bg-mist rounded">
              <div className="h-2 bg-signal rounded" style={{ width: `${(d.count / total) * 100}%` }} />
            </div>
          </div>
        ))}
        {data.length === 0 && <p className="text-slate text-sm">{empty}</p>}
      </CardContent>
    </Card>
  );
}

function AdminKpis() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ["metrics"],
    queryFn: () => api.get<Metrics>("/api/metrics"),
  });

  if (isLoading || !data) {
    return <p className="text-slate text-sm font-mono">{t("admin.kpis.loading")}</p>;
  }

  return (
    <div className="space-y-6" data-tour="admin-kpis">
      <div>
        <h1 className="text-3xl font-display font-bold">{t("admin.kpis.title")}</h1>
        <p className="text-slate text-sm">{t("admin.kpis.subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatChip label={t("admin.kpis.clients")} value={data.totals.clients} />
        <StatChip label={t("admin.kpis.users")} value={data.totals.users} />
        <StatChip label={t("admin.kpis.activeKeys")} value={data.totals.activeKeys} />
        <StatChip label={t("admin.kpis.kycApproved")} value={data.totals.kycApproved} />
        <StatChip label={t("admin.kpis.units30d")} value={data.totals.unitsLast30} />
        <StatChip label={t("admin.kpis.revenue30d")} value={formatARS(data.totals.spendLast30)} />
        <StatChip label={t("admin.kpis.cost30d")} value={formatARS(data.totals.providerCostLast30 ?? 0)} />
        <StatChip label={t("admin.kpis.margin30d")} value={formatARS(data.totals.marginLast30 ?? 0)} />
        <StatChip label={t("admin.kpis.mrr")} value={formatARS(data.totals.mrr)} />
        <StatChip label={t("admin.kpis.logins30d")} value={data.totals.loginsLast30 ?? 0} />
      </div>

      {(data.topServices?.length ?? 0) > 0 && (
        <Card className="border-line">
          <CardHeader><CardTitle className="font-display text-lg">{t("admin.kpis.topServices")}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.topServices!.map((s) => (
              <div key={s.service} className="flex justify-between text-sm border-b border-line pb-2 last:border-0">
                <span className="font-mono">{s.service}</span>
                <span className="text-slate">
                  {t("admin.kpis.topServiceLine", {
                    units: s.units,
                    revenue: formatARS(s.revenue),
                    margin: formatARS(s.margin),
                  })}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <Distribution
          title={t("admin.kpis.byPlan")}
          data={data.byPlan.map((p) => ({ label: p.planId, count: p.count }))}
          empty={t("admin.noData")}
        />
        <Distribution
          title={t("admin.kpis.byClientType")}
          data={data.byClientType.map((p) => ({ label: p.type, count: p.count }))}
          empty={t("admin.noData")}
        />
        <Distribution
          title={t("admin.kpis.bySource")}
          data={data.bySource.map((p) => ({ label: p.source, count: p.count }))}
          empty={t("admin.noData")}
        />
      </div>

      <Card className="border-line">
        <CardHeader><CardTitle className="font-display text-lg">{t("admin.kpis.recentClients")}</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {data.recentClients.map((c) => (
            <Link
              key={c.id}
              to="/admin/clients/$id"
              params={{ id: c.id }}
              className="flex justify-between text-sm border-b border-line pb-2 last:border-0 hover:text-signal"
            >
              <span>{c.name}</span>
              <span className="font-mono text-slate">
                {t("admin.kpis.recentLine", {
                  plan: c.planId,
                  source: c.source ?? "—",
                  login: formatDate(c.lastLoginAt),
                })}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
