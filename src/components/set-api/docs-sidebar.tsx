import { Link } from "@tanstack/react-router";
import {
  AUTOMATION_SLUGS,
  WEB_SERVICE_SLUGS,
  catalogKey,
} from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";

export function DocsSidebarExtra() {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className="font-mono text-[10px] uppercase text-slate mb-2">
          {t("docs.webServices")}
        </div>
        <ul className="space-y-0.5">
          {WEB_SERVICE_SLUGS.map((slug) => (
            <li key={slug}>
              <Link
                to="/docs/web-services/$slug"
                params={{ slug }}
                className="block rounded px-2 py-1.5 text-xs leading-snug hover:bg-mist"
                activeProps={{ className: "bg-mist text-signal font-medium" }}
              >
                {t(catalogKey("ws", slug, "title"))}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase text-slate mb-2">
          {t("docs.automations")}
        </div>
        <ul className="space-y-0.5">
          {AUTOMATION_SLUGS.map((slug) => (
            <li key={slug}>
              <Link
                to="/docs/automations/$slug"
                params={{ slug }}
                className="block rounded px-2 py-1.5 text-xs leading-snug hover:bg-mist"
                activeProps={{ className: "bg-mist text-signal font-medium" }}
              >
                {t(catalogKey("auto", slug, "title"))}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
