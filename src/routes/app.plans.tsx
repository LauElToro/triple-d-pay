import { createFileRoute } from "@tanstack/react-router";
import { PLANS, type PlanId } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/plans")({
  component: PlansPage,
});

function PlansPage() {
  const { user, selectPlan } = useAuth();

  const change = (id: PlanId) => {
    if (id === "free") {
      selectPlan(id);
      toast.success("Plan cambiado a Free");
      return;
    }
    if (confirm("Se redirige a MercadoPago para confirmar el cambio de plan.")) {
      selectPlan(id);
      toast.success(`Plan cambiado a ${PLANS.find(p => p.id === id)?.name}`);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Planes</h1>
        <p className="text-slate text-sm">Cambio inmediato para Free. Los pagos usan MercadoPago.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((p) => {
          const current = user?.planId === p.id;
          return (
            <Card key={p.id} className={current ? "border-signal border-2" : "border-line"}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-display text-2xl">{p.name}</CardTitle>
                  {current && (
                    <span className="text-xs font-mono uppercase text-signal">Actual</span>
                  )}
                </div>
                <p className="text-sm text-slate">{p.tagline}</p>
                <p className="font-mono text-2xl mt-2 text-ink">{p.price}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={current ? "outline" : "default"}
                  disabled={current}
                  onClick={() => change(p.id)}
                >
                  {current ? "Plan actual" : `Cambiar a ${p.name}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
