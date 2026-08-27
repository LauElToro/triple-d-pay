import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/set-api/public-shell";
import { LegalDocument } from "@/components/set-api/legal-document";
import { getPrivacyDoc } from "@/content/legal";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacidad · Set-Api" },
      {
        name: "description",
        content:
          "Política de privacidad de Set-Api: datos de cuenta, operación, terceros e inteligencia artificial.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { locale } = useTranslation();
  return (
    <PublicShell>
      <LegalDocument doc={getPrivacyDoc(locale)} />
    </PublicShell>
  );
}
