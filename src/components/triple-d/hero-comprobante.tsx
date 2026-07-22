import { useEffect, useState } from "react";

const LINES = [
  "TRIPLE D · COMPROBANTE ELECTRÓNICO",
  "CUIT EMISOR   30-71234567-8",
  "PTO. VTA      00005    TIPO  FC A",
  "Nº            0000-00012845",
  "CAE           74123456789012",
  "VTO. CAE      2026-08-14",
  "-------------------------------",
  "SUBTOTAL          $ 128.400,00",
  "IVA 21%           $  26.964,00",
  "TOTAL             $ 155.364,00",
  "-------------------------------",
  "STATUS            ACTIVE ✓",
];

export function HeroComprobante() {
  const [visible, setVisible] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setVisible(LINES.length);
      return;
    }
    const t = setInterval(() => {
      setVisible((v) => (v >= LINES.length ? v : v + 1));
    }, 140);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="bg-card border border-line rounded-md shadow-lg p-6 pt-8">
        <div className="text-[10px] uppercase tracking-widest text-slate mb-2">
          ARCA · AFIP
        </div>
        <div className="space-y-0">
          {LINES.slice(0, visible).map((l, i) => (
            <span key={i} className="ticket-line">{l}</span>
          ))}
        </div>
      </div>
      <div className="absolute -top-3 left-6 h-3 w-16 bg-seal rounded-b-sm" aria-hidden />
    </div>
  );
}
