import { createFileRoute } from "@tanstack/react-router";
import { BillingAlert } from "@/components/triple-d/billing-alert";
import { InvoiceTable } from "@/components/triple-d/invoice-table";
import { MOCK_INVOICES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/invoices")({
  component: InvoicesPage,
});

function InvoicesPage() {
  const pending = MOCK_INVOICES.find((i) => i.status !== "paid");
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Facturas</h1>
        <p className="text-slate text-sm">Ciclos cerrados y pendientes de cobro.</p>
      </div>
      {pending && <BillingAlert invoice={pending} />}
      <InvoiceTable />
    </div>
  );
}
