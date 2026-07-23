import { createFileRoute } from "@tanstack/react-router";
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
  owner: string;
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
        <p className="text-slate text-sm">Todas las organizaciones de la plataforma.</p>
      </div>
      {isLoading ? (
        <p className="text-slate text-sm font-mono">Cargando…</p>
      ) : (
        <div className="border border-line rounded-md bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-xs uppercase">Cliente</TableHead>
                <TableHead className="font-mono text-xs uppercase">Owner</TableHead>
                <TableHead className="font-mono text-xs uppercase">Plan</TableHead>
                <TableHead className="font-mono text-xs uppercase">KYC</TableHead>
                <TableHead className="font-mono text-xs uppercase">Keys</TableHead>
                <TableHead className="font-mono text-xs uppercase">Miembros</TableHead>
                <TableHead className="font-mono text-xs uppercase">Tickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.clients.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="font-mono text-sm text-slate">{c.owner}</TableCell>
                  <TableCell><Badge variant="outline">{c.planId}</Badge></TableCell>
                  <TableCell>
                    <Badge variant="outline" className={c.kycStatus === "APPROVED" ? "bg-signal/15 text-signal border-signal/30" : ""}>
                      {c.kycStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{c.keys}</TableCell>
                  <TableCell className="font-mono">{c.members}</TableCell>
                  <TableCell className="font-mono">{c.tickets}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
