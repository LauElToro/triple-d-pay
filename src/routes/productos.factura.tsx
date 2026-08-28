import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/set-api/public-shell";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/set-api/code-block";
import { QUICKSTART_CODE } from "@/content/catalog";
import { useTranslation } from "@/lib/i18n-context";
import {
  ArrowRight,
  Check,
  FileText,
  KeyRound,
  QrCode,
  RefreshCw,
  Webhook,
} from "lucide-react";

export const Route = createFileRoute("/productos/factura")({
  component: ProductoFactura,
  head: () => ({
    meta: [
      { title: "Set-Api Factura · Set-Api" },
      {
        name: "description",
        content:
          "Facturación electrónica punta a punta: emisión, estados, PDF, QR y webhooks vía API REST.",
      },
    ],
  }),
});

function ProductoFactura() {
  const { t } = useTranslation();

  const capabilities = [
    {
      icon: FileText,
      title: t("product.factura.cap0Title"),
      body: t("product.factura.cap0Body"),
    },
    {
      icon: RefreshCw,
      title: t("product.factura.cap1Title"),
      body: t("product.factura.cap1Body"),
    },
    {
      icon: QrCode,
      title: t("product.factura.cap2Title"),
      body: t("product.factura.cap2Body"),
    },
    {
      icon: Webhook,
      title: t("product.factura.cap3Title"),
      body: t("product.factura.cap3Body"),
    },
  ];

  const steps = [0, 1, 2, 3].map((i) => t(`product.factura.step${i}`));
  const coverage = [0, 1, 2, 3, 4].map((i) => t(`product.factura.cover${i}`));
  const requirements = [0, 1, 2, 3].map((i) => t(`product.factura.req${i}`));

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wide text-signal mb-3">
            {t("product.factura.title")}
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            {t("landing.pathFacturaHeadline")}
          </h1>
          <p className="text-lg text-slate mt-4">{t("product.factura.desc")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/register" search={{ plan: "free" }}>
                {t("landing.startFree")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/docs/quickstart">{t("docs.quickstart")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/contact">{t("nav.contact")}</Link>
            </Button>
          </div>
        </div>

        <section>
          <h2 className="font-display text-2xl font-semibold mb-2">
            {t("product.factura.capsTitle")}
          </h2>
          <p className="text-sm text-slate mb-8 max-w-2xl">{t("product.factura.capsSubtitle")}</p>
          <div className="grid sm:grid-cols-2 gap-8">
            {capabilities.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon className="h-6 w-6 text-signal mb-3" />
                <h3 className="font-display text-lg mb-2">{title}</h3>
                <p className="text-sm text-slate leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-line bg-card rounded-md p-8 md:p-10">
          <h2 className="font-display text-2xl font-semibold mb-2">
            {t("product.factura.flowTitle")}
          </h2>
          <p className="text-sm text-slate mb-8 max-w-2xl">{t("product.factura.flowSubtitle")}</p>
          <ol className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-slate leading-relaxed">
                <span className="font-mono text-xs text-signal shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl font-semibold mb-2">
              {t("product.factura.coverTitle")}
            </h2>
            <p className="text-sm text-slate mb-5">{t("product.factura.coverSubtitle")}</p>
            <ul className="space-y-2.5">
              {coverage.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-ink">
                  <Check className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link
                to="/docs/web-services/$slug"
                params={{ slug: "facturacion-electronica" }}
                className="text-signal hover:underline"
              >
                {t("product.factura.coverDocs")} →
              </Link>
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold mb-2">
              {t("product.factura.reqTitle")}
            </h2>
            <p className="text-sm text-slate mb-5">{t("product.factura.reqSubtitle")}</p>
            <ul className="space-y-2.5">
              {requirements.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-ink">
                  <KeyRound className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link to="/docs/delegacion-arca" className="text-signal hover:underline">
                {t("docs.delegation")} →
              </Link>
            </p>
          </div>
        </section>

        <section className="border border-signal/30 bg-signal/5 rounded-lg p-8 md:p-10 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-display font-bold">{t("product.factura.exampleTitle")}</h2>
            <p className="text-slate mt-3 text-sm leading-relaxed">
              {t("product.factura.exampleBody")}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                {t("docs.restAuthDesc")}
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                {t("docs.restIssueDesc")}
              </li>
            </ul>
            <Button asChild className="mt-6" variant="outline">
              <Link to="/docs/quickstart">
                {t("docs.quickstart")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <CodeBlock code={QUICKSTART_CODE} comment="// Set-Api Factura" />
        </section>

        <section className="max-w-2xl space-y-3">
          <h2 className="font-display text-2xl font-semibold">{t("product.factura.audienceTitle")}</h2>
          <p className="text-slate leading-relaxed">{t("product.factura.audienceBody")}</p>
          <p className="text-sm text-slate">{t("product.factura.audienceNote")}</p>
          <div className="pt-2">
            <Link to="/productos/platform" className="text-sm text-signal hover:underline">
              {t("landing.pathPlatformCta")} →
            </Link>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-line pt-10">
          <Button asChild>
            <Link to="/register" search={{ plan: "free" }}>
              {t("landing.startFree")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/pricing">{t("landing.viewPlans")}</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/contact">{t("nav.contact")}</Link>
          </Button>
        </div>
      </div>
    </PublicShell>
  );
}
