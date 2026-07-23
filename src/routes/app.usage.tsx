import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { StatChip } from "@/components/triple-d/stat-chip";
import { UsageChart, type UsagePoint } from "@/components/triple-d/usage-chart";
import { api } from "@/lib/api";
import { formatARS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/usage")({
  component: UsagePage,
});

interface UsageResponse {
  plan: { id: string; name: string; cap: number; includedUnits: number; unitCost: number };
  cycle: { units: number; cost: number; remaining: number | null };
  daily: UsagePoint[];
}

function UsagePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["usage"],
    queryFn: () => api.get<UsageResponse>("/api/usage"),
  });

  const daily = data?.daily ?? [];
  const total = daily.reduce((s, d) => s + d.count, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Uso</h1>
        <p className="text-slate text-sm">Metering del ciclo actual (30 días).</p>
      </div>
      {isLoading ? (
        <p className="text-slate text-sm font-mono">Cargando…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatChip label="Comprobantes ciclo" value={data?.cycle.units ?? 0} />
            <StatChip label="Últimos 7 días" value={total} />
            <StatChip
              label="Restante"
              value={data?.cycle.remaining === null ? "∞" : data?.cycle.remaining ?? 0}
            />
            <StatChip label="Gasto ciclo" value={formatARS(data?.cycle.cost ?? 0)} hint={data?.plan.name} />
          </div>
          <UsageChart data={daily} />
        </>
      )}
    </div>
  );
}
