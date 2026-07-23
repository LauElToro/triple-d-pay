import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/triple-d/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Loader2, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";
import { useTranslation } from "@/lib/i18n-context";
import { toast } from "sonner";

export const Route = createFileRoute("/kyc")({
  head: () => ({ meta: [{ title: "Verificación de identidad · Triple D" }] }),
  component: KycPage,
});

function KycPage() {
  const { user, hydrated, refreshMe } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("NOT_STARTED");
  const [sessionUrl, setSessionUrl] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  useEffect(() => {
    if (!user) return;
    if (user.systemRole === "SUPERADMIN" || user.kycStatus === "APPROVED") {
      navigate({ to: "/app" });
      return;
    }
    setStatus(user.kycStatus);
    api
      .get<{ kycStatus: string; session: { url: string | null; status: string } | null }>(
        "/api/kyc/status",
      )
      .then((d) => {
        setStatus(d.kycStatus);
        if (d.session?.url) setSessionUrl(d.session.url);
      })
      .catch(() => undefined);
  }, [user, navigate]);

  // When PENDING, poll status — Didit webhook updates the DB; we just reflect it.
  useEffect(() => {
    if (!user || status !== "PENDING") return;
    let cancelled = false;
    const tick = async () => {
      if (cancelled) return;
      try {
        const d = await api.get<{ kycStatus: string }>("/api/kyc/status");
        if (cancelled) return;
        setStatus(d.kycStatus);
        if (d.kycStatus === "APPROVED") {
          await refreshMe();
          navigate({ to: "/app" });
          return;
        }
        if (d.kycStatus === "DECLINED") return;
      } catch {
        // ignore
      }
      if (!cancelled) setTimeout(tick, 4000);
    };
    const id = setTimeout(tick, 4000);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [user, status, refreshMe, navigate]);

  const start = async () => {
    setStarting(true);
    try {
      if (sessionUrl && status === "PENDING") {
        window.location.href = sessionUrl;
        return;
      }
      const res = await api.post<{ url: string }>("/api/kyc/session");
      window.location.href = res.url;
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("kyc.startError"));
      setStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="p-6 flex items-center justify-between">
        <LogoMark />
        <Button variant="ghost" asChild>
          <Link to="/app">{t("kyc.skipToApp")}</Link>
        </Button>
      </header>
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-line">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-2xl">
              <ShieldCheck className="h-6 w-6 text-signal" /> {t("kyc.title")}
            </CardTitle>
            <p className="text-sm text-slate">{t("kyc.subtitle")}</p>
            <p className="text-xs text-slate font-mono flex items-center gap-1 mt-2">
              <ExternalLink className="h-3 w-3" /> {t("kyc.poweredBy")}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm font-mono text-slate flex items-center gap-2">
              <span>
                {t("kyc.status")}: <span className="text-ink">{status}</span>
              </span>
              {status === "PENDING" && (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-signal" aria-hidden />
              )}
            </div>
            {status === "DECLINED" && (
              <p className="text-sm text-seal">{t("kyc.declinedDesc")}</p>
            )}
            {status === "PENDING" && (
              <p className="text-sm text-slate">{t("kyc.pendingDesc")}</p>
            )}
            <Button className="w-full" onClick={start} disabled={starting}>
              {starting
                ? t("kyc.redirecting")
                : status === "PENDING"
                  ? t("kyc.continue")
                  : status === "DECLINED"
                    ? t("kyc.retry")
                    : t("kyc.start")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
