import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PublicShell } from "./public-shell";
import { useTranslation } from "@/lib/i18n-context";

export function DocsLayout({
  children,
  aside,
}: {
  children: ReactNode;
  aside?: ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-[220px_1fr] gap-10">
        <aside className="md:sticky md:top-24 md:self-start space-y-4">
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
          {aside}
        </aside>
        <article className="min-w-0">{children}</article>
      </div>
    </PublicShell>
  );
}
