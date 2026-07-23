import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyField } from "@/components/triple-d/copy-field";
import { KeyStatusBadge } from "@/components/triple-d/key-status-badge";
import { AppPageHeader } from "@/components/triple-d/app-page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { KeyRound, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { MOCK_KEY } from "@/lib/mock-data";

export const Route = createFileRoute("/app/keys")({
  component: KeysPage,
});

function KeysPage() {
  const { issuedKey, clearIssuedKey } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-4xl">
      <AppPageHeader
        title={t("keys.title")}
        description={t("keys.subtitle")}
        crumbs={[{ label: t("keys.title") }]}
      />

      {issuedKey && (
        <Alert className="border-signal bg-signal/5">
          <AlertTriangle className="h-4 w-4 text-signal" />
          <AlertTitle className="font-display">{t("keys.alertTitle")}</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>{t("keys.alertDesc")}</p>
            <CopyField value={issuedKey} label={t("keys.fullKey")} />
            <Button size="sm" onClick={clearIssuedKey}>{t("keys.saved")}</Button>
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-line">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-display">
            <KeyRound className="h-5 w-5" /> {t("keys.current")}
          </CardTitle>
          <KeyStatusBadge status={MOCK_KEY.status} />
        </CardHeader>
        <CardContent className="space-y-4">
          <CopyField value={MOCK_KEY.prefix} masked label={t("keys.prefix")} />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-slate uppercase tracking-wider font-mono">{t("keys.usageSince")}</div>
              <div className="font-mono">{MOCK_KEY.usageStartedAt}</div>
            </div>
            <div>
              <div className="text-xs text-slate uppercase tracking-wider font-mono">{t("keys.cycleEnds")}</div>
              <div className="font-mono">{MOCK_KEY.cycleEndsAt}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-line">
        <CardHeader>
          <CardTitle className="font-display">{t("keys.sdkTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-ink text-paper rounded-md p-4 text-sm font-mono overflow-x-auto">
{`import { TripleD } from "@triple-d/sdk";

const td = new TripleD({
  apiKey: process.env.TRIPLE_D_KEY, // tu API Key
});

const inv = await td.invoices.create({ /* ... */ });`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
