import { createFileRoute, Link } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";

import type { PlanId } from "@/lib/api-types";

import { useAuth } from "@/lib/auth-context";

import { useTranslation } from "@/lib/i18n-context";

import { AppPageHeader } from "@/components/set-api/app-page-header";

import { BillingAlert } from "@/components/set-api/billing-alert";

import { InvoiceTable } from "@/components/set-api/invoice-table";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Check, Clock } from "lucide-react";

import { toast } from "sonner";

import { api, ApiError } from "@/lib/api";

import type { InvoiceView } from "@/lib/api-types";



export const Route = createFileRoute("/app/subscription")({

  component: SubscriptionPage,

});



function needsPayment(planId: PlanId): boolean {

  return planId !== "free";

}



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



  const pendingPlanId = activeOrg?.pendingPlanId;

  const pendingPlanName = plans.find((p) => p.id === pendingPlanId)?.name ?? pendingPlanId;



  const change = async (id: PlanId) => {

    try {

      if (id === "free") {

        await selectPlan(id);

        toast.success(t("appPlans.changedFree"));

        return;

      }

      toast.info(t("appPlans.paymentRequired"));

    } catch (err) {

      toast.error(err instanceof ApiError ? err.message : t("appPlans.changeError"));

    }

  };



  const canSwitchTo = (id: PlanId, current: boolean) => {

    if (current || !hasPermission("org:manage")) return false;

    if (id === "free") return true;

    return false;

  };



  const customPlan = {

    name: t("pricing.custom.name"),

    price: t("pricing.custom.price"),

    tagline: t("pricing.custom.tagline"),

    features: [0, 1, 2, 3].map((i) => t(`pricing.custom.feature${i}`)),

    cta: t("pricing.custom.cta"),

  };



  return (

    <div className="space-y-6 w-full">

      <AppPageHeader

        title={t("subscription.title")}

        description={t("subscription.subtitle")}

        crumbs={[{ label: t("subscription.title") }]}

      />



      {pendingPlanId && activeOrg?.planStatus === "pending_payment" && (

        <Alert className="border-signal bg-signal/5">

          <Clock className="h-4 w-4 text-signal" />

          <AlertTitle className="font-display">{t("appPlans.pendingTitle")}</AlertTitle>

          <AlertDescription>{t("appPlans.pendingDesc", { name: pendingPlanName ?? "" })}</AlertDescription>

        </Alert>

      )}



      {pending && <BillingAlert invoice={pending} />}



      <Tabs defaultValue="plan">

        <TabsList className="bg-mist border border-line">

          <TabsTrigger value="plan">{t("subscription.tabPlan")}</TabsTrigger>

          <TabsTrigger value="invoices">{t("subscription.tabInvoices")}</TabsTrigger>

        </TabsList>



        <TabsContent value="plan" className="mt-6" data-tour="sub-plans">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {plans.map((p) => {

              const current = activeOrg?.planId === p.id;

              const pendingSelection = pendingPlanId === p.id && activeOrg?.planStatus === "pending_payment";

              const paidPlanDisabled = needsPayment(p.id);

              const switchable = canSwitchTo(p.id, current);



              return (

                <Card key={p.id} className={current ? "border-signal border-2" : "border-line"}>

                  <CardHeader>

                    <div className="flex justify-between items-start gap-2">

                      <CardTitle className="font-display text-2xl">{p.name}</CardTitle>

                      <div className="flex flex-col items-end gap-1">

                        {current && (

                          <span className="text-xs font-mono uppercase text-signal">{t("common.current")}</span>

                        )}

                        {pendingSelection && (

                          <Badge variant="outline" className="text-xs font-mono uppercase">

                            {t("appPlans.pendingBadge")}

                          </Badge>

                        )}

                      </div>

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

                    {paidPlanDisabled && !current && !pendingSelection && (

                      <p className="text-xs text-slate">{t("appPlans.comingSoonPayment")}</p>

                    )}

                    <Button

                      className="w-full"

                      variant={current ? "outline" : "default"}

                      disabled={!switchable}

                      onClick={() => change(p.id)}

                    >

                      {current

                        ? t("appPlans.currentPlan")

                        : paidPlanDisabled && !switchable

                          ? t("common.comingSoon")

                          : t("appPlans.changeTo", { name: p.name })}

                    </Button>

                  </CardContent>

                </Card>

              );

            })}

            <Card className="border-line">

              <CardHeader>

                <CardTitle className="font-display text-2xl">{customPlan.name}</CardTitle>

                <p className="text-sm text-slate">{customPlan.tagline}</p>

                <p className="font-mono text-2xl mt-2 text-ink">{customPlan.price}</p>

              </CardHeader>

              <CardContent className="space-y-4">

                <ul className="space-y-2 text-sm">

                  {customPlan.features.map((f) => (

                    <li key={f} className="flex gap-2">

                      <Check className="h-4 w-4 text-signal shrink-0 mt-0.5" />

                      <span>{f}</span>

                    </li>

                  ))}

                </ul>

                <Button asChild className="w-full" variant="outline">

                  <Link to="/contact">{customPlan.cta}</Link>

                </Button>

              </CardContent>

            </Card>

          </div>

        </TabsContent>



        <TabsContent value="invoices" className="mt-6 space-y-4" data-tour="sub-invoices">

          <p className="text-sm text-slate">{t("invoices.subtitle")}</p>

          <InvoiceTable invoices={invoices.data?.invoices} />

        </TabsContent>

      </Tabs>

    </div>

  );

}

