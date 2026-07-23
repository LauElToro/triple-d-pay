import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/triple-d/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/kyc")({
  head: () => ({ meta: [{ title: "Verificación de identidad · Triple D" }] }),
  component: KycPage,
});

function KycPage() {
  const { user, hydrated, refreshMe } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("NOT_STARTED");
  const [starting, setStarting] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  useEffect(() => {
    if (!user) return;
    if (user.systemRole === "SUPERADMIN" || user.kycStatus === "APPROVED") {
      navigate({ to: "/app" });
      return;
    }
    api
      .get<{ kycStatus: string }>("/api/kyc/status")
      .then((d) => setStatus(d.kycStatus))
      .catch(() => undefined);
  }, [user, navigate]);

  const start = async () => {
    setStarting(true);
    try {
      const { url } = await api.post<{ url: string }>("/api/kyc/session");
      window.location.href = url;
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "No se pudo iniciar la verificación");
      setStarting(false);
    }
  };

  const recheck = async () => {
    setChecking(true);
    try {
      const d = await api.get<{ kycStatus: string }>("/api/kyc/status");
      setStatus(d.kycStatus);
      if (d.kycStatus === "APPROVED") {
        await refreshMe();
        navigate({ to: "/app" });
      } else {
        toast.info("Todavía no está aprobada. Probá de nuevo en unos minutos.");
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="p-6"><LogoMark /></header>
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-line">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-2xl">
              <ShieldCheck className="h-6 w-6 text-signal" /> Verificación de identidad
            </CardTitle>
            <p className="text-sm text-slate">
              Para operar en Triple D necesitás completar la verificación KYC. Es un paso único y seguro.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm font-mono text-slate">Estado: {status}</div>
            {status === "DECLINED" && (
              <p className="text-sm text-red-600">
                La verificación fue rechazada. Podés reintentar el proceso.
              </p>
            )}
            <Button className="w-full" onClick={start} disabled={starting}>
              {starting ? "Redirigiendo…" : status === "PENDING" ? "Continuar verificación" : "Iniciar verificación"}
            </Button>
            <Button variant="outline" className="w-full" onClick={recheck} disabled={checking}>
              {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ya la completé — verificar"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
