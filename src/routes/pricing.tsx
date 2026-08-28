import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/set-api/public-shell";
import { PlanCard } from "@/components/set-api/plan-card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const { t, plans } = useTranslation();

  const customPlan = {
    name: t("pricing.custom.name"),
    price: t("pricing.custom.price"),
    tagline: t("pricing.custom.tagline"),
    features: [0, 1, 2, 3].map((i) => t(`pricing.custom.feature${i}`)),
    cta: t("pricing.custom.cta"),
  };

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold">{t("pricing.title")}</h1>
          <p className="text-slate mt-2">{t("pricing.subtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} featured={p.id === "fixed"} />
          ))}
          <PlanCard plan={customPlan} to="/contact" />
        </div>
        <div className="flex justify-center mt-10">
          <Button asChild size="lg">
            <Link to="/register" search={{ plan: "free" }}>
              {t("pricing.cta")}
            </Link>
          </Button>
        </div>
      </div>
    </PublicShell>
  );
}
