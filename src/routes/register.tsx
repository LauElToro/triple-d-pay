import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { AuthShell } from "@/components/set-api/auth-shell";
import { AuthBusyOverlay } from "@/components/set-api/auth-busy-overlay";
import { GoogleButton, isGoogleSignInEnabled } from "@/components/set-api/google-button";
import { PasswordInput } from "@/components/set-api/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ApiError, api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import type { PlanId } from "@/lib/api-types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  plan: z.enum(["free", "fixed", "usage"]).optional(),
});

export const Route = createFileRoute("/register")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Crear cuenta · Set-Api" },
      {
        name: "description",
        content: "Creá tu cuenta Set-Api y obtené tu API Key para facturar electrónicamente.",
      },
      { property: "og:title", content: "Crear cuenta · Set-Api" },
      { property: "og:description", content: "Obtené tu API Key en un minuto." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { plan: initialPlan } = Route.useSearch();
  const { register, verifyEmail, loginWithGoogle, user, hydrated } = useAuth();
  const { t, plans } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState<PlanId>(initialPlan ?? "free");
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [resending, setResending] = useState(false);

  const startLoading = (label: string) => {
    setLoadingLabel(label);
    setLoading(true);
  };

  useEffect(() => {
    if (hydrated && user) navigate({ to: "/app" });
  }, [hydrated, user, navigate]);

  const passwordHint =
    password.length === 0
      ? t("register.passwordHint")
      : password.length < 8
        ? t("register.passwordWeak")
        : t("register.passwordOk");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error(t("register.invalidEmail"));
    if (password.length < 8) return toast.error(t("register.minPassword"));
    startLoading(t("register.submitting"));
    try {
      const res = await register({
        email,
        password,
        name: name || undefined,
        plan,
      });
      setPendingEmail(res.email);
      toast.success(t("register.verifySent"));
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("register.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <Card
        className="relative w-full max-w-lg border-line bg-card/90 shadow-sm backdrop-blur-sm overflow-hidden"
        aria-busy={loading}
      >
        <AuthBusyOverlay active={loading} label={loadingLabel || t("register.submitting")} />
        {pendingEmail ? (
          <>
            <CardHeader className="space-y-2">
              <CardTitle className="font-display text-2xl">{t("register.verifyTitle")}</CardTitle>
              <CardDescription>
                {t("register.verifyDesc")} <span className="font-mono text-ink">{pendingEmail}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <fieldset disabled={loading} className="min-w-0">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  startLoading(t("register.verifying"));
                  try {
                    await verifyEmail(pendingEmail, code.trim());
                    navigate({ to: "/onboarding" });
                  } catch (err) {
                    toast.error(err instanceof ApiError ? err.message : t("register.verifyInvalid"));
                  } finally {
                    setLoading(false);
                  }
                }}
                className="space-y-5"
              >
                <div className="space-y-3 flex flex-col items-center">
                  <Label htmlFor="code">{t("register.verifyCode")}</Label>
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
                  {loading ? t("register.verifying") : t("register.verifySubmit")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={loading || resending}
                  onClick={async () => {
                    if (!pendingEmail) return;
                    setResending(true);
                    try {
                      await api.post("/api/auth/resend-verification", { email: pendingEmail });
                      toast.success(t("register.resendSent"));
                    } catch (err) {
                      toast.error(err instanceof ApiError ? err.message : t("register.resendError"));
                    } finally {
                      setResending(false);
                    }
                  }}
                >
                  {resending ? t("register.resending") : t("register.resendCode")}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-slate"
                  disabled={loading}
                  onClick={() => {
                    setPendingEmail(null);
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
              <CardTitle className="font-display text-2xl">{t("register.title")}</CardTitle>
              <CardDescription>{t("register.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <fieldset disabled={loading} className="min-w-0">
              <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("register.name")}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("register.namePlaceholder")}
                    autoComplete="name"
                  />
                </div>
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
                    autoComplete="new-password"
                    showLabel={t("auth.showPassword")}
                    hideLabel={t("auth.hidePassword")}
                  />
                  <p
                    className={cn(
                      "text-xs",
                      password.length === 0
                        ? "text-slate"
                        : password.length < 8
                          ? "text-seal"
                          : "text-signal",
                    )}
                  >
                    {passwordHint}
                  </p>
                </div>
                <div className="space-y-3">
                  <Label>{t("common.plan")}</Label>
                  <RadioGroup value={plan} onValueChange={(v) => setPlan(v as PlanId)} className="gap-2">
                    {plans.map((p) => (
                      <label
                        key={p.id}
                        htmlFor={`plan-${p.id}`}
                        className={cn(
                          "flex items-start gap-3 border rounded-md p-3 cursor-pointer transition-colors",
                          plan === p.id
                            ? "border-signal bg-signal/5 shadow-sm"
                            : "border-line hover:border-slate/40 hover:bg-mist/40",
                        )}
                      >
                        <RadioGroupItem value={p.id} id={`plan-${p.id}`} className="mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-3">
                            <span className="font-medium">{p.name}</span>
                            <span className="font-mono text-sm shrink-0">{p.price}</span>
                          </div>
                          <p className="text-xs text-slate mt-0.5">{p.tagline}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                  <p className="text-xs text-slate">{t("register.planHint")}</p>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? t("register.submitting") : t("register.submit")}
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
                      startLoading(t("register.googleLoading"));
                      try {
                        await loginWithGoogle(credential);
                        navigate({ to: "/onboarding" });
                      } catch (err) {
                        toast.error(
                          err instanceof ApiError ? err.message : t("register.googleError"),
                        );
                      } finally {
                        setLoading(false);
                      }
                    }}
                  />
                </>
              )}
              <p className="text-sm text-center text-slate mt-5">
                {t("register.hasAccount")}{" "}
                <Link to="/login" className="text-signal font-medium hover:underline">
                  {t("nav.login")}
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
