import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicShell } from "@/components/set-api/public-shell";
import { Button } from "@/components/ui/button";
import { TOOL_SLUGS, catalogKey, type ToolSlug } from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";
import { toast } from "sonner";

export const Route = createFileRoute("/tools/$slug")({
  beforeLoad: ({ params }) => {
    if (!TOOL_SLUGS.includes(params.slug as ToolSlug)) {
      throw notFound();
    }
  },
  component: ToolPage,
});

function ToolPage() {
  const { slug } = Route.useParams();
  const { t } = useTranslation();

  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-6 py-16 space-y-6">
        <div>
          <p className="text-xs font-mono uppercase text-signal mb-2">{t("tools.title")}</p>
          <h1 className="text-3xl font-display font-bold">
            {t(catalogKey("tool", slug, "title"))}
          </h1>
          <p className="text-slate mt-2">{t(catalogKey("tool", slug, "desc"))}</p>
        </div>
        <p className="text-sm leading-relaxed">{t(catalogKey("tool", slug, "body"))}</p>
        <p className="text-sm text-slate font-mono">{t("tools.requiresApi")}</p>
        <Button
          onClick={() => toast.info(t("tools.comingSoon"))}
        >
          {t("tools.comingSoon")}
        </Button>
        <Link to="/tools" className="block text-sm text-signal hover:underline">
          ← {t("tools.title")}
        </Link>
      </div>
    </PublicShell>
  );
}
