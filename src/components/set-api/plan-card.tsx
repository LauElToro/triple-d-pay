import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { Plan } from "@/lib/plans";
import { useTranslation } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

type PlanCardPlan = Pick<Plan, "name" | "price" | "tagline" | "features" | "cta"> & {
  id?: Plan["id"];
  priceSecondary?: string;
};

export function PlanCard({
  plan,
  featured = false,
  to = "/register",
}: {
  plan: PlanCardPlan;
  featured?: boolean;
  /** Destination for the CTA. Custom plans use `/contact`. */
  to?: "/register" | "/contact";
}) {
  const { t } = useTranslation();

  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        featured ? "border-signal border-2 shadow-md relative" : "border-line",
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-signal text-primary-foreground text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider">
          {t("common.recommended")}
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-display text-2xl">{plan.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{plan.tagline}</p>
        <p className="font-mono text-2xl mt-2 text-ink">{plan.price}</p>
        {plan.priceSecondary ? (
          <p className="font-mono text-sm text-slate mt-1">{plan.priceSecondary}</p>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <ul className="space-y-2 text-sm">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-2">
              <Check className="h-4 w-4 text-signal shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-auto w-full" variant={featured ? "default" : "outline"}>
          {to === "/contact" ? (
            <Link to="/contact">{plan.cta}</Link>
          ) : (
            <Link to="/register" search={{ plan: plan.id ?? "free" }}>
              {plan.cta}
            </Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
