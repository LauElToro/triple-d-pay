import { createFileRoute, Link } from "@tanstack/react-router";
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
import { formatDate } from "@/lib/format";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/admin/clients")({
  component: AdminClients,
});

interface Client {
  id: string;
  name: string;
  planId: string;
  kycStatus: string;
  clientType: string | null;
  source: string | null;
  companySize: string | null;
  owner: string;
  ownerName: string | null;
  lastLoginAt: string | null;
  onboardingCompletedAt: string | null;
  keys: number;
  members: number;
  tickets: number;
  createdAt: string;
}

function AdminClients() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-clients"],
    queryFn: () => api.get<{ clients: Client[] }>("/api/admin/clients"),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">{t("admin.clients.title")}</h1>
        <p className="text-slate text-sm">{t("admin.clients.subtitle")}</p>
      </div>
      {isLoading ? (
        <p className="text-slate text-sm font-mono">{t("admin.clients.loading")}</p>
      ) : (
        <div className="border border-line rounded-md bg-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-xs uppercase">{t("admin.clients.colClient")}</TableHead>
                <TableHead className="font-mono text-xs uppercase">{t("admin.clients.colOwner")}</TableHead>
                <TableHead className="font-mono text-xs uppercase">{t("admin.clients.colPlan")}</TableHead>
                <TableHead className="font-mono text-xs uppercase">{t("admin.clients.colSource")}</TableHead>
                <TableHead className="font-mono text-xs uppercase">{t("admin.clients.colKyc")}</TableHead>
                <TableHead className="font-mono text-xs uppercase">{t("admin.clients.colLastLogin")}</TableHead>
                <TableHead className="font-mono text-xs uppercase">{t("admin.clients.colMembers")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.clients.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    <Link to="/admin/clients/$id" params={{ id: c.id }} className="hover:text-signal">
                      {c.name}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-slate">{c.owner}</TableCell>
                  <TableCell><Badge variant="outline">{c.planId}</Badge></TableCell>
                  <TableCell className="text-sm">{c.source ?? "—"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={c.kycStatus === "APPROVED" ? "bg-signal/15 text-signal border-signal/30" : ""}
                    >
                      {c.kycStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{formatDate(c.lastLoginAt)}</TableCell>
                  <TableCell className="font-mono">{c.members}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
