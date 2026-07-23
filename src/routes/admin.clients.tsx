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
  const { data, isLoading } = useQuery({
    queryKey: ["admin-clients"],
    queryFn: () => api.get<{ clients: Client[] }>("/api/admin/clients"),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Clientes</h1>
        <p className="text-slate text-sm">Organizaciones, origen, plan y último acceso.</p>
      </div>
      {isLoading ? (
        <p className="text-slate text-sm font-mono">Cargando…</p>
      ) : (
        <div className="border border-line rounded-md bg-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-xs uppercase">Cliente</TableHead>
                <TableHead className="font-mono text-xs uppercase">Owner</TableHead>
                <TableHead className="font-mono text-xs uppercase">Plan</TableHead>
                <TableHead className="font-mono text-xs uppercase">Origen</TableHead>
                <TableHead className="font-mono text-xs uppercase">KYC</TableHead>
                <TableHead className="font-mono text-xs uppercase">Último login</TableHead>
                <TableHead className="font-mono text-xs uppercase">Miembros</TableHead>
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
