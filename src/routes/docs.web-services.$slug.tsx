import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CodeBlock } from "@/components/set-api/code-block";
import {
  WEB_SERVICE_SLUGS,
  QUICKSTART_CODE,
  catalogKey,
  type WebServiceSlug,
} from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";

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
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-mono uppercase text-signal mb-2">{t("docs.webServices")}</p>
        <h1 className="text-3xl font-display font-bold">
          {t(catalogKey("ws", slug, "title"))}
        </h1>
        <p className="text-slate mt-2">{t(catalogKey("ws", slug, "desc"))}</p>
      </div>
      <p className="text-sm leading-relaxed">{t(catalogKey("ws", slug, "body"))}</p>
      <CodeBlock code={QUICKSTART_CODE} comment="// Ejemplo con @set-api/sdk" />
      <Link to="/docs" className="text-sm text-signal hover:underline">
        ← {t("docs.backToDocs")}
      </Link>
    </div>
  );
}
