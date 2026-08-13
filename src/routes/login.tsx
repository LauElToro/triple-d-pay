import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/set-api/auth-shell";
import { AuthBusyOverlay } from "@/components/set-api/auth-busy-overlay";
import { GoogleButton, isGoogleSignInEnabled } from "@/components/set-api/google-button";
import { PasswordInput } from "@/components/set-api/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { TwoFactorChallenge } from "@/lib/api-types";
import {
  getRememberedEmail,
  setRememberedEmail,
} from "@/lib/remembered-account";
import { useTranslation } from "@/lib/i18n-context";
import { isKycBlocking } from "@/lib/kyc";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar · Set-Api" },
      { name: "description", content: "Accedé a tu panel de facturación electrónica Set-Api." },
      { property: "og:title", content: "Entrar · Set-Api" },
      { property: "og:description", content: "Accedé a tu panel Set-Api." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, loginWithGoogle, verifyTwoFactor, user, hydrated } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");
  const [challenge, setChallenge] = useState<TwoFactorChallenge | null>(null);
  const [code, setCode] = useState("");

  const startLoading = (label: string) => {
    setLoadingLabel(label);
    setLoading(true);
  };

  useEffect(() => {
    const saved = getRememberedEmail();
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated && user) navigate({ to: "/app" });
  }, [hydrated, user, navigate]);

  const afterLogin = async (res: Awaited<ReturnType<typeof login>>) => {
    if ("status" in res && res.status === "twofa_required") {
      setChallenge(res);
      toast.info(
        res.method === "email"
          ? "Te enviamos un código por email"
          : "Ingresá el código de tu app de autenticación",
      );
      return;
    }
    const authUser = (res as { user?: { kycStatus?: string; systemRole?: string } }).user;
    if (isKycBlocking(authUser)) {
      toast.info("Completá la verificación de identidad cuando puedas", {
        action: { label: "KYC", onClick: () => navigate({ to: "/kyc" }) },
      });
    }
    navigate({ to: "/app" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading(t("login.submitting"));
    try {
      await afterLogin(await login(email, password));
      setRememberedEmail(remember ? email : null);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("login.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <Card
        className="relative w-full max-w-md border-line bg-card/90 shadow-sm backdrop-blur-sm overflow-hidden"
        aria-busy={loading}
      >
        <AuthBusyOverlay active={loading} label={loadingLabel || t("login.submitting")} />
        {challenge ? (
          <>
            <CardHeader className="space-y-2">
              <CardTitle className="font-display text-2xl">{t("login.twofaTitle")}</CardTitle>
              <CardDescription>
                {challenge.method === "email"
                  ? t("login.twofaEmail")
                  : t("login.twofaTotp")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <fieldset disabled={loading} className="contents">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  startLoading(t("login.twofaVerifying"));
                  try {
                    await verifyTwoFactor(challenge.pendingToken, code.trim());
                    setRememberedEmail(remember ? email : null);
                    navigate({ to: "/app" });
                  } catch (err) {
                    toast.error(err instanceof ApiError ? err.message : t("login.twofaInvalid"));
                  } finally {
                    setLoading(false);
                  }
                }}
                className="space-y-5"
              >
                <div className="space-y-3 flex flex-col items-center">
                  <Label htmlFor="code">{t("login.twofaCode")}</Label>
                  <InputOTP maxLength={6} value={code} onChange={setCode} autoFocus>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading || code.length < 6}>
                  {loading ? t("login.twofaVerifying") : t("login.twofaVerify")}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-slate"
                  disabled={loading}
                  onClick={() => {
                    setChallenge(null);
                    setCode("");
                  }}
                >
                  {t("common.back")}
                </Button>
              </form>
              </fieldset>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="space-y-2">
              <CardTitle className="font-display text-2xl">{t("login.title")}</CardTitle>
              <CardDescription>{t("login.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <fieldset disabled={loading} className="min-w-0 space-y-0">
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("common.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vos@empresa.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("common.password")}</Label>
                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="current-password"
                    showLabel={t("auth.showPassword")}
                    hideLabel={t("auth.hidePassword")}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(v) => {
                      const next = v === true;
                      setRemember(next);
                      if (!next) setRememberedEmail(null);
                    }}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal text-slate cursor-pointer">
                    {t("login.remember")}
                  </Label>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? t("login.submitting") : t("login.submit")}
                </Button>
              </form>
              {isGoogleSignInEnabled() && (
                <>
                  <div className="my-5 flex items-center gap-3 text-xs text-slate">
                    <div className="h-px flex-1 bg-line" />
                    <span>{t("auth.or")}</span>
                    <div className="h-px flex-1 bg-line" />
                  </div>
                  <GoogleButton
                    onCredential={async (credential) => {
                      startLoading(t("login.googleLoading"));
                      try {
                        await afterLogin(await loginWithGoogle(credential));
                        setRememberedEmail(remember ? email : null);
                      } catch (err) {
                        toast.error(
                          err instanceof ApiError ? err.message : t("login.googleError"),
                        );
                      } finally {
                        setLoading(false);
                      }
                    }}
                  />
                </>
              )}
              <p className="text-sm text-center text-slate mt-5">
                {t("login.noAccount")}{" "}
                <Link to="/register" className="text-signal font-medium hover:underline">
                  {t("nav.register")}
                </Link>
              </p>
              </fieldset>
            </CardContent>
          </>
        )}
      </Card>
    </AuthShell>
  );
}
