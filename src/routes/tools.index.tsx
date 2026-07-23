import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/triple-d/public-shell";
import { CatalogCard } from "@/components/triple-d/catalog-card";
import { TOOL_SLUGS, catalogKey } from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/tools/")({
  component: ToolsIndex,
});

function ToolsIndex() {
  const { t } = useTranslation();

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold">{t("tools.title")}</h1>
          <p className="text-slate mt-2">{t("tools.subtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {TOOL_SLUGS.map((slug) => (
            <CatalogCard
              key={slug}
              title={t(catalogKey("tool", slug, "title"))}
              description={t(catalogKey("tool", slug, "desc"))}
              to="/tools/$slug"
              params={{ slug }}
            />
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
