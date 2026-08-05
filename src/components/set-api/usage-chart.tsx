import { useTranslation } from "@/lib/i18n-context";
import { formatChartDay } from "@/lib/format";
import type { Locale } from "@/lib/i18n";

const CHART_LOCALES: Record<Locale, string> = {
  es: "es-AR",
  en: "en-US",
  pt: "pt-BR",
};

export function UsageChart({ days }: { days: { day: string; count: number }[] }) {
  const { t, locale } = useTranslation();
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
        {days.map((d) => {
          const label = formatChartDay(d.day, CHART_LOCALES[locale]);
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2 min-w-0">
              <div className="text-xs font-mono text-ink">{d.count}</div>
              <div
                className="w-full bg-signal/80 rounded-t-sm transition-all min-h-[2px]"
                style={{ height: `${(d.count / max) * 100}%` }}
                aria-label={`${label}: ${d.count} ${t("usage.vouchers")}`}
              />
              <div className="text-[10px] text-slate font-mono truncate w-full text-center" title={label}>
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
