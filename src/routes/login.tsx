import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/triple-d/logo";
import { GoogleButton } from "@/components/triple-d/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar · Triple D" },
      { name: "description", content: "Accedé a tu panel de facturación electrónica Triple D." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, loginWithGoogle, verifyTwoFactor, user, hydrated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [twofa, setTwofa] = useState<{ pendingToken: string; method: string } | null>(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (hydrated && user) navigate({ to: "/app" });
  }, [hydrated, user, navigate]);

  const handleOutcome = async (outcome: Awaited<ReturnType<typeof login>>) => {
    if (outcome.status === "twofa_required") {
      setTwofa({ pendingToken: outcome.pendingToken, method: outcome.method });
      toast.info(
        outcome.method === "email"
          ? "Te enviamos un código por email"
          : "Ingresá el código de tu app de autenticación"
      );
    } else {
      navigate({ to: "/app" });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleOutcome(await login(email, password));
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async (credential: string) => {
    setLoading(true);
    try {
      await handleOutcome(await loginWithGoogle(credential));
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "No se pudo iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  const submitTwoFactor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!twofa) return;
    setLoading(true);
    try {
      await verifyTwoFactor(twofa.pendingToken, code.trim());
      navigate({ to: "/app" });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="p-6">
        <Link to="/"><LogoMark /></Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-line">
          {!twofa ? (
            <>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Entrar</CardTitle>
                <p className="text-sm text-slate">Con tu cuenta Triple D.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Entrando…" : "Entrar"}
                  </Button>
                </form>
                <div className="my-4 flex items-center gap-3 text-xs text-slate">
                  <div className="h-px flex-1 bg-line" /> o <div className="h-px flex-1 bg-line" />
                </div>
                <GoogleButton onCredential={onGoogle} />
                <p className="text-sm text-center text-slate mt-4">
                  ¿No tenés cuenta? <Link to="/register" className="text-signal underline">Crear cuenta</Link>
                </p>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Verificación en dos pasos</CardTitle>
                <p className="text-sm text-slate">
                  {twofa.method === "email" ? "Ingresá el código que enviamos a tu email." : "Ingresá el código de tu app."}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitTwoFactor} className="space-y-4">
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
                    onClick={() => { setTwofa(null); setCode(""); }}
                  >
                    Volver
                  </button>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
