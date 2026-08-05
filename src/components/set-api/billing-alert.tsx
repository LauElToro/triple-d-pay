import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock } from "lucide-react";
import type { InvoiceView } from "@/lib/api-types";
import { formatARS, formatDate } from "@/lib/format";
import { useTranslation } from "@/lib/i18n-context";

export function BillingAlert({ invoice }: { invoice: InvoiceView }) {
  const { t } = useTranslation();

  if (invoice.status === "paid" || invoice.status === "void") return null;
  const overdue = invoice.status === "overdue";

  return (
    <Alert className={overdue ? "border-seal bg-seal/10" : "border-signal bg-signal/5"}>
      {overdue ? (
        <AlertTriangle className="h-4 w-4 text-seal" />
      ) : (
        <Clock className="h-4 w-4 text-signal" />
      )}
      <AlertTitle className="font-display">
        {overdue ? t("billing.overdueTitle") : t("billing.pendingTitle")}
      </AlertTitle>
      <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <span>
          {overdue
            ? t("billing.overdueDesc", { id: invoice.id.slice(0, 8) })
            : t("billing.pendingDesc", {
                id: invoice.id.slice(0, 8),
                amount: formatARS(invoice.amount),
                due: formatDate(invoice.dueAt),
              })}
        </span>
        <Badge variant="outline" className="shrink-0 font-mono uppercase">
          {t("common.comingSoon")}
        </Badge>
      </AlertDescription>
    </Alert>
  );
}
