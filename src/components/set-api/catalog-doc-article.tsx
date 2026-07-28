import { Link } from "@tanstack/react-router";
import { CodeBlock } from "./code-block";
import { catalogKey } from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";

export function CatalogDocArticle({
  kind,
  slug,
  code,
  comment,
}: {
  kind: "ws" | "auto";
  slug: string;
  code: string;
  comment?: string;
}) {
  const { t } = useTranslation();
  const category = kind === "ws" ? t("docs.webServices") : t("docs.automations");

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase text-signal">{category}</p>
        <h1 className="text-3xl font-display font-bold">
          {t(catalogKey(kind, slug, "title"))}
        </h1>
        <p className="text-slate text-base leading-relaxed">
          {t(catalogKey(kind, slug, "desc"))}
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="font-display text-xl">{t("docs.overview")}</h2>
        <p className="text-sm leading-relaxed text-ink/90">
          {t(catalogKey(kind, slug, "body"))}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl">{t("docs.howto")}</h2>
        <p className="text-sm leading-relaxed text-ink/90">
          {t(catalogKey(kind, slug, "howto"))}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl">{t("docs.requirements")}</h2>
        <p className="text-sm leading-relaxed text-ink/90">
          {t(catalogKey(kind, slug, "requirements"))}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl">{t("docs.integration")}</h2>
        <p className="text-sm text-slate">{t("docs.integrationHint")}</p>
        <CodeBlock code={code} comment={comment} />
      </section>

      <Link to="/docs" className="inline-block text-sm text-signal hover:underline">
        ← {t("docs.backToDocs")}
      </Link>
    </div>
  );
}
