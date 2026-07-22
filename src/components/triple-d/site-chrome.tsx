import { Link } from "@tanstack/react-router";
import { LogoMark } from "./logo";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-card/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/"><LogoMark /></Link>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link to="/login">Entrar</Link></Button>
          <Button asChild size="sm"><Link to="/register">Crear cuenta</Link></Button>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate">
        <LogoMark className="text-ink" />
        <p className="font-mono text-xs">
          Facturación electrónica ARCA · SDK + API para desarrolladores
        </p>
      </div>
    </footer>
  );
}
