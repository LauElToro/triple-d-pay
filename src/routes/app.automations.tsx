import { createFileRoute } from "@tanstack/react-router";
import { AppEmptyTable } from "@/components/set-api/app-empty-table";
import { AppPageHeader } from "@/components/set-api/app-page-header";
import { DashboardFilters } from "@/components/set-api/dashboard-filters";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/app/automations")({
  component: AutomationsPage,
});

function AutomationsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-6xl">
      <AppPageHeader
        title={t("automationsPage.title")}
        description={t("automationsPage.subtitle")}
        crumbs={[{ label: t("automationsPage.title") }]}
      />

      <DashboardFilters total={0} />

      <AppEmptyTable
        columns={[
          t("automationsPage.colId"),
          t("automationsPage.colName"),
          t("automationsPage.colStatus"),
          t("automationsPage.colCreated"),
          t("automationsPage.colExpires"),
          t("automationsPage.colActions"),
        ]}
        emptyMessage={t("automationsPage.empty")}
      />
    </div>
  );
}
