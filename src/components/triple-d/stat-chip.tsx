export function StatChip({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="border border-line bg-card rounded-md p-4">
      <div className="text-xs uppercase tracking-wider text-slate font-mono">{label}</div>
      <div className="text-2xl font-display mt-1 text-ink">{value}</div>
      {hint && <div className="text-xs text-slate mt-1">{hint}</div>}
    </div>
  );
}
