import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/triple-d/logo";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

export const Route = createFileRoute("/kyc/complete")({
  head: () => ({ meta: [{ title: "Verificación en proceso · Triple D" }] }),
  component: KycComplete,
});

function KycComplete() {
  const { refreshMe } = useAuth();
  const navigate = useNavigate();
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const poll = async () => {
      attempts += 1;
      try {
        const d = await api.get<{ kycStatus: string }>("/api/kyc/status");
        if (d.kycStatus === "APPROVED") {
          setApproved(true);
          await refreshMe();
          setTimeout(() => navigate({ to: "/app" }), 1200);
          return;
        }
      } catch {
        // ignore transient errors
      }
      if (attempts < 20) setTimeout(poll, 3000);
      else navigate({ to: "/kyc" });
    };
    poll();
  }, [navigate, refreshMe]);

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-4">
      <LogoMark />
      {approved ? (
        <div className="flex flex-col items-center gap-2 text-signal">
          <CheckCircle2 className="h-10 w-10" />
          <p className="font-display text-lg">¡Verificación aprobada!</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">Confirmando tu verificación…</p>
        </div>
      )}
    </div>
  );
}
