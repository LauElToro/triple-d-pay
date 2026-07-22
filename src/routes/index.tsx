import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/triple-d/site-chrome";
import { HeroComprobante } from "@/components/triple-d/hero-comprobante";
import { PlanCard } from "@/components/triple-d/plan-card";
import { PLANS } from "@/lib/mock-data";
import { ArrowRight, Zap, Shield, CircleDollarSign } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-signal border border-signal/30 bg-signal/5 rounded-full px-3 py-1 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> ARCA · AFIP · Argentina
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-ink leading-[1.05]">
            Facturación electrónica<br />
            <span className="text-signal">en 3 líneas de código.</span>
          </h1>
          <p className="mt-6 text-lg text-slate max-w-lg">
            Triple D es el SDK + API para emitir comprobantes ARCA sin pelearte
            con SOAP, certificados ni pantallas del AFIP. Integrás con tu API Key y listo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/register" search={{ plan: "free" }}>
                Empezar gratis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#planes">Ver planes</a>
            </Button>
          </div>
          <div className="mt-8 flex gap-6 text-xs font-mono text-slate uppercase tracking-wider">
            <span>· 30 días sin costo</span>
            <span>· MercadoPago</span>
            <span>· Sin tarjeta</span>
          </div>
        </div>
        <HeroComprobante />
      </section>

      {/* CICLO */}
      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Integrás la API Key", body: "Al crear tu cuenta recibís una API Key única (mostrada una sola vez). El metering arranca cuando emitís el primer comprobante." },
            { icon: CircleDollarSign, title: "Ciclo de 30 días", body: "Cada ciclo se cierra con una factura clara según tu plan: fijo o por uso. Sin sorpresas." },
            { icon: Shield, title: "15 días de gracia", body: "Si no pagás, tenés 15 días antes de que la key se suspenda. Cero cortes silenciosos." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="h-6 w-6 text-signal mb-3" />
              <h3 className="font-display text-xl mb-2">{title}</h3>
              <p className="text-sm text-slate">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold">Elegí tu plan</h2>
          <p className="text-slate mt-2">Cambiá de plan cuando quieras desde el panel.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} featured={p.id === "fixed"} />
          ))}
        </div>
      </section>

      {/* CODE */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="bg-ink text-paper rounded-md p-6 font-mono text-sm overflow-x-auto">
          <div className="text-slate mb-2">// npm i @triple-d/sdk</div>
          <pre className="whitespace-pre">
{`import { TripleD } from "@triple-d/sdk";

const td = new TripleD({ apiKey: process.env.TRIPLE_D_KEY });

await td.invoices.create({
  cuit: "30-71234567-8",
  tipo: "FC_A",
  items: [{ descripcion: "Servicio", total: 155364 }],
});`}
          </pre>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
