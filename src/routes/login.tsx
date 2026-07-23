import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/triple-d/logo";
import { NavbarControls } from "@/components/triple-d/navbar-controls";
import { GoogleButton } from "@/components/triple-d/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { TwoFactorChallenge } from "@/lib/api-types";
import { useTranslation } from "@/lib/i18n-context";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar · Triple D" },
      { name: "description", content: "Accedé a tu panel de facturación electrónica Triple D." },
      { property: "og:title", content: "Entrar · Triple D" },
      { property: "og:description", content: "Accedé a tu panel Triple D." },
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
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState<TwoFactorChallenge | null>(null);
  const [code, setCode] = useState("");

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
    navigate({ to: "/app" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await afterLogin(await login(email, password));
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("login.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="p-6 flex items-center justify-between">
        <Link to="/">
          <LogoMark />
        </Link>
        <NavbarControls />
      </header>
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-line">
          {challenge ? (
            <>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Verificación en dos pasos</CardTitle>
                <p className="text-sm text-slate">
                  {challenge.method === "email"
                    ? "Ingresá el código que enviamos a tu email."
                    : "Ingresá el código de tu app."}
                </p>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    try {
                      await verifyTwoFactor(challenge.pendingToken, code.trim());
                      navigate({ to: "/app" });
                    } catch (err) {
                      toast.error(err instanceof ApiError ? err.message : "Código inválido");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input
                      id="code"
                      inputMode="numeric"
                      autoFocus
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      maxLength={8}
                      className="font-mono tracking-widest text-center text-lg"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verificando…" : "Verificar"}
                  </Button>
                  <button
                    type="button"
                    className="text-sm text-slate underline w-full"
                    onClick={() => {
                      setChallenge(null);
                      setCode("");
                    }}
                  >
                    Volver
                  </button>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="font-display text-2xl">{t("login.title")}</CardTitle>
                <p className="text-sm text-slate">{t("login.subtitle")}</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("common.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t("common.password")}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? t("login.submitting") : t("login.submit")}
                  </Button>
                </form>
                <div className="my-4 flex items-center gap-3 text-xs text-slate">
                  <div className="h-px flex-1 bg-line" /> o <div className="h-px flex-1 bg-line" />
                </div>
                <GoogleButton
                  onCredential={async (credential) => {
                    setLoading(true);
                    try {
                      await afterLogin(await loginWithGoogle(credential));
                    } catch (err) {
                      toast.error(
                        err instanceof ApiError ? err.message : "No se pudo iniciar sesión con Google",
                      );
                    } finally {
                      setLoading(false);
                    }
                  }}
                />
                <p className="text-sm text-center text-slate mt-4">
                  {t("login.noAccount")}{" "}
                  <Link to="/register" className="text-signal underline">
                    {t("nav.register")}
                  </Link>
                </p>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
