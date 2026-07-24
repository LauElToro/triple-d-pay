import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatChip } from "@/components/set-api/stat-chip";
import { api } from "@/lib/api";
import { formatARS } from "@/lib/format";

export const Route = createFileRoute("/admin/profitability")({
  component: AdminProfitability,
});

interface Profitability {
  periodDays: number;
  totals: {
    units: number;
    revenue: number;
    providerCost: number;
    margin: number;
    marginPct: number | null;
  };
  services: {
    service: string;
    calls: number;
    units: number;
    revenue: number;
    providerCost: number;
    margin: number;
    marginPct: number | null;
  }[];
}

function AdminProfitability() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-profitability"],
    queryFn: () => api.get<Profitability>("/api/admin/profitability"),
  });

  if (isLoading || !data) {
    return <p className="text-slate text-sm font-mono">Cargando rentabilidad…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Rentabilidad</h1>
        <p className="text-slate text-sm">
          Ingreso cobrado vs costo estimado del proveedor ARCA (últimos {data.periodDays} días).
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatChip label="Units" value={data.totals.units} />
        <StatChip label="Ingreso" value={formatARS(data.totals.revenue)} />
        <StatChip label="Costo estimado" value={formatARS(data.totals.providerCost)} />
        <StatChip
          label="Margen"
          value={`${formatARS(data.totals.margin)}${
            data.totals.marginPct != null ? ` (${data.totals.marginPct.toFixed(0)}%)` : ""
          }`}
        />
      </div>

      <Card className="border-line">
        <CardHeader>
          <CardTitle className="font-display text-lg">Por servicio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.services.map((s) => (
            <div key={s.service} className="border-b border-line pb-3 last:border-0">
              <div className="flex justify-between items-center">
                <span className="font-mono font-medium">{s.service}</span>
                <span
                  className={`text-sm font-mono ${
                    s.margin >= 0 ? "text-signal" : "text-seal"
                  }`}
                >
                  {formatARS(s.margin)}
                  {s.marginPct != null ? ` · ${s.marginPct.toFixed(0)}%` : ""}
                </span>
              </div>
              <div className="text-xs text-slate mt-1">
                {s.calls} calls · {s.units} units · ingreso {formatARS(s.revenue)} · costo{" "}
                {formatARS(s.providerCost)}
              </div>
            </div>
          ))}
          {data.services.length === 0 && (
            <p className="text-sm text-slate">Sin uso metered todavía.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
