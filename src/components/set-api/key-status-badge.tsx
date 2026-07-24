import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n-context";
import type { ApiKeyView } from "@/lib/api-types";

export function KeyStatusBadge({ status }: { status: ApiKeyView["status"] }) {
  const { t } = useTranslation();

  if (status === "active") {
    return (
      <Badge className="bg-signal text-primary-foreground font-mono uppercase text-xs">
        {t("keyStatus.active")}
      </Badge>
    );
  }
  if (status === "revoked") {
    return (
      <Badge className="bg-mist text-slate border border-line font-mono uppercase text-xs">
        {t("keyStatus.revoked")}
      </Badge>
    );
  }
  return (
    <Badge className="bg-seal text-destructive-foreground font-mono uppercase text-xs">
      {t("keyStatus.suspended")}
    </Badge>
  );
}
