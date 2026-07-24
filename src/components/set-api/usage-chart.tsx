import { useTranslation } from "@/lib/i18n-context";

export function UsageChart({ days }: { days: { day: string; count: number }[] }) {
  const { t } = useTranslation();
  const max = Math.max(1, ...days.map((d) => d.count));

  if (days.length === 0) {
    return (
      <div className="border border-line bg-card rounded-md p-4 text-sm text-slate">
        {t("requests.empty")}
      </div>
    );
  }

  return (
    <div className="border border-line bg-card rounded-md p-4" data-tour="usage-chart">
      <div className="text-xs uppercase tracking-wider text-slate font-mono mb-4">
        {t("usage.chartTitle")}
      </div>
      <div className="flex items-end gap-3 h-40">
        {days.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-mono text-ink">{d.count}</div>
            <div
              className="w-full bg-signal/80 rounded-t-sm transition-all min-h-[2px]"
              style={{ height: `${(d.count / max) * 100}%` }}
              aria-label={`${d.day}: ${d.count} ${t("usage.vouchers")}`}
            />
            <div className="text-xs text-slate font-mono">{d.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
