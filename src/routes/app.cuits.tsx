import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppPageHeader } from "@/components/set-api/app-page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/app/cuits")({
  component: CuitsPage,
});

function CuitsPage() {
  const qc = useQueryClient();
  const [cuit, setCuit] = useState("");
  const [displayName, setDisplayName] = useState("");
  const cuits = useQuery({
    queryKey: ["organization-cuits"],
    queryFn: () => api.get<{ cuits: Array<{ id: string; cuit: string; displayName: string | null; isDefault: boolean; status: string }> }>("/api/organizations/cuits"),
  });
  const add = useMutation({
    mutationFn: () => api.post("/api/organizations/cuits", { cuit, displayName: displayName || undefined }),
    onSuccess: () => {
      setCuit("");
      setDisplayName("");
      qc.invalidateQueries({ queryKey: ["organization-cuits"] });
      toast.success("CUIT agregado");
    },
    onError: (err) => toast.error(err instanceof ApiError ? err.message : "No se pudo agregar el CUIT"),
  });

  return (
    <div className="space-y-6 w-full">
      <AppPageHeader
        title="CUITs autorizados"
        description="Administrá los emisores que puede utilizar tu organización."
        crumbs={[{ label: "CUITs" }]}
      />

      <Alert className="border-signal/30 bg-signal/5">
        <AlertDescription className="text-sm">
          Cada API Key debe tener un grant explícito sobre los CUITs que puede utilizar.
        </AlertDescription>
      </Alert>

      <Card className="border-line">
        <CardHeader><CardTitle>Agregar CUIT</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end">
          <div className="space-y-2">
            <Label htmlFor="cuit">CUIT</Label>
            <Input id="cuit" value={cuit} onChange={(event) => setCuit(event.target.value)} placeholder="20-12345678-9" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">Alias (opcional)</Label>
            <Input id="displayName" value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Mi empresa" />
          </div>
          <Button disabled={add.isPending || !cuit.trim()} onClick={() => add.mutate()}>
            {add.isPending ? "Guardando..." : "Agregar"}
          </Button>
        </CardContent>
      </Card>

      {cuits.isLoading ? <p className="text-sm text-slate">Cargando CUITs...</p> : (
        <div className="grid gap-3">
          {(cuits.data?.cuits ?? []).map((item) => (
            <Card key={item.id} className="border-line">
              <CardContent className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-mono">{item.cuit}</p>
                  <p className="text-sm text-slate">{item.displayName || "Sin alias"}</p>
                </div>
                <span className="text-xs font-mono text-slate">
                  {item.isDefault ? "DEFAULT" : item.status.toUpperCase()}
                </span>
              </CardContent>
            </Card>
          ))}
          {!cuits.data?.cuits.length && <p className="text-sm text-slate">No hay CUITs configurados.</p>}
        </div>
      )}
    </div>
  );
}
