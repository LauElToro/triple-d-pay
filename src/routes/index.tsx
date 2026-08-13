import { useEffect } from "react";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/set-api/site-chrome";
import { HeroComprobante } from "@/components/set-api/hero-comprobante";
import { PlanCard } from "@/components/set-api/plan-card";
import { CatalogCard } from "@/components/set-api/catalog-card";
import { CodeBlock } from "@/components/set-api/code-block";
import {
  AUTOMATION_SLUGS,
  INTEGRATION_SLUGS,
  PLATFORM_STATS,
  QUICKSTART_CODE,
  WEB_SERVICE_SLUGS,
  catalogKey,
} from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";
import {
  ArrowRight,
  Zap,
  Shield,
  CircleDollarSign,
  BookOpen,
  KeyRound,
  Code2,
  Gift,
  Link2,
  BarChart3,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { t, plans } = useTranslation();
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  const cycles = [
    { icon: Zap, title: t("landing.cycle1Title"), body: t("landing.cycle1Body") },
    { icon: CircleDollarSign, title: t("landing.cycle2Title"), body: t("landing.cycle2Body") },
    { icon: Shield, title: t("landing.cycle3Title"), body: t("landing.cycle3Body") },
  ];

  const why = [
    { icon: BookOpen, title: t("landing.whyDocs"), body: t("landing.whyDocsDesc") },
    { icon: KeyRound, title: t("landing.whyAuth"), body: t("landing.whyAuthDesc") },
    { icon: Code2, title: t("landing.whyDevs"), body: t("landing.whyDevsDesc") },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-signal border border-signal/30 bg-signal/5 rounded-full px-3 py-1 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> {t("landing.badge")}
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-ink leading-[1.05]">
            {t("landing.connectTitle")}
          </h1>
          <p className="mt-6 text-lg text-slate max-w-lg">{t("landing.connectDesc")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/docs/automations/$slug" params={{ slug: "mis-comprobantes" }}>
                {t("landing.ctaAutomations")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/docs/web-services/$slug" params={{ slug: "facturacion-electronica" }}>
                {t("landing.ctaWebServices")}
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="secondary" size="sm">
              <Link to="/register" search={{ plan: "free" }}>
                {t("landing.startFree")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/pricing">{t("landing.viewPlans")}</Link>
            </Button>
          </div>
        </div>
        <HeroComprobante />
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl mb-2">{t("landing.statsTitle")}</h2>
          <p className="text-sm text-slate mb-8">{t("landing.statsSubtitle")}</p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <div className="text-4xl font-display font-bold text-signal">+{PLATFORM_STATS.requests}</div>
              <div className="font-medium mt-1">{t("landing.statsRequests")}</div>
              <div className="text-xs text-slate font-mono">{t("landing.statsRequestsPeriod")}</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-signal">+{PLATFORM_STATS.cuits}</div>
              <div className="font-medium mt-1">{t("landing.statsCuits")}</div>
              <div className="text-xs text-slate font-mono">{t("landing.statsCuitsPeriod")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Set-Api FACTURA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="border border-signal/30 bg-signal/5 rounded-lg p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold">{t("landing.facturaTitle")}</h2>
            <p className="text-slate mt-3">{t("landing.facturaDesc")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="text-xs font-mono uppercase bg-card border border-line rounded-full px-3 py-1">
                  {t(`landing.facturaFeature${i}`)}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6">
              <Link to="/productos/factura">{t("landing.facturaCta")}</Link>
            </Button>
          </div>
          <CodeBlock code={QUICKSTART_CODE} comment="// Set-Api Factura" />
        </div>
      </section>

      {/* AUTOMATIONS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold">{t("landing.automationsTitle")}</h2>
            <p className="text-slate mt-1">{t("landing.automationsSubtitle")}</p>
          </div>
          <Link to="/docs" className="text-sm text-signal hover:underline shrink-0">{t("landing.viewAllDocs")}</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AUTOMATION_SLUGS.slice(0, 8).map((slug) => (
            <CatalogCard
              key={slug}
              title={t(catalogKey("auto", slug, "title"))}
              description={t(catalogKey("auto", slug, "desc"))}
              to="/docs/automations/$slug"
              params={{ slug }}
            />
          ))}
        </div>
      </section>

      {/* WEB SERVICES */}
      <section className="border-t border-line bg-card mx-auto max-w-full px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold">{t("landing.wsTitle")}</h2>
              <p className="text-slate mt-1">{t("landing.wsSubtitle")}</p>
            </div>
            <Link to="/docs" className="text-sm text-signal hover:underline shrink-0">{t("landing.viewAllDocs")}</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WEB_SERVICE_SLUGS.map((slug) => (
              <CatalogCard
                key={slug}
                title={t(catalogKey("ws", slug, "title"))}
                description={t(catalogKey("ws", slug, "desc"))}
                to="/docs/web-services/$slug"
                params={{ slug }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-display font-bold">{t("landing.integrationsTitle")}</h2>
        <p className="text-slate mt-1 mb-8">{t("landing.integrationsSubtitle")}</p>
        <div className="flex flex-wrap gap-2">
          {INTEGRATION_SLUGS.map((slug) => (
            <span
              key={slug}
              className="text-xs font-mono border border-line rounded-md px-3 py-2 bg-card"
              title={t(catalogKey("integration", slug, "desc"))}
            >
              {t(catalogKey("integration", slug, "title"))}
            </span>
          ))}
        </div>
      </section>

      {/* WHY + CYCLES */}
      <section className="border-y border-line bg-mist/50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-display font-bold mb-8">{t("landing.whyTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {why.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon className="h-6 w-6 text-signal mb-3" />
                <h3 className="font-display text-lg mb-2">{title}</h3>
                <p className="text-sm text-slate">{body}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {cycles.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon className="h-6 w-6 text-signal mb-3" />
                <h3 className="font-display text-lg mb-2">{title}</h3>
                <p className="text-sm text-slate">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERIDOS */}
      <section id="referidos" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            {t("landing.referrals.title")}
          </h2>
          <p className="text-slate mt-3 text-lg">{t("landing.referrals.subtitle")}</p>
        </div>
        <ol className="mt-10 grid md:grid-cols-3 gap-8">
          {[
            { icon: Gift, body: t("landing.referrals.step1") },
            { icon: Link2, body: t("landing.referrals.step2") },
            { icon: BarChart3, body: t("landing.referrals.step3") },
          ].map(({ icon: Icon, body }, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-xs text-signal mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <Icon className="h-5 w-5 text-signal mb-2" />
                <p className="text-sm text-slate leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/register" search={{ plan: "free" }}>
              {t("landing.referrals.cta")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/pricing">{t("landing.referrals.ctaSecondary")}</Link>
          </Button>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold">{t("landing.plansTitle")}</h2>
          <p className="text-slate mt-2">{t("landing.plansSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} featured={p.id === "fixed"} />
          ))}
          <PlanCard
            plan={{
              name: t("pricing.custom.name"),
              price: t("pricing.custom.price"),
              tagline: t("pricing.custom.tagline"),
              features: [0, 1, 2, 3].map((i) => t(`pricing.custom.feature${i}`)),
              cta: t("pricing.custom.cta"),
            }}
            to="/contact"
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
