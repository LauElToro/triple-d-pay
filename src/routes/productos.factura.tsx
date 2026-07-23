import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/triple-d/public-shell";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n-context";
import { Check } from "lucide-react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/productos/factura")({
  component: ProductoFactura,
});

function ProductoFactura() {
  const { t } = useTranslation();
  const features = [
    t("landing.facturaFeature0"),
    t("landing.facturaFeature1"),
    t("landing.facturaFeature2"),
    t("landing.facturaFeature3"),
  ];

  return (
    <PublicShell>
      <div className="mx-auto max-w-3xl px-6 py-16 space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold">{t("product.factura.title")}</h1>
          <p className="text-lg text-slate mt-4">{t("product.factura.desc")}</p>
        </div>
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex gap-2 text-sm">
              <Check className="h-4 w-4 text-signal shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/docs/quickstart">{t("docs.quickstart")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register" search={{ plan: "free" }}>{t("landing.startFree")}</Link>
          </Button>
        </div>
      </div>
    </PublicShell>
  );
}
