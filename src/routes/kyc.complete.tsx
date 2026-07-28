import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/set-api/logo";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/kyc/complete")({
  head: () => ({ meta: [{ title: "Verificación en proceso · Set-Api" }] }),
  component: KycComplete,
});

function KycComplete() {
  const { refreshMe } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = useState<"polling" | "approved" | "declined" | "timeout">("polling");

  useEffect(() => {
    let attempts = 0;
    let cancelled = false;
    const poll = async () => {
      if (cancelled) return;
      attempts += 1;
      try {
        const d = await api.get<{ kycStatus: string }>("/api/kyc/status");
        if (d.kycStatus === "APPROVED") {
          setState("approved");
          await refreshMe();
          setTimeout(() => navigate({ to: "/app" }), 1200);
          return;
        }
        if (d.kycStatus === "DECLINED") {
          setState("declined");
          return;
        }
      } catch {
        // ignore transient errors
      }
      if (attempts < 60) setTimeout(poll, 3000);
      else setState("timeout");
    };
    poll();
    return () => {
      cancelled = true;
    };
  }, [navigate, refreshMe]);

  // Keep listening even after "timeout" UI — webhook may arrive later.
  useEffect(() => {
    if (state !== "timeout") return;
    let cancelled = false;
    const tick = async () => {
      if (cancelled) return;
      try {
        const d = await api.get<{ kycStatus: string }>("/api/kyc/status");
        if (d.kycStatus === "APPROVED") {
          setState("approved");
          await refreshMe();
          setTimeout(() => navigate({ to: "/app" }), 1200);
          return;
        }
        if (d.kycStatus === "DECLINED") {
          setState("declined");
          return;
        }
      } catch {
        // ignore
      }
      if (!cancelled) setTimeout(tick, 5000);
    };
    const id = setTimeout(tick, 5000);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [state, navigate, refreshMe]);

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-4 px-4">
      <LogoMark />
      {state === "approved" && (
        <div className="flex flex-col items-center gap-2 text-signal">
          <CheckCircle2 className="h-10 w-10" />
          <p className="font-display text-lg">{t("kyc.approved")}</p>
        </div>
      )}
      {state === "polling" && (
        <div className="flex flex-col items-center gap-2 text-slate">
          <Loader2 className="auth-spinner h-8 w-8 text-signal" />
          <p className="text-sm">{t("kyc.confirming")}</p>
        </div>
      )}
      {state === "declined" && (
        <div className="flex flex-col items-center gap-3 text-seal max-w-sm text-center">
          <XCircle className="h-10 w-10" />
          <p className="font-display text-lg">{t("kyc.declinedTitle")}</p>
          <p className="text-sm text-slate">{t("kyc.declinedDesc")}</p>
          <Button onClick={() => navigate({ to: "/kyc" })}>{t("kyc.retry")}</Button>
        </div>
      )}
      {state === "timeout" && (
        <div className="flex flex-col items-center gap-3 text-slate max-w-sm text-center">
          <Loader2 className="h-8 w-8 text-slate" />
          <p className="font-display text-lg text-ink">{t("kyc.timeoutTitle")}</p>
          <p className="text-sm">{t("kyc.timeoutDesc")}</p>
          <Button variant="outline" onClick={() => navigate({ to: "/app" })}>
            {t("kyc.skipToApp")}
          </Button>
        </div>
      )}
    </div>
  );
}
