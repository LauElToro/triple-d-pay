import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeBlock } from "@/components/set-api/code-block";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/docs/quickstart")({
  component: DocsQuickstart,
});

function DocsQuickstart() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">{t("docs.quickstartTitle")}</h1>
        <p className="text-slate mt-2">{t("docs.quickstartDesc")}</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl">{t("docs.restAuthTitle")}</h2>
        <p className="text-sm text-slate">
          {t("docs.restAuthDesc")}
        </p>
        <CodeBlock
          code={`curl https://set-api-backend.vercel.app/api/arca/puntos-venta \\
  -H "Authorization: Bearer $SET_API_KEY"`}
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl">{t("docs.restIssueTitle")}</h2>
        <p className="text-sm text-slate">
          {t("docs.restIssueDesc")}
        </p>
        <CodeBlock
          code={`curl -X POST https://set-api-backend.vercel.app/api/arca/comprobantes \\
  -H "Authorization: Bearer $SET_API_KEY" \\
  -H "Idempotency-Key: factura-2026-0001" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cuit_emisor": "20111111112",
    "cbteTipo": 11,
    "ptoVta": 10,
    "concepto": 1,
    "docTipo": 99,
    "docNro": 0,
    "cbteFch": "20260814",
    "impTotal": 121,
    "impNeto": 100,
    "impIVA": 21
  }'`}
        />
        <p className="text-sm text-slate">
          {t("docs.restErrors")}
        </p>
      </section>

      <Link to="/docs" className="text-sm text-signal hover:underline">
        ← {t("docs.backToDocs")}
      </Link>
    </div>
  );
}
