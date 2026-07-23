import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyStatusBadge } from "@/components/triple-d/key-status-badge";
import { useTranslation } from "@/lib/i18n-context";
import { toast } from "sonner";

export function AccessTokenCard({
  prefix,
  status,
}: {
  prefix: string;
  status: "active" | "suspended";
}) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const masked = `${prefix}${"•".repeat(24)}`;
  const display = visible ? `${prefix}${"x".repeat(24)}` : masked;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${prefix}_demo_token_placeholder`);
      setCopied(true);
      toast.success(t("common.copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("common.copyError"));
    }
  };

  const renew = () => toast.info(t("dashboard.accessToken.renewSoon"));

  return (
    <Card className="border-line">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <CardTitle className="font-display text-lg">{t("dashboard.accessToken.title")}</CardTitle>
          <p className="text-sm text-slate mt-1">{t("dashboard.accessToken.desc")}</p>
        </div>
        <KeyStatusBadge status={status} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 bg-mist border border-line rounded-md px-3 py-2.5">
          <code className="flex-1 text-sm font-mono truncate">{display}</code>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? t("dashboard.accessToken.hide") : t("dashboard.accessToken.show")}
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={copy} aria-label={t("common.copy")}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant="outline" onClick={renew}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("dashboard.accessToken.renew")}
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link to="/app/keys">{t("dashboard.accessToken.manage")}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
