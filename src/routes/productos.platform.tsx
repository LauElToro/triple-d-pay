import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/triple-d/public-shell";
import { Button } from "@/components/ui/button";
import { CatalogCard } from "@/components/triple-d/catalog-card";
import { WEB_SERVICE_SLUGS, AUTOMATION_SLUGS, catalogKey } from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/productos/platform")({
  component: ProductoPlatform,
});

function ProductoPlatform() {
  const { t } = useTranslation();

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-display font-bold">{t("product.platform.title")}</h1>
          <p className="text-lg text-slate mt-4">{t("product.platform.desc")}</p>
          <Button asChild className="mt-6">
            <Link to="/register" search={{ plan: "free" }}>
              {t("landing.startFree")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <section>
          <h2 className="font-display text-xl mb-4">{t("landing.wsTitle")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WEB_SERVICE_SLUGS.slice(0, 3).map((slug) => (
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
          <h2 className="font-display text-xl mb-4">{t("landing.automationsTitle")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUTOMATION_SLUGS.slice(0, 3).map((slug) => (
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
    </PublicShell>
  );
}
