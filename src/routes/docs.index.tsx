import { createFileRoute, Link } from "@tanstack/react-router";
import { CatalogCard } from "@/components/triple-d/catalog-card";
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
