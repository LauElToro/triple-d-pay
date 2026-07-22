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
import { MOCK_INVOICES, formatARS } from "@/lib/mock-data";

const statusStyle: Record<string, string> = {
  paid: "bg-signal/15 text-signal border-signal/30",
  pending: "bg-mist text-ink border-line",
  overdue: "bg-seal/15 text-seal border-seal/30",
};

const statusLabel: Record<string, string> = {
  paid: "Pagada",
  pending: "Pendiente",
  overdue: "Vencida",
};

export function InvoiceTable() {
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
          {MOCK_INVOICES.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-mono">{inv.id}</TableCell>
              <TableCell className="text-sm text-slate">
                {inv.periodStart} → {inv.periodEnd}
              </TableCell>
              <TableCell className="font-mono">{formatARS(inv.amount)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusStyle[inv.status]}>
                  {statusLabel[inv.status]}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">{inv.dueAt}</TableCell>
              <TableCell>
                {inv.status !== "paid" && (
                  <Button
                    size="sm"
                    onClick={() => alert("Redirección a MercadoPago (placeholder)")}
                  >
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
