import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, activeOrg, refreshMe, hasPermission } = useAuth();
  const canManage = hasPermission("org:manage");

  const [setup, setSetup] = useState<{ qr: string; secret: string } | null>(null);
  const [code, setCode] = useState("");
  const [cuit, setCuit] = useState(activeOrg?.arcaCuit ?? "");
  const [orgName, setOrgName] = useState(activeOrg?.name ?? "");

  const startSetup = async () => {
    try {
      const res = await api.post<{ qr: string; secret: string }>("/api/auth/2fa/setup");
      setSetup(res);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const enable = async () => {
    try {
      await api.post("/api/auth/2fa/enable", { code: code.trim(), enable: true });
      await refreshMe();
      setSetup(null); setCode("");
      toast.success("2FA activado");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const disable = async () => {
    try {
      await api.post("/api/auth/2fa/enable", { code: code.trim(), enable: false });
      await refreshMe();
      setCode("");
      toast.success("2FA desactivado");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const saveOrg = async () => {
    try {
      await api.patch("/api/organizations", {
        name: orgName || undefined,
        arcaCuit: cuit || undefined,
      });
      await refreshMe();
      toast.success("Organización actualizada");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Ajustes</h1>
        <p className="text-slate text-sm">Seguridad de la cuenta y datos de la organización.</p>
      </div>

      <Card className="border-line">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-display">
            <ShieldCheck className="h-5 w-5" /> Verificación en dos pasos (2FA)
          </CardTitle>
          <Badge variant="outline" className={user?.twoFactorEnabled ? "bg-signal/15 text-signal border-signal/30" : ""}>
            {user?.twoFactorEnabled ? "Activo" : "Inactivo"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user?.twoFactorEnabled ? (
            <>
              {!setup ? (
                <Button onClick={startSetup}>Configurar 2FA</Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-slate">Escaneá el QR con Google Authenticator o similar, luego ingresá el código.</p>
                  <img src={setup.qr} alt="QR 2FA" className="h-44 w-44 border border-line rounded" />
                  <div className="text-xs font-mono text-slate">Secreto: {setup.secret}</div>
                  <div className="flex gap-2">
                    <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código de 6 dígitos" className="font-mono" />
                    <Button onClick={enable} disabled={!code}>Activar</Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-2">
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código actual" className="font-mono" />
              <Button variant="outline" onClick={disable} disabled={!code}>Desactivar</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-line">
        <CardHeader><CardTitle className="font-display">Organización</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Nombre</Label>
            <Input id="orgName" value={orgName} onChange={(e) => setOrgName(e.target.value)} disabled={!canManage} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuit">CUIT emisor (ARCA)</Label>
            <Input id="cuit" value={cuit} onChange={(e) => setCuit(e.target.value)} placeholder="20111111112" disabled={!canManage} className="font-mono" />
            <p className="text-xs text-slate">Se usa como cuit_emisor al emitir comprobantes en ARCA.</p>
          </div>
          {canManage && <Button onClick={saveOrg}>Guardar</Button>}
        </CardContent>
      </Card>
    </div>
  );
}
