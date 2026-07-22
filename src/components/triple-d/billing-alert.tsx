import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock } from "lucide-react";
import type { MockInvoice } from "@/lib/mock-data";
import { formatARS } from "@/lib/mock-data";

export function BillingAlert({ invoice }: { invoice: MockInvoice }) {
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
        {overdue
          ? "Riesgo de suspensión del servicio"
          : "Factura pendiente de pago"}
      </AlertTitle>
      <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <span>
          {overdue
            ? `Tu factura ${invoice.id} está vencida. Si no se paga, la key será suspendida.`
            : `Factura ${invoice.id} por ${formatARS(invoice.amount)} vence el ${invoice.dueAt}. Tenés 15 días de gracia.`}
        </span>
        <Button
          size="sm"
          onClick={() => alert("Redirección a MercadoPago (placeholder)")}
        >
          Pagar con MercadoPago
        </Button>
      </AlertDescription>
    </Alert>
  );
}
