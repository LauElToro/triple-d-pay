import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { formatARS, formatDate } from "@/lib/format";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin/clients/$id")({
  component: AdminClientDetail,
});

interface Detail {
  client: {
    id: string;
    name: string;
    planId: string;
    kycStatus: string;
    arcaCuit: string | null;
    clientType: string | null;
    source: string | null;
    heardAbout: string | null;
    intendedUse: string | null;
    companyRole: string | null;
    companySize: string | null;
    onboardingCompletedAt: string | null;
    createdAt: string;
  };
  owner: {
    id: string;
    email: string;
    name: string | null;
    kycStatus: string;
    lastLoginAt: string | null;
    createdAt: string;
  };
  members: {
    id: string;
    orgRole: string;
    subRole: string | null;
    status: string;
    user: {
      email: string;
      name: string | null;
      kycStatus: string;
      lastLoginAt: string | null;
    };
  }[];
  keys: { id: string; prefix: string; status: string; name: string }[];
  invoices: { id: string; amount: number; status: string; dueAt: string }[];
  usage30d: {
    units: number;
    revenue: number;
    providerCost: number;
    margin: number;
    byService: {
      service: string;
      units: number;
      revenue: number;
      providerCost: number;
      margin: number;
    }[];
  };
}

function AdminClientDetail() {
  const { id } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-client", id],
    queryFn: () => api.get<Detail>(`/api/admin/clients/${id}`),
  });

  if (isLoading || !data) {
    return <p className="text-slate text-sm font-mono">Cargando cliente…</p>;
  }

  const { client, owner, members, keys, invoices, usage30d } = data;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-2 -ml-2">
            <Link to="/admin/clients"><ArrowLeft className="h-4 w-4 mr-1" /> Clientes</Link>
          </Button>
          <h1 className="text-3xl font-display font-bold">{client.name}</h1>
          <p className="text-sm text-slate font-mono">
            {client.planId} · {client.source ?? "direct"} · {client.clientType ?? "standard"}
          </p>
        </div>
        <Badge variant="outline">{client.kycStatus}</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-line">
          <CardHeader><CardTitle className="font-display text-lg">Owner</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>{owner.name ?? "—"}</div>
            <div className="font-mono text-slate">{owner.email}</div>
            <div className="text-slate">Último login: {formatDate(owner.lastLoginAt)}</div>
          </CardContent>
        </Card>
        <Card className="border-line">
          <CardHeader><CardTitle className="font-display text-lg">Onboarding</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>Uso: {client.intendedUse ?? "—"}</div>
            <div>Rol: {client.companyRole ?? "—"}</div>
            <div>Tamaño: {client.companySize ?? "—"}</div>
            <div>Cómo nos conoció: {client.heardAbout ?? "—"}</div>
            <div className="text-slate">
              Completado: {formatDate(client.onboardingCompletedAt)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-line">
        <CardHeader><CardTitle className="font-display text-lg">Miembros</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {members.map((m) => (
            <div key={m.id} className="flex justify-between text-sm border-b border-line pb-2 last:border-0">
              <div>
                <div className="font-medium">{m.user.name ?? m.user.email}</div>
                <div className="font-mono text-xs text-slate">{m.user.email}</div>
              </div>
              <div className="text-right text-xs text-slate">
                <div>{m.orgRole}{m.subRole ? ` · ${m.subRole}` : ""}</div>
                <div>login {formatDate(m.user.lastLoginAt)}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-line">
          <CardHeader><CardTitle className="font-display text-lg">Keys</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {keys.map((k) => (
              <div key={k.id} className="flex justify-between text-sm">
                <span className="font-mono">{k.prefix}</span>
                <Badge variant="outline">{k.status}</Badge>
              </div>
            ))}
            {keys.length === 0 && <p className="text-sm text-slate">Sin keys.</p>}
          </CardContent>
        </Card>
        <Card className="border-line">
          <CardHeader><CardTitle className="font-display text-lg">Uso 30d</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>Units: {usage30d.units}</div>
            <div>Ingreso: {formatARS(usage30d.revenue)}</div>
            <div>Costo est.: {formatARS(usage30d.providerCost)}</div>
            <div>Margen: {formatARS(usage30d.margin)}</div>
            {usage30d.byService.map((s) => (
              <div key={s.service} className="flex justify-between border-t border-line pt-2">
                <span className="font-mono">{s.service}</span>
                <span>{s.units} u · {formatARS(s.margin)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-line">
        <CardHeader><CardTitle className="font-display text-lg">Facturas</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex justify-between text-sm">
              <span className="font-mono text-xs">{inv.id.slice(0, 8)}…</span>
              <span>{formatARS(inv.amount)} · {inv.status} · vence {formatDate(inv.dueAt)}</span>
            </div>
          ))}
          {invoices.length === 0 && <p className="text-sm text-slate">Sin facturas.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
