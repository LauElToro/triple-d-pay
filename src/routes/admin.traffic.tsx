import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatChip } from "@/components/set-api/stat-chip";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/admin/traffic")({
  component: AdminTraffic,
});

interface Traffic {
  totals: { logins30d: number };
  daily: { day: string; count: number }[];
  byCountry: { label: string; count: number }[];
  byReferrer: { label: string; count: number }[];
  byLanding: { label: string; count: number }[];
  recent: {
    id: string;
    email: string;
    name: string | null;
    org: string | null;
    planId: string | null;
    country: string | null;
    ip: string | null;
    referrer: string | null;
    landingPath: string | null;
    utmSource: string | null;
    createdAt: string;
  }[];
}

function Rank({ title, data, empty }: { title: string; data: { label: string; count: number }[]; empty: string }) {
  return (
    <Card className="border-line">
      <CardHeader><CardTitle className="font-display text-lg">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex justify-between text-sm gap-2">
            <span className="truncate font-mono text-xs">{d.label}</span>
            <span className="font-mono shrink-0">{d.count}</span>
          </div>
        ))}
        {data.length === 0 && <p className="text-sm text-slate">{empty}</p>}
      </CardContent>
    </Card>
  );
}

function AdminTraffic() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-traffic"],
    queryFn: () => api.get<Traffic>("/api/admin/traffic"),
  });

  if (isLoading || !data) {
    return <p className="text-slate text-sm font-mono">{t("admin.traffic.loading")}</p>;
  }

  const maxDay = Math.max(1, ...data.daily.map((d) => d.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">{t("admin.traffic.title")}</h1>
        <p className="text-slate text-sm">{t("admin.traffic.subtitle")}</p>
      </div>

      <StatChip label={t("admin.traffic.logins30d")} value={data.totals.logins30d} />

      <Card className="border-line">
        <CardHeader><CardTitle className="font-display text-lg">{t("admin.traffic.loginsByDay")}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-32 overflow-x-auto">
            {data.daily.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-1 min-w-[18px] flex-1">
                <div
                  className="w-full bg-signal/80 rounded-t-sm min-h-[2px]"
                  style={{ height: `${(d.count / maxDay) * 100}%` }}
                  title={`${d.day}: ${d.count}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Rank title={t("admin.traffic.countries")} data={data.byCountry} empty={t("admin.noData")} />
        <Rank title={t("admin.traffic.referrers")} data={data.byReferrer} empty={t("admin.noData")} />
        <Rank title={t("admin.traffic.landing")} data={data.byLanding} empty={t("admin.noData")} />
      </div>

      <Card className="border-line">
        <CardHeader><CardTitle className="font-display text-lg">{t("admin.traffic.recentAccess")}</CardTitle></CardHeader>
        <CardContent className="space-y-2 max-h-[480px] overflow-y-auto">
          {data.recent.map((e) => (
            <div key={e.id} className="text-sm border-b border-line pb-2 last:border-0">
              <div className="flex justify-between gap-2">
                <span className="font-medium truncate">{e.email}</span>
                <span className="font-mono text-xs text-slate shrink-0">{formatDate(e.createdAt)}</span>
              </div>
              <div className="text-xs text-slate font-mono mt-0.5">
                {e.org ?? "—"} · {e.planId ?? "—"} · {e.country ?? "??"} · {e.ip ?? "—"}
              </div>
              <div className="text-xs text-slate truncate">
                {e.landingPath ?? "/"} · {t("admin.ref")} {e.referrer ?? t("admin.direct")}
                {e.utmSource ? ` · utm ${e.utmSource}` : ""}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
