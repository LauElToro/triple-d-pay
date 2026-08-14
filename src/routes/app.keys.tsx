import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyField } from "@/components/set-api/copy-field";
import { CodeBlock } from "@/components/set-api/code-block";
import { KeyStatusBadge } from "@/components/set-api/key-status-badge";
import { AppPageHeader } from "@/components/set-api/app-page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { KeyRound, AlertTriangle, RefreshCw, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";
import type { ApiKeyView, CreateKeyResponse } from "@/lib/api-types";
import { formatDate } from "@/lib/format";
import { useTranslation } from "@/lib/i18n-context";
import { isKycBlocking } from "@/lib/kyc";
import { toast } from "sonner";

export const Route = createFileRoute("/app/keys")({
  component: KeysPage,
});

function KeysPage() {
  const { issuedKey, clearIssuedKey, setIssuedKey, activeOrg, hasPermission, user } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const canWrite = hasPermission("keys:write");
  const canRead = hasPermission("keys:read");
  const kycOk = !isKycBlocking(user);

  const keys = useQuery({
    queryKey: ["keys", activeOrg?.id],
    queryFn: () => api.get<{ keys: ApiKeyView[] }>("/api/keys"),
    enabled: Boolean(activeOrg) && canRead,
  });

  const create = useMutation({
    mutationFn: () => api.post<CreateKeyResponse>("/api/keys", { name: "default" }),
    onSuccess: (res) => {
      setIssuedKey(res.plaintext);
      qc.invalidateQueries({ queryKey: ["keys"] });
      toast.success(t("keys.created"));
    },
    onError: (err) => {
      toast.error(err instanceof ApiError ? err.message : t("keys.createError"));
    },
  });

  const rotate = useMutation({
    mutationFn: (id: string) => api.post<CreateKeyResponse>(`/api/keys/${id}/rotate`),
    onSuccess: (res) => {
      setIssuedKey(res.plaintext);
      qc.invalidateQueries({ queryKey: ["keys"] });
      toast.success(t("keys.rotated"));
    },
    onError: (err) => {
      toast.error(err instanceof ApiError ? err.message : t("keys.rotateError"));
    },
  });

  const revoke = useMutation({
    mutationFn: (id: string) => api.del(`/api/keys/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["keys"] });
      toast.success(t("keys.revoked"));
    },
    onError: (err) => {
      toast.error(err instanceof ApiError ? err.message : t("keys.revokeError"));
    },
  });

  const list = keys.data?.keys ?? [];
  const activeKey = list.find((k) => k.status === "active") ?? list[0] ?? null;

  return (
    <div className="space-y-6 w-full">
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

      {canWrite && (
        <div className="flex flex-wrap gap-2" data-tour="keys-create">
          <Button
            onClick={() => create.mutate()}
            disabled={create.isPending || !kycOk}
            title={!kycOk ? t("keys.kycRequired") : undefined}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("keys.create")}
          </Button>
          {!kycOk && (
            <p className="text-sm text-slate self-center">{t("keys.kycRequired")}</p>
          )}
        </div>
      )}

      {keys.isLoading ? (
        <p className="text-sm text-slate font-mono">{t("common.loading")}</p>
      ) : keys.isError ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex items-center gap-3">
            <span>{keys.error instanceof ApiError ? keys.error.message : t("keys.createError")}</span>
            <Button size="sm" variant="outline" onClick={() => keys.refetch()}>
              {t("common.retry")}
            </Button>
          </AlertDescription>
        </Alert>
      ) : !activeKey ? (
        <Card className="border-line">
          <CardContent className="py-8 text-sm text-slate">{t("keys.empty")}</CardContent>
        </Card>
      ) : (
        list.map((key) => (
          <Card key={key.id} className="border-line">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 font-display">
                <KeyRound className="h-5 w-5" /> {key.name || t("keys.current")}
              </CardTitle>
              <KeyStatusBadge status={key.status} />
            </CardHeader>
            <CardContent className="space-y-4">
              <CopyField value={key.prefix} masked label={t("keys.prefix")} />
              <div className="space-y-1 text-sm">
                <div className="text-xs text-slate uppercase tracking-wider font-mono">Alcance</div>
                <p className="text-slate">
                  {key.permissions?.join(", ") || "Permisos heredados"}
                  {key.cuits?.length ? ` · CUITs: ${key.cuits.join(", ")}` : ""}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm" data-tour="keys-prefix">
                <div>
                  <div className="text-xs text-slate uppercase tracking-wider font-mono">{t("keys.usageSince")}</div>
                  <div className="font-mono">{formatDate(key.usageStartedAt)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate uppercase tracking-wider font-mono">{t("keys.cycleEnds")}</div>
                  <div className="font-mono">{formatDate(key.cycleEndsAt)}</div>
                </div>
              </div>
              {canWrite && key.status !== "revoked" && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={rotate.isPending}
                    onClick={() => {
                      if (confirm(t("keys.confirmRotate"))) rotate.mutate(key.id);
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {t("dashboard.accessToken.renew")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={revoke.isPending}
                    onClick={() => {
                      if (confirm(t("keys.confirmRevoke"))) revoke.mutate(key.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t("keys.revoke")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      <Card className="border-line">
        <CardHeader>
          <CardTitle className="font-display">{t("keys.restTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            comment="// Ejecutá desde tu servidor"
            code={`curl -X POST https://set-api-backend.vercel.app/api/arca/comprobantes \\
  -H "Authorization: Bearer $SET_API_KEY" \\
  -H "Idempotency-Key: invoice-unique-id" \\
  -H "Content-Type: application/json" \\
  -d '{"cuit_emisor":"20111111112","cbteTipo":11,"ptoVta":10,"concepto":1,"docTipo":99,"docNro":0,"cbteFch":"20260814","impTotal":121,"impNeto":100,"impIVA":21}'`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
