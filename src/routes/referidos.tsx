import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/set-api/public-shell";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n-context";
import { ArrowRight, BarChart3, Gift, Link2 } from "lucide-react";

export const Route = createFileRoute("/referidos")({
  component: ReferralsMarketingPage,
  head: () => ({
    meta: [
      { title: "Programa de referidos · Set-Api" },
      {
        name: "description",
        content:
          "Invitá equipos a Set-Api, compartí tu link y seguí el progreso desde el panel.",
      },
    ],
  }),
});

function ReferralsMarketingPage() {
  const { t } = useTranslation();

  const steps = [
    { icon: Gift, body: t("landing.referrals.step1") },
    { icon: Link2, body: t("landing.referrals.step2") },
    { icon: BarChart3, body: t("landing.referrals.step3") },
  ];

  const rules = [
    t("referrals.rewards.rule1"),
    t("referrals.rewards.rule2"),
    t("referrals.rewards.rule3"),
  ];

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wide text-signal mb-3">
            {t("nav.referrals")}
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            {t("landing.referrals.title")}
          </h1>
          <p className="text-lg text-slate mt-4">{t("landing.referrals.subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/register" search={{ plan: "free" }}>
                {t("landing.referrals.cta")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/app/referrals">{t("landing.referrals.panelCta")}</Link>
            </Button>
          </div>
        </div>

        <section>
          <h2 className="font-display text-2xl font-semibold mb-8">
            {t("landing.referrals.howTitle")}
          </h2>
          <ol className="grid md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, body }, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-xs text-signal mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <Icon className="h-5 w-5 text-signal mb-2" />
                  <p className="text-sm text-slate leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">
            {t("referrals.rewards.title")}
          </h2>
          <p className="text-sm text-slate mt-2 max-w-2xl">{t("referrals.rewards.subtitle")}</p>
          <ul className="mt-6 space-y-3 max-w-2xl">
            {rules.map((rule) => (
              <li key={rule} className="flex gap-3 text-sm text-slate leading-relaxed">
                <span className="text-signal font-mono shrink-0">→</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/register" search={{ plan: "free" }}>
              {t("landing.referrals.cta")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/pricing">{t("landing.referrals.ctaSecondary")}</Link>
          </Button>
        </div>
      </div>
    </PublicShell>
  );
}
