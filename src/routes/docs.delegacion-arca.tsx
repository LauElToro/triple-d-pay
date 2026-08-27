import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  getDelegationGuide,
  type GuideStep,
} from "@/content/delegacion-arca";
import { useTranslation } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/docs/delegacion-arca")({
  head: () => ({
    meta: [
      { title: "Delegación ARCA · Set-Api" },
      {
        name: "description",
        content:
          "Guía detallada de delegación de Web Services ARCA: pasos del cliente y de Set-Api, con datos de ejemplo.",
      },
    ],
  }),
  component: DelegationGuidePage,
});

function Callout({
  variant = "signal",
  title,
  children,
}: {
  variant?: "signal" | "warn" | "mist";
  title?: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "rounded-md border p-4 space-y-2 text-sm leading-relaxed",
        variant === "signal" && "border-signal/30 bg-signal/5 text-slate",
        variant === "warn" && "border-seal/30 bg-seal/5 text-ink",
        variant === "mist" && "border-line bg-mist text-slate",
      )}
    >
      {title && <p className="font-medium text-ink">{title}</p>}
      {variant === "warn" && !title && (
        <p className="font-medium text-ink">{t("docs.delegation.attention")}</p>
      )}
      {children}
    </div>
  );
}

function StepCard({ step, index }: { step: GuideStep; index: number }) {
  return (
    <div className="border border-line rounded-md bg-card overflow-hidden">
      <div className="flex items-start gap-3 border-b border-line px-4 py-3 bg-mist/40">
        <span className="font-mono text-xs text-signal shrink-0 mt-0.5">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-base font-semibold text-ink leading-snug">{step.title}</h3>
      </div>
      <div className="px-4 py-4 space-y-3">
        {step.lead && <p className="text-sm text-ink/90 leading-relaxed">{step.lead}</p>}
        {step.paragraphs?.map((p, i) => (
          <p key={i} className="text-sm text-slate leading-relaxed">
            {p}
          </p>
        ))}
        {step.bullets && step.bullets.length > 0 && (
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate leading-relaxed">
            {step.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ol>
        )}
        {step.table && (
          <div className="overflow-x-auto border border-line rounded-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-mist/60 text-left">
                  {step.table.headers.map((h) => (
                    <th key={h} className="px-3 py-2 font-mono text-[11px] uppercase text-slate font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.table.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-line">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-slate align-top">
                        {ci === row.length - 1 && step.table!.headers.length > 2 ? (
                          <code className="font-mono text-xs text-ink">{cell}</code>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {step.note && (
          <Callout variant="mist">
            <p>{step.note}</p>
          </Callout>
        )}
        {step.warn && (
          <Callout variant="warn">
            <p>{step.warn}</p>
          </Callout>
        )}
      </div>
    </div>
  );
}

function DelegationGuidePage() {
  const { t, locale } = useTranslation();
  const g = getDelegationGuide(locale);

  return (
    <article className="space-y-12 pb-8">
      <header className="space-y-3 max-w-3xl">
        <p className="text-xs font-mono uppercase tracking-wide text-signal">{g.eyebrow}</p>
        <h1 className="text-3xl md:text-4xl font-display font-bold">{g.title}</h1>
        <p className="text-slate text-base leading-relaxed">{g.subtitle}</p>
        <p className="text-xs font-mono text-slate">{g.updated}</p>
        <Callout variant="signal">
          <p className="font-mono text-xs uppercase tracking-wide text-signal mb-1">Ejemplo</p>
          <p>{g.exampleBadge}</p>
        </Callout>
      </header>

      <section className="space-y-4 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">{g.importantTitle}</h2>
        <ul className="space-y-3">
          {g.important.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate leading-relaxed">
              <span className="text-signal font-mono text-xs shrink-0 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">{g.orderTitle}</h2>
        <ol className="space-y-3">
          {g.order.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 border border-line rounded-md px-4 py-3 bg-card text-sm text-slate leading-relaxed"
            >
              <span className="font-mono text-signal text-xs shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <h2 className="font-display text-2xl font-semibold">{g.exchangeTitle}</h2>
          <p className="text-sm text-slate leading-relaxed">{g.exchangeIntro}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-line rounded-md p-5 space-y-3 bg-card">
            <h3 className="font-mono text-[11px] uppercase tracking-wide text-slate">
              {g.exchangeProviderTitle}
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate">
              {g.exchangeProvider.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-line rounded-md p-5 space-y-3 bg-card">
            <h3 className="font-mono text-[11px] uppercase tracking-wide text-slate">
              {g.exchangeClientTitle}
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate">
              {g.exchangeClient.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-mist border border-line rounded-md p-5 overflow-x-auto">
          <p className="font-mono text-[11px] uppercase tracking-wide text-slate mb-3">{g.exampleTitle}</p>
          <pre className="font-mono text-xs text-ink whitespace-pre-wrap leading-relaxed">
            {g.exampleLines.join("\n")}
          </pre>
        </div>
      </section>

      <section className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <h2 className="font-display text-2xl font-semibold">{g.servicesTitle}</h2>
          <p className="text-sm text-slate leading-relaxed">{g.servicesIntro}</p>
        </div>
        <div className="overflow-x-auto border border-line rounded-md">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-mist/60 text-left">
                {g.servicesTable.headers.map((h) => (
                  <th key={h} className="px-3 py-2.5 font-mono text-[11px] uppercase text-slate font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.servicesTable.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-line">
                  <td className="px-3 py-2.5 text-slate">{row[0]}</td>
                  <td className="px-3 py-2.5 text-slate">{row[1]}</td>
                  <td className="px-3 py-2.5">
                    <code className="font-mono text-xs text-ink">{row[2]}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-medium text-ink">{g.servicesRecommendedTitle}</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate">
            {g.servicesRecommended.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate">
            {g.servicesNotes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <h2 className="font-display text-2xl font-semibold">{g.partATitle}</h2>
          <p className="text-sm text-slate leading-relaxed">{g.partAIntro}</p>
        </div>
        <div className="space-y-4 max-w-3xl">
          {g.partASteps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <h2 className="font-display text-2xl font-semibold">{g.partBTitle}</h2>
          <p className="text-sm text-slate leading-relaxed">{g.partBIntro}</p>
        </div>
        <div className="space-y-4 max-w-3xl">
          {g.partBSteps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i + g.partASteps.length} />
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="border border-line rounded-md p-5 space-y-3 bg-card">
          <h3 className="font-display text-lg font-semibold">{g.checklistClientTitle}</h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate leading-relaxed">
            {g.checklistClient.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="border border-line rounded-md p-5 space-y-3 bg-card">
          <h3 className="font-display text-lg font-semibold">{g.checklistProviderTitle}</h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate leading-relaxed">
            {g.checklistProvider.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="space-y-4 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">{g.verifyTitle}</h2>
        <p className="text-sm text-slate">{g.verifyIntro}</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate">
          {g.verify.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <Callout variant="mist">
          <p>{g.verifyNote}</p>
        </Callout>
      </section>

      <section className="space-y-4 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">{g.troubleshootTitle}</h2>
        <div className="space-y-3">
          {g.troubleshoot.map((item) => (
            <details
              key={item.title}
              className="border border-line rounded-md bg-card group open:border-signal/40"
            >
              <summary className="cursor-pointer px-4 py-3 font-medium text-sm text-ink list-none flex items-center justify-between gap-3">
                <span>{item.title}</span>
                <span className="font-mono text-xs text-slate group-open:text-signal group-open:hidden">+</span>
                <span className="font-mono text-xs text-signal hidden group-open:inline">−</span>
              </summary>
              <ul className="px-4 pb-4 list-disc pl-9 space-y-1.5 text-sm text-slate">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-4 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">{g.revokeTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-line rounded-md p-4 space-y-2">
            <h3 className="font-mono text-[11px] uppercase text-slate">{t("docs.delegation.client")}</h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate">
              {g.revokeClient.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
          <div className="border border-line rounded-md p-4 space-y-2">
            <h3 className="font-mono text-[11px] uppercase text-slate">Set-Api</h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate">
              {g.revokeProvider.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-3 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">{g.requestTitle}</h2>
        <div className="bg-mist border border-line rounded-md p-5 overflow-x-auto">
          <pre className="font-mono text-xs text-ink whitespace-pre-wrap leading-relaxed">
            {g.requestBody.join("\n")}
          </pre>
        </div>
      </section>

      <p className="text-sm pt-2">
        <Link to="/docs" className="text-signal hover:underline">
          ← {t("docs.backToDocs")}
        </Link>
        <span className="text-slate mx-2">·</span>
        <Link to="/docs/quickstart" className="text-signal hover:underline">
          {t("docs.quickstart")}
        </Link>
      </p>
    </article>
  );
}
