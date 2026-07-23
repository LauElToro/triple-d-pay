import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PLANS } from "@/lib/mock-data";
import type { PlanId } from "@/lib/api-types";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/plans")({
  component: PlansPage,
});

function PlansPage() {
  const { activeOrg, refreshMe, hasPermission } = useAuth();
  const qc = useQueryClient();
  const canManage = hasPermission("org:manage");

  const change = useMutation({
    mutationFn: (planId: PlanId) => api.patch("/api/organizations", { planId }),
    onSuccess: async (_data, planId) => {
      await refreshMe();
      qc.invalidateQueries({ queryKey: ["usage"] });
      toast.success(`Plan cambiado a ${PLANS.find((p) => p.id === planId)?.name}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const onChange = (id: PlanId) => {
    if (id !== "free") {
      if (!confirm("Los planes pagos se cobran con MercadoPago al cierre de ciclo. ¿Continuar?")) return;
    }
    change.mutate(id);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Planes</h1>
        <p className="text-slate text-sm">Cambio inmediato. Los pagos usan MercadoPago (próximamente).</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((p) => {
          const current = activeOrg?.planId === p.id;
          return (
            <Card key={p.id} className={current ? "border-signal border-2" : "border-line"}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-display text-2xl">{p.name}</CardTitle>
                  {current && <span className="text-xs font-mono uppercase text-signal">Actual</span>}
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
                  disabled={current || !canManage || change.isPending}
                  onClick={() => onChange(p.id)}
                >
                  {current ? "Plan actual" : `Cambiar a ${p.name}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {!canManage && (
        <p className="text-xs text-slate">Solo el propietario o un admin pueden cambiar el plan.</p>
      )}
    </div>
  );
}
