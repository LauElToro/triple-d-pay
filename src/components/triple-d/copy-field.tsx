import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function CopyField({
  value,
  label,
  masked = false,
}: {
  value: string;
  label?: string;
  masked?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const display = masked ? `${value.slice(0, 12)}${"•".repeat(20)}` : value;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  return (
    <div>
      {label && <div className="text-xs text-slate mb-1 uppercase tracking-wider font-mono">{label}</div>}
      <div className="flex items-center gap-2 bg-mist border border-line rounded-md px-3 py-2">
        <code className="flex-1 text-sm font-mono truncate">{display}</code>
        <Button size="sm" variant="ghost" onClick={copy} aria-label="Copiar">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
