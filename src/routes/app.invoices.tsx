import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BillingAlert } from "@/components/triple-d/billing-alert";
import { InvoiceTable } from "@/components/triple-d/invoice-table";
import { api } from "@/lib/api";
import type { InvoiceView } from "@/lib/api-types";

export const Route = createFileRoute("/app/invoices")({
  component: InvoicesPage,
});

function InvoicesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => api.get<{ invoices: InvoiceView[] }>("/api/invoices"),
  });

  const invoices = data?.invoices ?? [];
  const pending = invoices.find((i) => i.status !== "paid" && i.status !== "void");

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Facturas</h1>
        <p className="text-slate text-sm">Ciclos cerrados y pendientes de cobro.</p>
      </div>
      {pending && <BillingAlert invoice={pending} />}
      {isLoading ? (
        <p className="text-slate text-sm font-mono">Cargando…</p>
      ) : (
        <InvoiceTable invoices={invoices} />
      )}
    </div>
  );
}
