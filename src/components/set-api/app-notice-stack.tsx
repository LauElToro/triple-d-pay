import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ShieldAlert, KeyRound, X, Building2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import type { ApiKeyView, InvoiceView } from "@/lib/api-types";
import { BillingAlert } from "@/components/set-api/billing-alert";
import { useTranslation } from "@/lib/i18n-context";
import { isKycBlocking } from "@/lib/kyc";

const DISMISS_KEY = "sa_notices_dismissed";

function readDismissed(): Record<string, boolean> {
  try {
    return JSON.parse(sessionStorage.getItem(DISMISS_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeDismissed(map: Record<string, boolean>) {
  try {
    sessionStorage.setItem(DISMISS_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function AppNoticeStack() {
  const { user, activeOrg, hasPermission } = useAuth();
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(readDismissed);

  const invoices = useQuery({
    queryKey: ["invoices", activeOrg?.id],
    queryFn: () => api.get<{ invoices: InvoiceView[] }>("/api/invoices"),
    enabled: Boolean(activeOrg) && hasPermission("invoices:read"),
  });

  const keys = useQuery({
    queryKey: ["keys", activeOrg?.id],
    queryFn: () => api.get<{ keys: ApiKeyView[] }>("/api/keys"),
    enabled: Boolean(activeOrg) && hasPermission("keys:read"),
  });

  const pendingInvoice = invoices.data?.invoices.find(
    (i) => i.status === "pending" || i.status === "overdue",
  );
  const suspendedKey = keys.data?.keys.find((k) => k.status === "suspended");

  const kycNeeded = isKycBlocking(user);

  const dismiss = (id: string) => {
    const next = { ...dismissed, [id]: true };
    setDismissed(next);
    writeDismissed(next);
  };

  const notices = useMemo(() => {
    const list: { id: string; node: React.ReactNode }[] = [];

    if (kycNeeded && !dismissed.kyc) {
      list.push({
        id: "kyc",
        node: (
          <Alert className="border-signal bg-signal/5 relative pr-10">
            <ShieldAlert className="h-4 w-4 text-signal" />
            <AlertTitle className="font-display">
              {user?.kycStatus === "DECLINED"
                ? t("notices.kycDeclinedTitle")
                : t("notices.kycTitle")}
            </AlertTitle>
            <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <span>
                {user?.kycStatus === "DECLINED"
                  ? t("notices.kycDeclinedDesc")
                  : t("notices.kycDesc")}
              </span>
              <Button size="sm" asChild>
                <Link to="/kyc">{t("notices.kycCta")}</Link>
              </Button>
            </AlertDescription>
            <button
              type="button"
              className="absolute top-3 right-3 text-slate hover:text-ink"
              aria-label={t("common.dismiss")}
              onClick={() => dismiss("kyc")}
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        ),
      });
    }

    if (activeOrg && !activeOrg.arcaCuit && !dismissed.cuit) {
      list.push({
        id: "cuit",
        node: (
          <Alert className="border-signal bg-signal/5 relative pr-10">
            <Building2 className="h-4 w-4 text-signal" />
            <AlertTitle className="font-display">{t("notices.cuitTitle")}</AlertTitle>
            <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <span>{t("notices.cuitDesc")}</span>
              <Button size="sm" asChild>
                <Link to="/app/settings">{t("notices.cuitCta")}</Link>
              </Button>
            </AlertDescription>
            <button
              type="button"
              className="absolute top-3 right-3 text-slate hover:text-ink"
              aria-label={t("common.dismiss")}
              onClick={() => dismiss("cuit")}
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        ),
      });
    }

    if (pendingInvoice && !dismissed[`inv-${pendingInvoice.id}`]) {
      list.push({
        id: `inv-${pendingInvoice.id}`,
        node: <BillingAlert invoice={pendingInvoice} />,
      });
    }

    if (suspendedKey && !dismissed.suspended) {
      list.push({
        id: "suspended",
        node: (
          <Alert className="border-seal bg-seal/10 relative pr-10">
            <KeyRound className="h-4 w-4 text-seal" />
            <AlertTitle className="font-display">{t("notices.keySuspendedTitle")}</AlertTitle>
            <AlertDescription className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <span>{t("notices.keySuspendedDesc")}</span>
              <Button size="sm" variant="outline" asChild>
                <Link to="/app/subscription">{t("notices.keySuspendedCta")}</Link>
              </Button>
            </AlertDescription>
            <button
              type="button"
              className="absolute top-3 right-3 text-slate hover:text-ink"
              aria-label={t("common.dismiss")}
              onClick={() => dismiss("suspended")}
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        ),
      });
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kycNeeded, dismissed, pendingInvoice, suspendedKey, activeOrg?.arcaCuit, t, user?.kycStatus]);

  if (notices.length === 0) return null;

  return (
    <div className="space-y-3 mb-6" data-tour="notices">
      {notices.map((n) => (
        <div key={n.id}>{n.node}</div>
      ))}
    </div>
  );
}
