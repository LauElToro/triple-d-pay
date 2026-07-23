import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { DASHBOARD_PERIOD } from "@/content/dashboard";
import { useTranslation } from "@/lib/i18n-context";

export function DashboardFilters({
  showEnvironment = false,
  total = 0,
}: {
  showEnvironment?: boolean;
  total?: number;
}) {
  const { t } = useTranslation();

  return (
    <Card className="border-line">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-end gap-4">
          {showEnvironment && (
            <div className="space-y-1.5 min-w-[140px]">
              <Label className="text-xs font-mono uppercase text-slate">{t("filters.environment")}</Label>
              <Select defaultValue="production">
                <SelectTrigger className="h-9 border-line bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">{t("filters.production")}</SelectItem>
                  <SelectItem value="development">{t("filters.development")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-1.5 min-w-[200px]">
            <Label className="text-xs font-mono uppercase text-slate">{t("filters.presetRange")}</Label>
            <Select defaultValue="currentPeriod">
              <SelectTrigger className="h-9 border-line bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="currentPeriod">{t("filters.currentPeriod")}</SelectItem>
                <SelectItem value="last30">{t("filters.last30")}</SelectItem>
                <SelectItem value="last7">{t("filters.last7")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase text-slate">{t("filters.from")}</Label>
            <Input type="date" defaultValue={DASHBOARD_PERIOD.start} className="h-9 w-[160px] border-line" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase text-slate">{t("filters.to")}</Label>
            <Input type="date" defaultValue={DASHBOARD_PERIOD.end} className="h-9 w-[160px] border-line" />
          </div>
          <div className="ml-auto text-xs font-mono text-slate border border-line rounded-full px-3 py-1.5 bg-mist/50">
            {t("filters.totalInRange")}{" "}
            <span className="font-semibold text-ink">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
