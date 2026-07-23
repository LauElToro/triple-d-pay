import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { LogoMark } from "@/components/triple-d/logo";
import { GoogleButton } from "@/components/triple-d/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/auth-context";
import { PLANS } from "@/lib/mock-data";
import type { PlanId } from "@/lib/api-types";
import { ApiError } from "@/lib/api";
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
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { plan: initialPlan } = Route.useSearch();
  const { register, verifyEmail, loginWithGoogle, user, hydrated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState<PlanId>(initialPlan ?? "free");
  const [loading, setLoading] = useState(false);

  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (hydrated && user) navigate({ to: "/app" });
  }, [hydrated, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Email inválido");
    if (password.length < 8) return toast.error("Mínimo 8 caracteres");
    setLoading(true);
    try {
      const res = await register({ email, password, name: name || undefined, plan });
      setPendingEmail(res.email);
      toast.success("Te enviamos un código de verificación por email");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  const submitVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingEmail) return;
    setLoading(true);
    try {
      await verifyEmail(pendingEmail, code.trim());
      // New accounts must complete KYC before using the platform.
      navigate({ to: "/kyc" });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async (credential: string) => {
    setLoading(true);
    try {
      await loginWithGoogle(credential);
      navigate({ to: "/kyc" });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "No se pudo registrar con Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="p-6">
        <Link to="/"><LogoMark /></Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-lg border-line">
          {!pendingEmail ? (
            <>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Crear cuenta</CardTitle>
                <p className="text-sm text-slate">Elegí tu plan. Podés cambiarlo después.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={submit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                  </div>
                  <div className="space-y-2">
                    <Label>Plan</Label>
                    <RadioGroup value={plan} onValueChange={(v) => setPlan(v as PlanId)}>
                      {PLANS.map((p) => (
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
                    {loading ? "Creando…" : "Crear cuenta"}
                  </Button>
                </form>
                <div className="my-4 flex items-center gap-3 text-xs text-slate">
                  <div className="h-px flex-1 bg-line" /> o <div className="h-px flex-1 bg-line" />
                </div>
                <GoogleButton onCredential={onGoogle} />
                <p className="text-sm text-center text-slate mt-4">
                  ¿Ya tenés cuenta? <Link to="/login" className="text-signal underline">Entrar</Link>
                </p>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Verificá tu email</CardTitle>
                <p className="text-sm text-slate">Ingresá el código que enviamos a {pendingEmail}.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitVerify} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input
                      id="code"
                      inputMode="numeric"
                      autoFocus
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      maxLength={6}
                      className="font-mono tracking-widest text-center text-lg"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verificando…" : "Confirmar y continuar"}
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
