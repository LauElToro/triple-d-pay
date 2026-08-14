import { createFileRoute, notFound } from "@tanstack/react-router";
import { CatalogDocArticle } from "@/components/set-api/catalog-doc-article";
import {
  WEB_SERVICE_SLUGS,
  QUICKSTART_CODE,
  type WebServiceSlug,
} from "@/content/catalog";

export const Route = createFileRoute("/docs/web-services/$slug")({
  beforeLoad: ({ params }) => {
    if (!WEB_SERVICE_SLUGS.includes(params.slug as WebServiceSlug)) {
      throw notFound();
    }
  },
  component: WebServiceDoc,
});

function WebServiceDoc() {
  const { slug } = Route.useParams();

  return (
    <CatalogDocArticle
      kind="ws"
      slug={slug}
      code={QUICKSTART_CODE}
      comment="// Ejemplo REST contra Backend"
    />
  );
}
