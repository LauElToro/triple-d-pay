import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { StatChip } from "@/components/set-api/stat-chip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useTranslation } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/health")({
  component: AdminHealth,
});

type HealthStatus = "ok" | "degraded" | "down";

interface ServiceCheck {
  id: string;
  name: string;
  group: "platform" | "api" | "integration";
  status: HealthStatus;
  latencyMs: number | null;
  message?: string;
  details?: Record<string, unknown>;
  checkedAt: string;
}

interface HealthDashboard {
  status: HealthStatus;
  checkedAt: string;
  summary: {
    ok: number;
    degraded: number;
    down: number;
    avgLatencyMs: number;
  };
  platform: ServiceCheck[];
  apis: ServiceCheck[];
  integrations: ServiceCheck[];
  issues: string[];
}

const statusStyles: Record<HealthStatus, string> = {
  ok: "text-emerald-600 bg-emerald-50 border-emerald-200",
  degraded: "text-amber-700 bg-amber-50 border-amber-200",
  down: "text-red-700 bg-red-50 border-red-200",
};

function StatusIcon({ status }: { status: HealthStatus }) {
  if (status === "ok") return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
  if (status === "degraded") return <AlertTriangle className="h-4 w-4 text-amber-600" />;
  return <XCircle className="h-4 w-4 text-red-600" />;
}

function ServiceCard({ item, latencyLabel }: { item: ServiceCheck; latencyLabel: string }) {
  return (
    <Card className="border-line">
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">{item.name}</div>
            <div className="text-xs text-slate font-mono truncate">{item.id}</div>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase shrink-0",
              statusStyles[item.status]
            )}
          >
            <StatusIcon status={item.status} />
            {item.status}
          </span>
        </div>
        <div className="flex justify-between text-xs text-slate gap-2">
          <span className="truncate">{item.message ?? "—"}</span>
          <span className="font-mono shrink-0">
            {item.latencyMs !== null ? `${item.latencyMs} ${latencyLabel}` : "—"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ServiceGrid({
  title,
  items,
  empty,
  latencyLabel,
}: {
  title: string;
  items: ServiceCheck[];
  empty: string;
  latencyLabel: string;
}) {
  return (
    <Card className="border-line">
      <CardHeader>
        <CardTitle className="font-display text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-slate">{empty}</p>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {items.map((item) => (
              <ServiceCard key={item.id} item={item} latencyLabel={latencyLabel} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AdminHealth() {
  const { t } = useTranslation();
  const { data, isLoading, isFetching, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["admin-health"],
    queryFn: () => api.get<HealthDashboard>("/api/admin/health"),
    refetchInterval: 30_000,
  });

  if (isLoading || !data) {
    return <p className="text-slate text-sm font-mono">{t("admin.health.loading")}</p>;
  }

  const overallClass = statusStyles[data.status];

  return (
    <div className="space-y-6" data-tour="admin-health">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">{t("admin.health.title")}</h1>
          <p className="text-slate text-sm">{t("admin.health.subtitle")}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={cn("h-4 w-4 mr-2", isFetching && "animate-spin")} />
          {t("admin.health.refresh")}
        </Button>
      </div>

      <div
        className={cn(
          "rounded-lg border px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
          overallClass
        )}
      >
        <div className="flex items-center gap-2 font-display font-semibold">
          <StatusIcon status={data.status} />
          {t("admin.health.overall")}: {data.status.toUpperCase()}
        </div>
        <div className="text-xs font-mono opacity-80">
          {t("admin.health.lastCheck")}: {formatDate(new Date(dataUpdatedAt || data.checkedAt))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatChip label={t("admin.health.ok")} value={data.summary.ok} />
        <StatChip label={t("admin.health.degraded")} value={data.summary.degraded} />
        <StatChip label={t("admin.health.down")} value={data.summary.down} />
        <StatChip
          label={t("admin.health.avgLatency")}
          value={`${data.summary.avgLatencyMs} ms`}
        />
      </div>

      {data.issues.length > 0 && (
        <Card className="border-red-200 bg-red-50/40">
          <CardHeader>
            <CardTitle className="font-display text-lg text-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {t("admin.health.issues")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.issues.map((issue) => (
              <div key={issue} className="text-sm text-red-900 font-mono border-b border-red-100 pb-2 last:border-0">
                {issue}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <ServiceGrid
        title={t("admin.health.platform")}
        items={data.platform}
        empty={t("admin.noData")}
        latencyLabel={t("admin.health.ms")}
      />

      <ServiceGrid
        title={t("admin.health.apis")}
        items={data.apis}
        empty={t("admin.noData")}
        latencyLabel={t("admin.health.ms")}
      />

      <ServiceGrid
        title={t("admin.health.integrations")}
        items={data.integrations}
        empty={t("admin.noData")}
        latencyLabel={t("admin.health.ms")}
      />
    </div>
  );
}
