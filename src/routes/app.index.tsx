import { createFileRoute, Link } from "@tanstack/react-router";
import { StatChip } from "@/components/triple-d/stat-chip";
import { BillingAlert } from "@/components/triple-d/billing-alert";
import { UsageChart } from "@/components/triple-d/usage-chart";
import { KeyStatusBadge } from "@/components/triple-d/key-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { MOCK_INVOICES, MOCK_KEY, MOCK_USAGE, PLANS } from "@/lib/mock-data";
import { KeyRound, Receipt } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const total = MOCK_USAGE.reduce((s, d) => s + d.count, 0);
  const pending = MOCK_INVOICES.find((i) => i.status !== "paid");
  const plan = PLANS.find((p) => p.id === user?.planId);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Hola de nuevo</h1>
        <p className="text-slate text-sm font-mono">{user?.email}</p>
      </div>

      {pending && <BillingAlert invoice={pending} />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatChip label="Comprobantes 7d" value={total} />
        <StatChip label="Plan actual" value={plan?.name ?? "—"} hint={plan?.price} />
        <StatChip label="Estado key" value={MOCK_KEY.status === "active" ? "Activa" : "Suspendida"} />
        <StatChip label="Cierre ciclo" value={MOCK_KEY.cycleEndsAt} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <UsageChart />
        </div>
        <Card className="border-line">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg">API Key</CardTitle>
            <KeyStatusBadge status={MOCK_KEY.status} />
          </CardHeader>
          <CardContent className="space-y-3">
            <code className="block bg-mist border border-line rounded px-2 py-1 text-sm font-mono truncate">
              {MOCK_KEY.prefix}••••••••
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
