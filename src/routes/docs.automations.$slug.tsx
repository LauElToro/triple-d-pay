import { createFileRoute, notFound } from "@tanstack/react-router";
import { CatalogDocArticle } from "@/components/set-api/catalog-doc-article";
import {
  AUTOMATION_SLUGS,
  AUTOMATION_SAMPLE_CODE,
  type AutomationSlug,
} from "@/content/catalog";

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
  const code = AUTOMATION_SAMPLE_CODE.replace("mis-comprobantes", slug);

  return (
    <CatalogDocArticle
      kind="auto"
      slug={slug}
      code={code}
      comment={`// automatización: ${slug}`}
    />
  );
}
