import { useEffect } from "react";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/set-api/site-chrome";
import { HeroComprobante } from "@/components/set-api/hero-comprobante";
import { PlanCard } from "@/components/set-api/plan-card";
import { PLATFORM_STATS } from "@/content/catalog";
import { LANDING_PARTNERS } from "@/content/partners";
import { useTranslation } from "@/lib/i18n-context";
import { ArrowRight } from "lucide-react";

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

      {/* PRODUCT PATHS */}
      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl mb-2">{t("landing.pathsTitle")}</h2>
          <p className="text-sm text-slate mb-8 max-w-2xl">{t("landing.pathsSubtitle")}</p>
          <div className="grid md:grid-cols-2 gap-4 items-stretch">
            <Link
              to="/productos/platform"
              className="group flex h-full flex-col border border-line bg-paper rounded-md p-6 hover:border-signal/40 transition-colors"
            >
              <p className="text-xs font-mono uppercase tracking-wide text-signal mb-2">
                {t("product.platform.title")}
              </p>
              <h3 className="font-display text-xl font-semibold text-ink group-hover:text-signal transition-colors">
                {t("landing.pathPlatformHeadline")}
              </h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">{t("product.platform.desc")}</p>
              <span className="mt-auto pt-4 inline-flex items-center text-sm text-signal">
                {t("landing.pathPlatformCta")} <ArrowRight className="ml-1.5 h-4 w-4" />
              </span>
            </Link>
            <Link
              to="/productos/factura"
              className="group flex h-full flex-col border border-line bg-paper rounded-md p-6 hover:border-signal/40 transition-colors"
            >
              <p className="text-xs font-mono uppercase tracking-wide text-signal mb-2">
                {t("product.factura.title")}
              </p>
              <h3 className="font-display text-xl font-semibold text-ink group-hover:text-signal transition-colors">
                {t("landing.pathFacturaHeadline")}
              </h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">{t("product.factura.desc")}</p>
              <span className="mt-auto pt-4 inline-flex items-center text-sm text-signal">
                {t("landing.pathFacturaCta")} <ArrowRight className="ml-1.5 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
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
      </section>

      {/* PLANES */}
      <section id="planes" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold">{t("landing.plansTitle")}</h2>
          <p className="text-slate mt-2">{t("landing.plansSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
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

      {/* PARTNERS */}
      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl mb-2">{t("landing.partners.title")}</h2>
          <p className="text-sm text-slate mb-8">{t("landing.partners.subtitle")}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 items-center justify-items-center">
            {LANDING_PARTNERS.map((partner) => (
              <li key={partner.id} className="flex items-center justify-center w-full">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className={`${partner.className} object-contain`}
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
