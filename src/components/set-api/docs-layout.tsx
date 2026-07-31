import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { List } from "lucide-react";
import { PublicShell } from "./public-shell";
import { DocsSidebarExtra } from "./docs-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AUTOMATION_SLUGS,
  WEB_SERVICE_SLUGS,
  catalogKey,
  type AutomationSlug,
  type WebServiceSlug,
} from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";

function useDocsCurrentTitle() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname === "/docs" || pathname === "/docs/") return t("docs.title");
  if (pathname.startsWith("/docs/quickstart")) return t("docs.quickstart");

  const wsMatch = pathname.match(/^\/docs\/web-services\/([^/]+)\/?$/);
  if (wsMatch && WEB_SERVICE_SLUGS.includes(wsMatch[1] as WebServiceSlug)) {
    return t(catalogKey("ws", wsMatch[1], "title"));
  }

  const autoMatch = pathname.match(/^\/docs\/automations\/([^/]+)\/?$/);
  if (autoMatch && AUTOMATION_SLUGS.includes(autoMatch[1] as AutomationSlug)) {
    return t(catalogKey("auto", autoMatch[1], "title"));
  }

  return t("docs.title");
}

function DocsNav() {
  const { t } = useTranslation();

  return (
    <>
      <nav className="text-sm space-y-1">
        <div className="font-mono text-[10px] uppercase text-slate mb-2">{t("docs.title")}</div>
        <Link
          to="/docs"
          className="block rounded px-2 py-1 hover:bg-mist"
          activeOptions={{ exact: true }}
          activeProps={{ className: "bg-mist text-signal font-medium" }}
        >
          {t("docs.title")}
        </Link>
        <Link
          to="/docs/quickstart"
          className="block rounded px-2 py-1 hover:bg-mist"
          activeProps={{ className: "bg-mist text-signal font-medium" }}
        >
          {t("docs.quickstart")}
        </Link>
      </nav>
      <DocsSidebarExtra />
    </>
  );
}

export function DocsLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentTitle = useDocsCurrentTitle();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <PublicShell>
      <div className="md:hidden sticky top-16 z-20 border-b border-line bg-card/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0"
                aria-label={t("docs.openToc")}
              >
                <List className="h-4 w-4 mr-1.5" />
                {t("docs.toc")}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left font-mono text-sm">{t("docs.toc")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <DocsNav />
              </div>
            </SheetContent>
          </Sheet>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-wide text-slate">
              {t("docs.title")}
            </p>
            <p className="font-display text-sm font-semibold truncate">{currentTitle}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 md:py-10 grid md:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden md:block space-y-6 md:sticky md:top-24 md:self-start">
          <DocsNav />
        </aside>
        <article className="min-w-0">{children}</article>
      </div>
    </PublicShell>
  );
}
