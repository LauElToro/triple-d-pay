import { createFileRoute } from "@tanstack/react-router";
import { AppPageHeader } from "@/components/set-api/app-page-header";
import { ComprobantesTable } from "@/components/set-api/comprobantes-table";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/app/comprobantes")({
  component: ComprobantesPage,
});

function ComprobantesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 w-full">
      <AppPageHeader
        title={t("comprobantes.title")}
        description={t("comprobantes.subtitle")}
        crumbs={[{ label: t("comprobantes.title") }]}
      />
      <ComprobantesTable />
    </div>
  );
}
