import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { LogoMark } from "@/components/triple-d/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";

const searchSchema = z.object({ token: z.string().optional() });

export const Route = createFileRoute("/invite/accept")({
  validateSearch: searchSchema,
  component: AcceptInvite,
});

function AcceptInvite() {
  const { token } = Route.useSearch();
  const { user, hydrated, refreshMe } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "joining" | "done" | "error">("idle");

  const accept = async () => {
    if (!token) return;
    setStatus("joining");
    try {
      await api.post("/api/team/invitations/accept", { token });
      await refreshMe();
      setStatus("done");
      toast.success("Te uniste a la organización");
      setTimeout(() => navigate({ to: "/app" }), 1000);
    } catch (err) {
      setStatus("error");
      toast.error(err instanceof ApiError ? err.message : "No se pudo aceptar la invitación");
    }
  };

  useEffect(() => {
    if (hydrated && user && token && status === "idle") accept();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, user, token]);

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="p-6"><LogoMark /></header>
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-line">
          <CardHeader><CardTitle className="font-display text-2xl">Invitación</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {!token && <p className="text-sm text-red-600">Falta el token de invitación.</p>}
            {hydrated && !user && (
              <>
                <p className="text-sm text-slate">Iniciá sesión o creá tu cuenta para aceptar la invitación.</p>
                <div className="flex gap-2">
                  <Button asChild><Link to="/login">Entrar</Link></Button>
                  <Button asChild variant="outline"><Link to="/register">Crear cuenta</Link></Button>
                </div>
              </>
            )}
            {user && status === "joining" && <p className="text-sm text-slate">Uniéndote…</p>}
            {user && status === "done" && <p className="text-sm text-signal">¡Listo! Redirigiendo…</p>}
            {user && status === "error" && <Button onClick={accept}>Reintentar</Button>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
