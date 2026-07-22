import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/triple-d/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
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
      toast.error("Credenciales inválidas");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/app" });
    } catch {
      toast.error("No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="p-6"><Link to="/"><LogoMark /></Link></header>
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-line">
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
              <p className="text-sm text-center text-slate">
                ¿No tenés cuenta? <Link to="/register" className="text-signal underline">Crear cuenta</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
