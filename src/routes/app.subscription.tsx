import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { PlanId } from "@/lib/api-types";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { AppPageHeader } from "@/components/triple-d/app-page-header";
import { BillingAlert } from "@/components/triple-d/billing-alert";
import { InvoiceTable } from "@/components/triple-d/invoice-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { InvoiceView } from "@/lib/api-types";

export const Route = createFileRoute("/app/subscription")({
  component: SubscriptionPage,
});

function SubscriptionPage() {
  const { activeOrg, selectPlan, hasPermission } = useAuth();
  const { t, plans } = useTranslation();

  const invoices = useQuery({
    queryKey: ["invoices", activeOrg?.id],
    queryFn: () => api.get<{ invoices: InvoiceView[] }>("/api/invoices"),
    enabled: Boolean(activeOrg) && hasPermission("invoices:read"),
  });

  const pending = invoices.data?.invoices.find(
    (i) => i.status === "pending" || i.status === "overdue",
  );

  const change = async (id: PlanId) => {
    try {
      if (id === "free") {
        await selectPlan(id);
        toast.success(t("appPlans.changedFree"));
        return;
      }
      if (confirm(t("appPlans.confirmPaid"))) {
        await selectPlan(id);
        const name = plans.find((p) => p.id === id)?.name ?? id;
        toast.success(t("appPlans.changed", { name }));
      }
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "No se pudo cambiar el plan");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <AppPageHeader
        title={t("subscription.title")}
        description={t("subscription.subtitle")}
        crumbs={[{ label: t("subscription.title") }]}
      />

      {pending && <BillingAlert invoice={pending} />}

      <Tabs defaultValue="plan">
        <TabsList className="bg-mist border border-line">
          <TabsTrigger value="plan">{t("subscription.tabPlan")}</TabsTrigger>
          <TabsTrigger value="invoices">{t("subscription.tabInvoices")}</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => {
              const current = activeOrg?.planId === p.id;
              return (
                <Card key={p.id} className={current ? "border-signal border-2" : "border-line"}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="font-display text-2xl">{p.name}</CardTitle>
                      {current && (
                        <span className="text-xs font-mono uppercase text-signal">{t("common.current")}</span>
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
                      disabled={current || !hasPermission("org:manage")}
                      onClick={() => change(p.id)}
                    >
                      {current ? t("appPlans.currentPlan") : t("appPlans.changeTo", { name: p.name })}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6 space-y-4">
          <p className="text-sm text-slate">{t("invoices.subtitle")}</p>
          <InvoiceTable invoices={invoices.data?.invoices} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
