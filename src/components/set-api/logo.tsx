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
        "inline-flex h-8 items-center font-display font-bold leading-none text-ink",
        compact ? "justify-center" : "gap-2",
        className,
      )}
    >
      <img
        src="/logo.png"
        alt={compact ? "Set-Api" : ""}
        width={24}
        height={24}
        className="block h-6 w-6 shrink-0 object-contain"
      />
      <span
        aria-hidden={compact || undefined}
        className={cn(
          "overflow-hidden whitespace-nowrap leading-none transition-[opacity,width,margin] duration-200 ease-linear",
          compact ? "w-0 opacity-0" : "w-auto opacity-100",
        )}
      >
        Set<span className="text-signal">-</span>Api
      </span>
    </span>
  );
}
