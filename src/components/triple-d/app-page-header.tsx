import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n-context";

export function AppPageHeader({
  title,
  description,
  crumbs,
}: {
  title: string;
  description?: string;
  crumbs?: { label: string; to?: string }[];
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-1">
      <nav className="flex items-center gap-1 text-xs text-slate font-mono">
        <Link to="/app" className="hover:text-ink transition-colors">
          {t("breadcrumb.dashboard")}
        </Link>
        {(crumbs ?? [{ label: title }]).map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 opacity-50" />
            {crumb.to ? (
              <Link to={crumb.to} className="hover:text-ink transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
      <h1 className="text-3xl font-display font-bold pt-2">{title}</h1>
      {description && <p className="text-sm text-slate max-w-2xl">{description}</p>}
    </div>
  );
}
