import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeBlock } from "@/components/triple-d/code-block";
import { QUICKSTART_CODE } from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <h2 className="font-display text-xl">{t("docs.install")}</h2>
        <CodeBlock code="npm i @triple-d/sdk" />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl">{t("docs.example")}</h2>
        <Tabs defaultValue="js">
          <TabsList>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
            <TabsTrigger value="php" disabled>{t("docs.comingSoonLang")} PHP</TabsTrigger>
            <TabsTrigger value="py" disabled>{t("docs.comingSoonLang")} Python</TabsTrigger>
          </TabsList>
          <TabsContent value="js" className="mt-4">
            <CodeBlock code={QUICKSTART_CODE} comment="// npm i @triple-d/sdk" />
          </TabsContent>
        </Tabs>
      </section>

      <Link to="/docs" className="text-sm text-signal hover:underline">
        ← {t("docs.backToDocs")}
      </Link>
    </div>
  );
}
