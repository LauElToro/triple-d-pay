import { BR, ES, US } from "country-flag-icons/react/3x2";
import type { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

type FlagComponent = typeof ES;

const FLAGS: Record<Locale, FlagComponent> = {
  es: ES,
  en: US,
  pt: BR,
};

export function FlagIcon({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const Flag = FLAGS[locale];

  return (
    <Flag
      aria-hidden
      className={cn("inline-block shrink-0 rounded-[2px] border border-line/40", className)}
    />
  );
}
