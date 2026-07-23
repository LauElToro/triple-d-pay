export interface UsagePoint {
  day: string;
  count: number;
}

export function UsageChart({ data }: { data: UsagePoint[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="border border-line bg-card rounded-md p-4">
      <div className="text-xs uppercase tracking-wider text-slate font-mono mb-4">
        Uso · últimos 7 días
      </div>
      <div className="flex items-end gap-3 h-40">
        {data.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-mono text-ink">{d.count}</div>
            <div
              className="w-full bg-signal/80 rounded-t-sm transition-all"
              style={{ height: `${(d.count / max) * 100}%` }}
              aria-label={`${d.day}: ${d.count} comprobantes`}
            />
            <div className="text-xs text-slate font-mono">{d.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
