import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/set-api/public-shell";
import { Button } from "@/components/ui/button";
import { CatalogCard } from "@/components/set-api/catalog-card";
import { WEB_SERVICE_SLUGS, AUTOMATION_SLUGS, catalogKey } from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";
import {
  ArrowRight,
  BookOpen,
  CircleDollarSign,
  Code2,
  KeyRound,
  Shield,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/productos/platform")({
  component: ProductoPlatform,
  head: () => ({
    meta: [
      { title: "Set-Api Platform · Set-Api" },
      {
        name: "description",
        content:
          "API REST y API Key para web services y automatizaciones ARCA desde tu stack.",
      },
    ],
  }),
});

function ProductoPlatform() {
  const { t } = useTranslation();

  const why = [
    { icon: BookOpen, title: t("landing.whyDocs"), body: t("landing.whyDocsDesc") },
    { icon: KeyRound, title: t("landing.whyAuth"), body: t("landing.whyAuthDesc") },
    { icon: Code2, title: t("landing.whyDevs"), body: t("landing.whyDevsDesc") },
  ];

  const cycles = [
    { icon: Zap, title: t("landing.cycle1Title"), body: t("landing.cycle1Body") },
    { icon: CircleDollarSign, title: t("landing.cycle2Title"), body: t("landing.cycle2Body") },
    { icon: Shield, title: t("landing.cycle3Title"), body: t("landing.cycle3Body") },
  ];

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wide text-signal mb-3">
            {t("product.platform.title")}
          </p>
          <h1 className="text-4xl font-display font-bold">{t("landing.pathPlatformHeadline")}</h1>
          <p className="text-lg text-slate mt-4">{t("product.platform.desc")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/register" search={{ plan: "free" }}>
                {t("landing.startFree")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/docs/quickstart">{t("docs.quickstart")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/docs/delegacion-arca">{t("docs.delegation")}</Link>
            </Button>
          </div>
        </div>

        <section>
          <div className="flex justify-between items-end mb-6 gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">{t("landing.automationsTitle")}</h2>
              <p className="text-sm text-slate mt-1">{t("landing.automationsSubtitle")}</p>
            </div>
            <Link to="/docs" className="text-sm text-signal hover:underline shrink-0">
              {t("landing.viewAllDocs")}
            </Link>
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

        <section>
          <div className="flex justify-between items-end mb-6 gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">{t("landing.wsTitle")}</h2>
              <p className="text-sm text-slate mt-1">{t("landing.wsSubtitle")}</p>
            </div>
            <Link to="/docs" className="text-sm text-signal hover:underline shrink-0">
              {t("landing.viewAllDocs")}
            </Link>
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
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold mb-8">{t("landing.whyTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-14">
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
        </section>
      </div>
    </PublicShell>
  );
}
