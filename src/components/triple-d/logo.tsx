export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-bold ${className}`}>
      <span className="text-signal tracking-tighter" aria-hidden>|||</span>
      <span>Triple D</span>
    </span>
  );
}
