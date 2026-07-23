import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/triple-d/logo";
import { NavbarControls } from "@/components/triple-d/navbar-controls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
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
  const { login, user, hydrated } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && user) navigate({ to: "/app" });
  }, [hydrated, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 8) {
      toast.error(t("login.invalidCredentials"));
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/app" });
    } catch {
      toast.error(t("login.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="p-6 flex items-center justify-between">
        <Link to="/"><LogoMark /></Link>
        <NavbarControls />
      </header>
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-line">
          <CardHeader>
            <CardTitle className="font-display text-2xl">{t("login.title")}</CardTitle>
            <p className="text-sm text-slate">{t("login.subtitle")}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("common.email")}</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("common.password")}</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("login.submitting") : t("login.submit")}
              </Button>
              <p className="text-sm text-center text-slate">
                {t("login.noAccount")}{" "}
                <Link to="/register" className="text-signal underline">{t("nav.register")}</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
