import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock } from "lucide-react";
import type { MockInvoice } from "@/lib/mock-data";
import { formatARS } from "@/lib/mock-data";
import { useTranslation } from "@/lib/i18n-context";

export function BillingAlert({ invoice }: { invoice: MockInvoice }) {
  const { t } = useTranslation();

  if (invoice.status === "paid") return null;
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
            ? t("billing.overdueDesc", { id: invoice.id })
            : t("billing.pendingDesc", {
                id: invoice.id,
                amount: formatARS(invoice.amount),
                due: invoice.dueAt,
              })}
        </span>
        <Button
          size="sm"
          onClick={() => alert("Redirección a MercadoPago (placeholder)")}
        >
          {t("billing.payMercadoPago")}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
