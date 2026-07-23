import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatARS } from "@/lib/mock-data";
import type { InvoiceView } from "@/lib/api-types";

const statusStyle: Record<string, string> = {
  paid: "bg-signal/15 text-signal border-signal/30",
  pending: "bg-mist text-ink border-line",
  overdue: "bg-seal/15 text-seal border-seal/30",
  void: "bg-mist text-slate border-line",
};

const statusLabel: Record<string, string> = {
  paid: "Pagada",
  pending: "Pendiente",
  overdue: "Vencida",
  void: "Anulada",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("es-AR");
}

export function InvoiceTable({ invoices }: { invoices: InvoiceView[] }) {
  if (invoices.length === 0) {
    return (
      <div className="border border-line border-dashed rounded-md bg-card p-10 text-center text-slate text-sm">
        Todavía no hay facturas emitidas.
      </div>
    );
  }
  return (
    <div className="border border-line rounded-md bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-mono text-xs uppercase">Factura</TableHead>
            <TableHead className="font-mono text-xs uppercase">Período</TableHead>
            <TableHead className="font-mono text-xs uppercase">Monto</TableHead>
            <TableHead className="font-mono text-xs uppercase">Estado</TableHead>
            <TableHead className="font-mono text-xs uppercase">Vence</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-mono">{inv.id.slice(0, 8)}</TableCell>
              <TableCell className="text-sm text-slate">
                {fmt(inv.periodStart)} → {fmt(inv.periodEnd)}
              </TableCell>
              <TableCell className="font-mono">{formatARS(inv.amount)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusStyle[inv.status]}>
                  {statusLabel[inv.status]}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">{fmt(inv.dueAt)}</TableCell>
              <TableCell>
                {inv.status !== "paid" && inv.status !== "void" && (
                  <Button size="sm" onClick={() => alert("Redirección a MercadoPago (placeholder)")}>
                    Pagar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
