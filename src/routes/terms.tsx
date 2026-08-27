import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/set-api/public-shell";
import { LegalDocument } from "@/components/set-api/legal-document";
import { getTermsDoc } from "@/content/legal";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones · Set-Api" },
      {
        name: "description",
        content:
          "Términos de uso de Set-Api, incluyendo planes, ARCA y cláusulas de inteligencia artificial.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { locale } = useTranslation();
  return (
    <PublicShell>
      <LegalDocument doc={getTermsDoc(locale)} />
    </PublicShell>
  );
}
