import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n-context";

export function KeyStatusBadge({ status }: { status: "active" | "suspended" }) {
  const { t } = useTranslation();

  if (status === "active") {
    return (
      <Badge className="bg-signal text-primary-foreground font-mono uppercase text-xs">
        {t("keyStatus.active")}
      </Badge>
    );
  }
  return (
    <Badge className="bg-seal text-destructive-foreground font-mono uppercase text-xs">
      {t("keyStatus.suspended")}
    </Badge>
  );
}
