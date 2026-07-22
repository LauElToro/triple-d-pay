import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyField } from "@/components/triple-d/copy-field";
import { KeyStatusBadge } from "@/components/triple-d/key-status-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { KeyRound, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { MOCK_KEY } from "@/lib/mock-data";

export const Route = createFileRoute("/app/keys")({
  component: KeysPage,
});

function KeysPage() {
  const { issuedKey, clearIssuedKey } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold">API Key</h1>
        <p className="text-slate text-sm">Autenticá tu SDK con esta key. Es única por cliente.</p>
      </div>

      {issuedKey && (
        <Alert className="border-signal bg-signal/5">
          <AlertTriangle className="h-4 w-4 text-signal" />
          <AlertTitle className="font-display">Tu API Key — se muestra una sola vez</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>Copiala ahora. No la vamos a volver a mostrar. Guardala en un lugar seguro.</p>
            <CopyField value={issuedKey} label="Key completa" />
            <Button size="sm" onClick={clearIssuedKey}>Ya la guardé</Button>
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-line">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-display">
            <KeyRound className="h-5 w-5" /> Key actual
          </CardTitle>
          <KeyStatusBadge status={MOCK_KEY.status} />
        </CardHeader>
        <CardContent className="space-y-4">
          <CopyField value={MOCK_KEY.prefix} masked label="Prefijo" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-slate uppercase tracking-wider font-mono">Uso desde</div>
              <div className="font-mono">{MOCK_KEY.usageStartedAt}</div>
            </div>
            <div>
              <div className="text-xs text-slate uppercase tracking-wider font-mono">Cierra ciclo</div>
              <div className="font-mono">{MOCK_KEY.cycleEndsAt}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-line">
        <CardHeader>
          <CardTitle className="font-display">Uso con el SDK</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-ink text-paper rounded-md p-4 text-sm font-mono overflow-x-auto">
{`import { TripleD } from "@triple-d/sdk";

const td = new TripleD({
  apiKey: process.env.TRIPLE_D_KEY, // tu API Key
});

const inv = await td.invoices.create({ /* ... */ });`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
