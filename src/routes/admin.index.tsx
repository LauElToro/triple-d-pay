import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { StatChip } from "@/components/triple-d/stat-chip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { formatARS } from "@/lib/format";

export const Route = createFileRoute("/admin/")({
  component: AdminKpis,
});

interface Metrics {
  totals: {
    clients: number;
    users: number;
    activeKeys: number;
    kycApproved: number;
    unitsLast30: number;
    spendLast30: number;
    mrr: number;
  };
  byPlan: { planId: string; count: number }[];
  byClientType: { type: string; count: number }[];
  bySource: { source: string; count: number }[];
  ticketsByStatus: { status: string; count: number }[];
  recentClients: { id: string; name: string; planId: string; kycStatus: string; createdAt: string }[];
}

function Distribution({ title, data }: { title: string; data: { label: string; count: number }[] }) {
  const total = Math.max(1, data.reduce((s, d) => s + d.count, 0));
  return (
    <Card className="border-line">
      <CardHeader><CardTitle className="font-display text-lg">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-sm">
              <span className="capitalize">{d.label}</span>
              <span className="font-mono">{d.count}</span>
            </div>
            <div className="h-2 bg-mist rounded">
              <div className="h-2 bg-signal rounded" style={{ width: `${(d.count / total) * 100}%` }} />
            </div>
          </div>
        ))}
        {data.length === 0 && <p className="text-slate text-sm">Sin datos.</p>}
      </CardContent>
    </Card>
  );
}

function AdminKpis() {
  const { data, isLoading } = useQuery({
    queryKey: ["metrics"],
    queryFn: () => api.get<Metrics>("/api/metrics"),
  });

  if (isLoading || !data) return <p className="text-slate text-sm font-mono">Cargando KPIs…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Consola global</h1>
        <p className="text-slate text-sm">KPIs de toda la plataforma.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatChip label="Clientes" value={data.totals.clients} />
        <StatChip label="Usuarios" value={data.totals.users} />
        <StatChip label="Keys activas" value={data.totals.activeKeys} />
        <StatChip label="KYC aprobados" value={data.totals.kycApproved} />
        <StatChip label="Comprobantes 30d" value={data.totals.unitsLast30} />
        <StatChip label="Gasto 30d" value={formatARS(data.totals.spendLast30)} />
        <StatChip label="MRR estimado" value={formatARS(data.totals.mrr)} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Distribution title="Por plan" data={data.byPlan.map((p) => ({ label: p.planId, count: p.count }))} />
        <Distribution title="Tipo de cliente" data={data.byClientType.map((p) => ({ label: p.type, count: p.count }))} />
        <Distribution title="Derivaciones (origen)" data={data.bySource.map((p) => ({ label: p.source, count: p.count }))} />
      </div>

      <Card className="border-line">
        <CardHeader><CardTitle className="font-display text-lg">Altas recientes</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {data.recentClients.map((c) => (
            <div key={c.id} className="flex justify-between text-sm border-b border-line pb-2 last:border-0">
              <span>{c.name}</span>
              <span className="font-mono text-slate">{c.planId} · {c.kycStatus}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
