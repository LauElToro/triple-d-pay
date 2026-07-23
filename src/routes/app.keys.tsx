import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyField } from "@/components/triple-d/copy-field";
import { KeyStatusBadge } from "@/components/triple-d/key-status-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { KeyRound, AlertTriangle, Plus, RotateCw, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import type { ApiKeyView } from "@/lib/api-types";
import { toast } from "sonner";

export const Route = createFileRoute("/app/keys")({
  component: KeysPage,
});

function KeysPage() {
  const { issuedKey, setIssuedKey, hasPermission } = useAuth();
  const qc = useQueryClient();
  const canWrite = hasPermission("keys:write");

  const { data, isLoading } = useQuery({
    queryKey: ["keys"],
    queryFn: () => api.get<{ keys: ApiKeyView[] }>("/api/keys"),
  });

  const create = useMutation({
    mutationFn: () => api.post<{ key: ApiKeyView; plaintext: string }>("/api/keys"),
    onSuccess: (res) => {
      setIssuedKey(res.plaintext);
      qc.invalidateQueries({ queryKey: ["keys"] });
      toast.success("API Key generada");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rotate = useMutation({
    mutationFn: (id: string) => api.post<{ plaintext: string }>(`/api/keys/${id}/rotate`),
    onSuccess: (res) => {
      setIssuedKey(res.plaintext);
      qc.invalidateQueries({ queryKey: ["keys"] });
      toast.success("Key rotada");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const revoke = useMutation({
    mutationFn: (id: string) => api.del(`/api/keys/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["keys"] });
      toast.success("Key revocada");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const keys = data?.keys.filter((k) => k.status !== "revoked") ?? [];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">API Keys</h1>
          <p className="text-slate text-sm">Autenticá tu SDK con estas keys. El gasto se registra por key.</p>
        </div>
        {canWrite && (
          <Button onClick={() => create.mutate()} disabled={create.isPending}>
            <Plus className="h-4 w-4 mr-2" /> Nueva key
          </Button>
        )}
      </div>

      {issuedKey && (
        <Alert className="border-signal bg-signal/5">
          <AlertTriangle className="h-4 w-4 text-signal" />
          <AlertTitle className="font-display">Tu API Key — se muestra una sola vez</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>Copiala ahora. No la vamos a volver a mostrar.</p>
            <CopyField value={issuedKey} label="Key completa" />
            <Button size="sm" onClick={() => setIssuedKey(null)}>Ya la guardé</Button>
          </AlertDescription>
        </Alert>
      )}

      {isLoading && <p className="text-slate text-sm font-mono">Cargando…</p>}

      {keys.map((key) => (
        <Card key={key.id} className="border-line">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-display">
              <KeyRound className="h-5 w-5" /> {key.name}
            </CardTitle>
            <KeyStatusBadge status={key.status === "active" ? "active" : "suspended"} />
          </CardHeader>
          <CardContent className="space-y-4">
            <CopyField value={key.prefix} masked label="Prefijo" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-slate uppercase tracking-wider font-mono">Uso desde</div>
                <div className="font-mono">{new Date(key.usageStartedAt).toLocaleDateString("es-AR")}</div>
              </div>
              <div>
                <div className="text-xs text-slate uppercase tracking-wider font-mono">Cierra ciclo</div>
                <div className="font-mono">{key.cycleEndsAt ? new Date(key.cycleEndsAt).toLocaleDateString("es-AR") : "—"}</div>
              </div>
            </div>
            {canWrite && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => rotate.mutate(key.id)}>
                  <RotateCw className="h-4 w-4 mr-2" /> Rotar
                </Button>
                <Button size="sm" variant="outline" onClick={() => revoke.mutate(key.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Revocar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {!isLoading && keys.length === 0 && (
        <Card className="border-line border-dashed">
          <CardContent className="py-10 text-center text-slate text-sm">
            No tenés keys activas. {canWrite ? "Generá una para empezar." : "Pedile a un admin que genere una."}
          </CardContent>
        </Card>
      )}

      <Card className="border-line">
        <CardHeader><CardTitle className="font-display">Uso con el SDK</CardTitle></CardHeader>
        <CardContent>
          <pre className="bg-ink text-paper rounded-md p-4 text-sm font-mono overflow-x-auto">
{`// Emitir un comprobante a través de Triple D
await fetch("http://localhost:4000/api/arca/comprobantes", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + process.env.TRIPLE_D_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ cbteTipo: 11, ptoVta: 1, /* ... */ }),
});`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
