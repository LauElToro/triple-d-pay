import { createFileRoute } from "@tanstack/react-router";
import { AppEmptyTable } from "@/components/triple-d/app-empty-table";
import { AppPageHeader } from "@/components/triple-d/app-page-header";
import { DashboardFilters } from "@/components/triple-d/dashboard-filters";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/app/requests")({
  component: RequestsPage,
});

function RequestsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-6xl">
      <AppPageHeader
        title={t("requests.title")}
        description={t("requests.subtitle")}
        crumbs={[{ label: t("requests.title") }]}
      />

      <DashboardFilters showEnvironment total={0} />

      <AppEmptyTable
        columns={[
          t("requests.colId"),
          t("requests.colEnvironment"),
          t("requests.colWsid"),
          t("requests.colMethod"),
          t("requests.colCreated"),
        ]}
        emptyMessage={t("requests.empty")}
      />
    </div>
  );
}
