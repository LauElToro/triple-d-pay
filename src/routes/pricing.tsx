import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/triple-d/public-shell";
import { PlanCard } from "@/components/triple-d/plan-card";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const { t, plans } = useTranslation();

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold">{t("pricing.title")}</h1>
          <p className="text-slate mt-2">{t("pricing.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} featured={p.id === "fixed"} />
          ))}
        </div>
        <p className="text-center text-sm text-slate mt-8">
          <Link to="/register" search={{ plan: "free" }} className="text-signal underline">
            {t("pricing.cta")}
          </Link>
        </p>
      </div>
    </PublicShell>
  );
}
