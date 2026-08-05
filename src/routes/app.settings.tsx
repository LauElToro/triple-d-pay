import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { isValidCuit, normalizeCuit } from "@/lib/cuit";
import { useTranslation } from "@/lib/i18n-context";
import { toast } from "sonner";
import { ShieldCheck, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, activeOrg, refreshMe, hasPermission } = useAuth();
  const { t } = useTranslation();
  const canManage = hasPermission("org:manage");

  const [setup, setSetup] = useState<{ qr: string; secret: string } | null>(null);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [code, setCode] = useState("");
  const [cuit, setCuit] = useState(activeOrg?.arcaCuit ?? "");
  const [cuitError, setCuitError] = useState<string | null>(null);
  const [orgName, setOrgName] = useState(activeOrg?.name ?? "");
  const [copied, setCopied] = useState(false);

  const startSetup = async () => {
    try {
      const res = await api.post<{ qr: string; secret: string }>("/api/auth/2fa/setup");
      setSetup(res);
      setStep(1);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const enable = async () => {
    try {
      await api.post("/api/auth/2fa/enable", { code: code.trim(), enable: true });
      await refreshMe();
      setSetup(null);
      setCode("");
      setStep(0);
      toast.success(t("settings.twofaEnabled"));
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const disable = async () => {
    try {
      await api.post("/api/auth/2fa/enable", { code: code.trim(), enable: false });
      await refreshMe();
      setCode("");
      toast.success(t("settings.twofaDisabled"));
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const saveOrg = async () => {
    const trimmedCuit = cuit.trim();
    if (trimmedCuit) {
      const normalized = normalizeCuit(trimmedCuit);
      if (!/^\d{11}$/.test(normalized)) {
        setCuitError(t("settings.orgCuitInvalid"));
        return;
      }
      if (!isValidCuit(normalized)) {
        setCuitError(t("settings.orgCuitCheckDigit"));
        return;
      }
    }
    setCuitError(null);
    try {
      await api.patch("/api/organizations", {
        name: orgName || undefined,
        arcaCuit: trimmedCuit ? normalizeCuit(trimmedCuit) : undefined,
      });
      await refreshMe();
      toast.success(t("settings.orgSaved"));
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const copySecret = async () => {
    if (!setup?.secret) return;
    try {
      await navigator.clipboard.writeText(setup.secret);
      setCopied(true);
      toast.success(t("common.copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("common.copyError"));
    }
  };

  return (
    <div className="space-y-6 w-full" data-tour="settings-page">
      <div>
        <h1 className="text-3xl font-display font-bold">{t("settings.title")}</h1>
        <p className="text-slate text-sm">{t("settings.subtitle")}</p>
      </div>

      <Card className="border-line" data-tour="settings-2fa">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-display">
            <ShieldCheck className="h-5 w-5" /> {t("settings.twofaTitle")}
          </CardTitle>
          <Badge
            variant="outline"
            className={user?.twoFactorEnabled ? "bg-signal/15 text-signal border-signal/30" : ""}
          >
            {user?.twoFactorEnabled ? t("settings.twofaOn") : t("settings.twofaOff")}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user?.twoFactorEnabled ? (
            <>
              {step === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-slate">{t("settings.twofaIntro")}</p>
                  <ol className="text-sm text-slate list-decimal pl-5 space-y-1">
                    <li>{t("settings.twofaStep1")}</li>
                    <li>{t("settings.twofaStep2")}</li>
                    <li>{t("settings.twofaStep3")}</li>
                  </ol>
                  <Button onClick={startSetup}>{t("settings.twofaSetup")}</Button>
                </div>
              )}
              {step === 1 && setup && (
                <div className="space-y-3">
                  <p className="text-sm text-slate">{t("settings.twofaScan")}</p>
                  <img src={setup.qr} alt="QR 2FA" className="h-44 w-44 border border-line rounded" />
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-slate break-all flex-1">{setup.secret}</code>
                    <Button size="icon" variant="outline" onClick={copySecret} aria-label={t("common.copy")}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button onClick={() => setStep(2)}>{t("tour.next")}</Button>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-3">
                  <p className="text-sm text-slate">{t("settings.twofaEnter")}</p>
                  <InputOTP maxLength={6} value={code} onChange={setCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      {t("tour.back")}
                    </Button>
                    <Button onClick={enable} disabled={code.length < 6}>
                      {t("settings.twofaActivate")}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate">{t("settings.twofaDisableHint")}</p>
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button variant="outline" onClick={disable} disabled={code.length < 6}>
                {t("settings.twofaDisable")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-line" data-tour="settings-org">
        <CardHeader>
          <CardTitle className="font-display">{t("settings.orgTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">{t("settings.orgName")}</Label>
            <Input
              id="orgName"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              disabled={!canManage}
            />
          </div>
          <div className="space-y-2" data-tour="settings-cuit">
            <Label htmlFor="cuit">{t("settings.orgCuit")}</Label>
            <Input
              id="cuit"
              value={cuit}
              onChange={(e) => {
                setCuit(e.target.value);
                setCuitError(null);
              }}
              placeholder="20111111112"
              disabled={!canManage}
              className="font-mono"
              aria-invalid={Boolean(cuitError)}
            />
            {cuitError ? (
              <p className="text-xs text-seal">{cuitError}</p>
            ) : (
              <p className="text-xs text-slate">{t("settings.orgCuitHint")}</p>
            )}
          </div>
          {canManage && <Button onClick={saveOrg}>{t("common.save")}</Button>}
        </CardContent>
      </Card>
    </div>
  );
}
