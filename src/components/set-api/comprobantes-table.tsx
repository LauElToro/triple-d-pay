import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FileDown, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import type { IssuedComprobantesResponse } from "@/lib/api-types";
import { formatARS } from "@/lib/format";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { toast } from "sonner";

interface Filters {
  q: string;
  from: string;
  to: string;
  cbteTipo: string;
}

export function ComprobantesTable() {
  const { t } = useTranslation();
  const { activeOrg, hasPermission } = useAuth();
  const [filters, setFilters] = useState<Filters>({ q: "", from: "", to: "", cbteTipo: "" });
  const [applied, setApplied] = useState<Filters>(filters);
  const [page, setPage] = useState(1);
  const [downloading, setDownloading] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["issued-comprobantes", activeOrg?.id, applied, page],
    queryFn: () => {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (applied.q.trim()) params.set("q", applied.q.trim());
      if (applied.from) params.set("from", applied.from);
      if (applied.to) params.set("to", applied.to);
      if (applied.cbteTipo) params.set("cbteTipo", applied.cbteTipo);
      return api.get<IssuedComprobantesResponse>(`/api/arca/comprobantes/issued?${params}`);
    },
    enabled: Boolean(activeOrg) && hasPermission("arca:read"),
  });

  const rows = query.data?.comprobantes ?? [];
  const pagination = query.data?.pagination;

  async function downloadPdf(id: string, numero: string) {
    setDownloading(id);
    try {
      await api.download(
        `/api/arca/comprobantes/issued/${id}/pdf`,
        `factura-${numero.replace("-", "_")}.pdf`,
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("comprobantes.downloadError"));
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
          <Input
            className="pl-9"
            placeholder={t("comprobantes.searchPlaceholder")}
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          />
        </div>
        <Input
          type="date"
          value={filters.from}
          onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
          aria-label={t("comprobantes.from")}
        />
        <Input
          type="date"
          value={filters.to}
          onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
          aria-label={t("comprobantes.to")}
        />
        <Input
          placeholder={t("comprobantes.cbteTipoFilter")}
          value={filters.cbteTipo}
          onChange={(e) => setFilters((f) => ({ ...f, cbteTipo: e.target.value }))}
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => {
            setApplied(filters);
            setPage(1);
          }}
        >
          {t("comprobantes.applyFilters")}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const empty = { q: "", from: "", to: "", cbteTipo: "" };
            setFilters(empty);
            setApplied(empty);
            setPage(1);
          }}
        >
          {t("comprobantes.clearFilters")}
        </Button>
      </div>

      <div className="border border-line rounded-md overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("comprobantes.colDate")}</TableHead>
              <TableHead>{t("comprobantes.colType")}</TableHead>
              <TableHead>{t("comprobantes.colNumber")}</TableHead>
              <TableHead>{t("comprobantes.colReceptor")}</TableHead>
              <TableHead>{t("comprobantes.colAmount")}</TableHead>
              <TableHead>{t("comprobantes.colCae")}</TableHead>
              <TableHead className="text-right">{t("comprobantes.colActions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {query.isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-slate py-8">
                  {t("common.loading")}
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-slate py-8">
                  {t("comprobantes.empty")}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-sm">{row.cbteFchFormatted}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.cbteTipoLabel}</Badge>
                  </TableCell>
                  <TableCell className="font-mono">{row.numero}</TableCell>
                  <TableCell>
                    <div className="font-medium">{row.receptorNombre ?? "—"}</div>
                    <div className="text-xs text-slate font-mono">{row.docNroReceptor}</div>
                  </TableCell>
                  <TableCell className="font-mono">{formatARS(row.impTotal)}</TableCell>
                  <TableCell className="font-mono text-xs">{row.cae}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={downloading === row.id}
                      onClick={() => downloadPdf(row.id, row.numero)}
                    >
                      <FileDown className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate">
            {t("comprobantes.pageInfo", {
              page: pagination.page,
              total: pagination.totalPages,
              count: pagination.total,
            })}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {t("comprobantes.prev")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              {t("comprobantes.next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
