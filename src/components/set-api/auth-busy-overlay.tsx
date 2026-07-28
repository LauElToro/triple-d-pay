import { Loader2 } from "lucide-react";

export function AuthBusyOverlay({
  active,
  label,
}: {
  active: boolean;
  label: string;
}) {
  if (!active) return null;

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-xl bg-card/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2 className="auth-spinner h-8 w-8 text-signal" aria-hidden />
      <p className="text-sm font-mono text-slate">{label}</p>
    </div>
  );
}
