import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import type { InvoiceView } from "@/lib/api-types";
import { formatARS, formatDate } from "@/lib/format";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";

const statusStyle: Record<string, string> = {
  paid: "bg-signal/15 text-signal border-signal/30",
  pending: "bg-mist text-ink border-line",
  overdue: "bg-seal/15 text-seal border-seal/30",
  void: "bg-mist text-slate border-line",
};

export function InvoiceTable({ invoices: invoicesProp }: { invoices?: InvoiceView[] }) {
  const { t } = useTranslation();
  const { activeOrg, hasPermission } = useAuth();

  const query = useQuery({
    queryKey: ["invoices", activeOrg?.id],
    queryFn: () => api.get<{ invoices: InvoiceView[] }>("/api/invoices"),
    enabled: !invoicesProp && Boolean(activeOrg) && hasPermission("invoices:read"),
  });

  const invoices = invoicesProp ?? query.data?.invoices ?? [];

  const statusLabel: Record<string, string> = {
    paid: t("invoices.statusPaid"),
    pending: t("invoices.statusPending"),
    overdue: t("invoices.statusOverdue"),
    void: t("invoices.statusVoid"),
  };

  if (query.isLoading && !invoicesProp) {
    return <p className="text-sm text-slate font-mono">{t("common.loading")}</p>;
  }

  if (invoices.length === 0) {
    return <p className="text-sm text-slate">{t("invoices.empty")}</p>;
  }

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
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-mono text-xs">{inv.id.slice(0, 8)}…</TableCell>
              <TableCell className="text-sm text-slate">
                {formatDate(inv.periodStart)} → {formatDate(inv.periodEnd)}
              </TableCell>
              <TableCell className="font-mono">{formatARS(inv.amount)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusStyle[inv.status]}>
                  {statusLabel[inv.status] ?? inv.status}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">{formatDate(inv.dueAt)}</TableCell>
              <TableCell>
                {(inv.status === "pending" || inv.status === "overdue") && (
                  <Badge variant="outline" className="font-mono uppercase">
                    {t("common.comingSoon")}
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
