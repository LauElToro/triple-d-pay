import { createFileRoute, Link } from "@tanstack/react-router";
import { CatalogCard } from "@/components/set-api/catalog-card";
import {
  AUTOMATION_SLUGS,
  WEB_SERVICE_SLUGS,
  catalogKey,
} from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/docs/")({
  component: DocsIndex,
});

function DocsIndex() {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-display font-bold">{t("docs.title")}</h1>
        <p className="text-slate mt-2">{t("docs.subtitle")}</p>
      </div>

      <Link
        to="/docs/quickstart"
        className="inline-flex items-center gap-2 text-signal font-medium hover:underline"
      >
        {t("docs.quickstart")} <ArrowRight className="h-4 w-4" />
      </Link>

      <Link
        to="/docs/delegacion-arca"
        className="block rounded-lg border border-line bg-card p-5 hover:border-signal/40 transition-colors"
      >
        <h2 className="font-display text-xl">{t("docs.delegation")}</h2>
        <p className="text-sm text-slate mt-2">{t("docs.delegationDesc")}</p>
        <span className="inline-flex items-center gap-1 text-sm text-signal mt-3">
          {t("docs.delegationCta")} <ArrowRight className="h-4 w-4" />
        </span>
      </Link>

      <section className="rounded-lg border border-signal/30 bg-signal/5 p-5 space-y-2">
        <h2 className="font-display text-xl">Integración REST</h2>
        <p className="text-sm text-slate">
          El contrato público usa API Keys con permisos y CUITs autorizados. Las
          emisiones requieren idempotencia y deben ejecutarse desde tu servidor.
        </p>
        <p className="text-sm text-slate">
          Consultá también los códigos de error, límites, rotación de keys y
          reconciliación de timeouts en el quickstart.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl mb-4">{t("docs.webServices")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {WEB_SERVICE_SLUGS.slice(0, 6).map((slug) => (
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
        <h2 className="font-display text-xl mb-4">{t("docs.automations")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {AUTOMATION_SLUGS.slice(0, 6).map((slug) => (
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
    </div>
  );
}
