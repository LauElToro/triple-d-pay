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
import { useTranslation } from "@/lib/i18n-context";

const statusStyle: Record<string, string> = {
  paid: "bg-signal/15 text-signal border-signal/30",
  pending: "bg-mist text-ink border-line",
  overdue: "bg-seal/15 text-seal border-seal/30",
};

export function InvoiceTable() {
  const { t } = useTranslation();

  const statusLabel: Record<string, string> = {
    paid: t("invoices.statusPaid"),
    pending: t("invoices.statusPending"),
    overdue: t("invoices.statusOverdue"),
  };

  return (
    <div className="border border-line rounded-md bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-mono text-xs uppercase">{t("invoices.colInvoice")}</TableHead>
            <TableHead className="font-mono text-xs uppercase">{t("invoices.colPeriod")}</TableHead>
            <TableHead className="font-mono text-xs uppercase">{t("invoices.colAmount")}</TableHead>
            <TableHead className="font-mono text-xs uppercase">{t("invoices.colStatus")}</TableHead>
            <TableHead className="font-mono text-xs uppercase">{t("invoices.colDue")}</TableHead>
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
                    {t("common.pay")}
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
