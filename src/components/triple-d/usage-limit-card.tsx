import { Link } from "@tanstack/react-router";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UsageLimit } from "@/content/dashboard";
import { useTranslation } from "@/lib/i18n-context";

export function UsageLimitCard({ item }: { item: UsageLimit }) {
  const { t } = useTranslation();
  const pct = item.unlimited
    ? 0
    : item.limit > 0
      ? Math.min(100, (item.used / item.limit) * 100)
      : 0;

  return (
    <Card className="border-line">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-display text-base">{t(`dashboard.usage.${item.id}`)}</CardTitle>
          {item.productionOnly && (
            <Badge variant="outline" className="text-[10px] font-mono uppercase shrink-0">
              {t("dashboard.usageSummary.productionOnly")}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm font-mono">
          <span className="text-2xl font-display font-bold text-ink">{item.used}</span>
          <span className="text-slate">
            {" "}
            {t("dashboard.usage.of")}{" "}
            {item.unlimited ? "∞" : item.limit.toLocaleString()}
          </span>
        </div>
        {!item.unlimited && (
          <Progress value={pct} className="h-1.5 bg-mist [&>div]:bg-signal" />
        )}
        <Link to="/app/subscription" className="text-xs text-signal hover:underline font-mono">
          {t("dashboard.usageSummary.increaseLimit")}
        </Link>
      </CardContent>
    </Card>
  );
}
