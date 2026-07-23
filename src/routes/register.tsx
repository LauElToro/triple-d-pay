import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { LogoMark } from "@/components/triple-d/logo";
import { NavbarControls } from "@/components/triple-d/navbar-controls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import type { PlanId } from "@/lib/mock-data";
import { toast } from "sonner";

const searchSchema = z.object({
  plan: z.enum(["free", "fixed", "usage"]).optional(),
});

export const Route = createFileRoute("/register")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Crear cuenta · Triple D" },
      { name: "description", content: "Creá tu cuenta Triple D y obtené tu API Key para facturar electrónicamente." },
      { property: "og:title", content: "Crear cuenta · Triple D" },
      { property: "og:description", content: "Obtené tu API Key en un minuto." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { plan: initialPlan } = Route.useSearch();
  const { register, user, hydrated } = useAuth();
  const { t, plans } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState<PlanId>(initialPlan ?? "free");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && user) navigate({ to: "/app/keys" });
  }, [hydrated, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error(t("register.invalidEmail"));
    if (password.length < 8) return toast.error(t("register.minPassword"));
    setLoading(true);
    try {
      await register(email, password, plan);
      navigate({ to: "/app/keys" });
    } catch {
      toast.error(t("register.error"));
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
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-lg border-line">
          <CardHeader>
            <CardTitle className="font-display text-2xl">{t("register.title")}</CardTitle>
            <p className="text-sm text-slate">{t("register.subtitle")}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">{t("common.email")}</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("common.password")}</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
              </div>
              <div className="space-y-2">
                <Label>{t("common.plan")}</Label>
                <RadioGroup value={plan} onValueChange={(v) => setPlan(v as PlanId)}>
                  {plans.map((p) => (
                    <label
                      key={p.id}
                      htmlFor={`plan-${p.id}`}
                      className={`flex items-start gap-3 border rounded-md p-3 cursor-pointer transition ${
                        plan === p.id ? "border-signal bg-signal/5" : "border-line"
                      }`}
                    >
                      <RadioGroupItem value={p.id} id={`plan-${p.id}`} className="mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{p.name}</span>
                          <span className="font-mono text-sm">{p.price}</span>
                        </div>
                        <p className="text-xs text-slate">{p.tagline}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("register.submitting") : t("register.submit")}
              </Button>
              <p className="text-sm text-center text-slate">
                {t("register.hasAccount")}{" "}
                <Link to="/login" className="text-signal underline">{t("nav.login")}</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
