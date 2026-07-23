import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CodeBlock } from "@/components/triple-d/code-block";
import {
  AUTOMATION_SLUGS,
  AUTOMATION_SAMPLE_CODE,
  catalogKey,
  type AutomationSlug,
} from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/docs/automations/$slug")({
  beforeLoad: ({ params }) => {
    if (!AUTOMATION_SLUGS.includes(params.slug as AutomationSlug)) {
      throw notFound();
    }
  },
  component: AutomationDoc,
});

function AutomationDoc() {
  const { slug } = Route.useParams();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-mono uppercase text-signal mb-2">{t("docs.automations")}</p>
        <h1 className="text-3xl font-display font-bold">
          {t(catalogKey("auto", slug, "title"))}
        </h1>
        <p className="text-slate mt-2">{t(catalogKey("auto", slug, "desc"))}</p>
      </div>
      <p className="text-sm leading-relaxed">{t(catalogKey("auto", slug, "body"))}</p>
      <CodeBlock code={AUTOMATION_SAMPLE_CODE} comment={`// automatización: ${slug}`} />
      <Link to="/docs" className="text-sm text-signal hover:underline">
        ← {t("docs.backToDocs")}
      </Link>
    </div>
  );
}
