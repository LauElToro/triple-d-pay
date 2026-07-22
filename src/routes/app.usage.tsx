import { createFileRoute } from "@tanstack/react-router";
import { StatChip } from "@/components/triple-d/stat-chip";
import { UsageChart } from "@/components/triple-d/usage-chart";
import { MOCK_USAGE, MOCK_KEY } from "@/lib/mock-data";

export const Route = createFileRoute("/app/usage")({
  component: UsagePage,
});

function UsagePage() {
  const total = MOCK_USAGE.reduce((s, d) => s + d.count, 0);
  const avg = Math.round(total / MOCK_USAGE.length);
  const peak = Math.max(...MOCK_USAGE.map((d) => d.count));

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Uso</h1>
        <p className="text-slate text-sm">Metering del ciclo actual — cierra el {MOCK_KEY.cycleEndsAt}.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StatChip label="Total 7d" value={total} />
        <StatChip label="Promedio/día" value={avg} />
        <StatChip label="Pico" value={peak} />
      </div>
      <UsageChart />
    </div>
  );
}
