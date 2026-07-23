import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { StatChip } from "@/components/triple-d/stat-chip";
import { BillingAlert } from "@/components/triple-d/billing-alert";
import { UsageChart, type UsagePoint } from "@/components/triple-d/usage-chart";
import { KeyStatusBadge } from "@/components/triple-d/key-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { PLANS, formatARS } from "@/lib/mock-data";
import type { ApiKeyView, InvoiceView } from "@/lib/api-types";
import { KeyRound, Receipt } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

interface UsageResponse {
  cycle: { units: number; cost: number };
  daily: UsagePoint[];
}

function Dashboard() {
  const { user, activeOrg } = useAuth();

  const usage = useQuery({ queryKey: ["usage"], queryFn: () => api.get<UsageResponse>("/api/usage") });
  const invoices = useQuery({ queryKey: ["invoices"], queryFn: () => api.get<{ invoices: InvoiceView[] }>("/api/invoices") });
  const keys = useQuery({ queryKey: ["keys"], queryFn: () => api.get<{ keys: ApiKeyView[] }>("/api/keys") });

  const pending = invoices.data?.invoices.find((i) => i.status !== "paid" && i.status !== "void");
  const plan = PLANS.find((p) => p.id === activeOrg?.planId);
  const activeKey = keys.data?.keys.find((k) => k.status === "active");

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Hola de nuevo</h1>
        <p className="text-slate text-sm font-mono">{user?.email} · {activeOrg?.name}</p>
      </div>

      {pending && <BillingAlert invoice={pending} />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatChip label="Comprobantes ciclo" value={usage.data?.cycle.units ?? 0} />
        <StatChip label="Plan actual" value={plan?.name ?? "—"} hint={plan?.price} />
        <StatChip label="Gasto ciclo" value={formatARS(usage.data?.cycle.cost ?? 0)} />
        <StatChip label="Estado key" value={activeKey ? "Activa" : "Sin key"} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <UsageChart data={usage.data?.daily ?? []} />
        </div>
        <Card className="border-line">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg">API Key</CardTitle>
            {activeKey && <KeyStatusBadge status="active" />}
          </CardHeader>
          <CardContent className="space-y-3">
            <code className="block bg-mist border border-line rounded px-2 py-1 text-sm font-mono truncate">
              {activeKey ? `${activeKey.prefix}••••••••` : "Sin key activa"}
            </code>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/app/keys"><KeyRound className="h-4 w-4 mr-2" /> Gestionar</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/app/invoices"><Receipt className="h-4 w-4 mr-2" /> Facturas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
