import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n-context";

export function HeroComprobante() {
  const { t } = useTranslation();
  const lines = Array.from({ length: 12 }, (_, i) => t(`hero.line${i}`));
  const [visible, setVisible] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setVisible(lines.length);
      return;
    }
    const timer = setInterval(() => {
      setVisible((v) => (v >= lines.length ? v : v + 1));
    }, 140);
    return () => clearInterval(timer);
  }, [reduced, lines.length]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="bg-card border border-line rounded-md shadow-lg p-6 pt-8">
        <div className="text-[10px] uppercase tracking-widest text-slate mb-2">
          {t("hero.badge")}
        </div>
        <div className="font-mono text-xs leading-relaxed space-y-0.5">
          {lines.slice(0, visible).map((line, i) => (
            <div key={i} className="ticket-line">{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
