import { createFileRoute } from "@tanstack/react-router";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppEmptyTable } from "@/components/triple-d/app-empty-table";
import { AppPageHeader } from "@/components/triple-d/app-page-header";
import { DashboardFilters } from "@/components/triple-d/dashboard-filters";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/app/cuits")({
  component: CuitsPage,
});

function CuitsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-6xl">
      <AppPageHeader
        title={t("cuits.title")}
        description={t("cuits.subtitle")}
        crumbs={[{ label: t("cuits.title") }]}
      />

      <Alert className="border-signal/30 bg-signal/5">
        <AlertDescription className="text-sm">{t("cuits.banner")}</AlertDescription>
      </Alert>

      <DashboardFilters showEnvironment total={0} />

      <AppEmptyTable
        columns={[t("cuits.colCuit"), t("cuits.colLastEvent"), t("cuits.colDate")]}
        emptyMessage={t("cuits.empty")}
      />
    </div>
  );
}
