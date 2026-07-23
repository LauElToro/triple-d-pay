import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { Plan } from "@/lib/mock-data";
import { useTranslation } from "@/lib/i18n-context";

export function PlanCard({ plan, featured = false }: { plan: Plan; featured?: boolean }) {
  const { t } = useTranslation();

  return (
    <Card
      className={
        featured
          ? "border-signal border-2 shadow-md relative"
          : "border-line"
      }
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
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-2">
              <Check className="h-4 w-4 text-signal shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="w-full" variant={featured ? "default" : "outline"}>
          <Link to="/register" search={{ plan: plan.id }}>
            {plan.cta}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
