import { useTranslation } from "@/lib/i18n-context";

export function UsageChart() {
  const { t, usageDays } = useTranslation();
  const max = Math.max(...usageDays.map((d) => d.count));

  return (
    <div className="border border-line bg-card rounded-md p-4">
      <div className="text-xs uppercase tracking-wider text-slate font-mono mb-4">
        {t("usage.chartTitle")}
      </div>
      <div className="flex items-end gap-3 h-40">
        {usageDays.map((d) => (
          <div key={d.key} className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-mono text-ink">{d.count}</div>
            <div
              className="w-full bg-signal/80 rounded-t-sm transition-all"
              style={{ height: `${(d.count / max) * 100}%` }}
              aria-label={`${d.label}: ${d.count} ${t("usage.vouchers")}`}
            />
            <div className="text-xs text-slate font-mono">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
