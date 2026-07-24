import { cn } from "@/lib/utils";

export function LogoMark({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-display font-bold",
        compact ? "justify-center" : "gap-2",
        className,
      )}
    >
      <span className="shrink-0 text-signal tracking-tighter" aria-hidden>
        ⌁
      </span>
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap transition-[opacity,width,margin] duration-200 ease-linear",
          compact ? "w-0 opacity-0" : "w-auto opacity-100",
        )}
      >
        Set-Api
      </span>
    </span>
  );
}
