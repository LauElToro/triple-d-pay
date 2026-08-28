import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPageHeader } from "@/components/set-api/app-page-header";
import { CopyField } from "@/components/set-api/copy-field";
import { StatChip } from "@/components/set-api/stat-chip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import type { ReferralOverview } from "@/lib/api-types";
import { formatARS } from "@/lib/format";
import { buildReferralUrl, referralCodeFromUserId } from "@/lib/referrals";
import { useTranslation } from "@/lib/i18n-context";

export const Route = createFileRoute("/app/referrals")({
  component: ReferralsPage,
});

function ReferralsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const overview = useQuery({
    queryKey: ["referrals", user?.id],
    queryFn: () => api.get<ReferralOverview>("/api/referrals"),
    enabled: Boolean(user?.id),
  });

  const code =
    overview.data?.code ?? (user?.id ? referralCodeFromUserId(user.id) : "--------");
  const link = user?.id ? buildReferralUrl(code) : "";
  const stats = overview.data?.stats ?? { total: 0, month: 0, pending: 0, converted: 0 };
  const rewards = overview.data?.rewards ?? {
    earnedTotal: 0,
    earnedMonth: 0,
    pending: 0,
    available: 0,
  };

  return (
    <div className="space-y-6 w-full">
      <AppPageHeader
        title={t("referrals.title")}
        description={t("referrals.subtitle")}
        crumbs={[{ label: t("referrals.title") }]}
      />

      <Card className="border-line max-w-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-lg">{t("referrals.linkLabel")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {link ? (
            <CopyField value={link} />
          ) : (
            <p className="text-sm text-slate font-mono">{t("common.loading")}</p>
          )}
          <CopyField value={code} label={t("referrals.codeLabel")} />
          <p className="text-xs text-slate">{t("referrals.statsHint")}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatChip label={t("referrals.stats.total")} value={stats.total} />
        <StatChip label={t("referrals.stats.month")} value={stats.month} />
        <StatChip label={t("referrals.stats.pending")} value={stats.pending} />
        <StatChip label={t("referrals.stats.converted")} value={stats.converted} />
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold">{t("referrals.rewards.title")}</h2>
          <p className="text-sm text-slate mt-1 max-w-2xl">{t("referrals.rewards.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatChip
            label={t("referrals.rewards.earned")}
            value={formatARS(rewards.earnedTotal)}
          />
          <StatChip
            label={t("referrals.rewards.month")}
            value={formatARS(rewards.earnedMonth)}
          />
          <StatChip
            label={t("referrals.rewards.pending")}
            value={formatARS(rewards.pending)}
          />
          <StatChip
            label={t("referrals.rewards.available")}
            value={formatARS(rewards.available)}
          />
        </div>
        <ul className="space-y-2 text-sm text-slate max-w-2xl">
          <li className="flex gap-2">
            <span className="text-signal font-mono shrink-0">01</span>
            {t("referrals.rewards.rule1")}
          </li>
          <li className="flex gap-2">
            <span className="text-signal font-mono shrink-0">02</span>
            {t("referrals.rewards.rule2")}
          </li>
          <li className="flex gap-2">
            <span className="text-signal font-mono shrink-0">03</span>
            {t("referrals.rewards.rule3")}
          </li>
        </ul>
      </section>
    </div>
  );
}
