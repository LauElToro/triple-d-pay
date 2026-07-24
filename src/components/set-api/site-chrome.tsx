import { Link } from "@tanstack/react-router";
import { LogoMark } from "./logo";
import { NavbarControls } from "./navbar-controls";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n-context";

const navLinkClass =
  "text-sm text-slate hover:text-ink transition-colors hidden lg:inline-block";

export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-line bg-card/70 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/"><LogoMark /></Link>
        <nav className="flex items-center gap-4 flex-1 justify-end">
          <div className="hidden md:flex items-center gap-4 mr-2">
            <Link to="/productos/platform" className={navLinkClass}>{t("product.platform.title")}</Link>
            <Link to="/productos/factura" className={navLinkClass}>{t("product.factura.title")}</Link>
            <Link to="/docs" className={navLinkClass}>{t("nav.docs")}</Link>
            <Link to="/tools" className={navLinkClass}>{t("nav.tools")}</Link>
            <Link to="/pricing" className={navLinkClass}>{t("nav.pricing")}</Link>
            <Link to="/contact" className={navLinkClass}>{t("nav.contact")}</Link>
          </div>
          <NavbarControls />
          <Button asChild variant="ghost" size="sm"><Link to="/login">{t("nav.login")}</Link></Button>
          <Button asChild size="sm"><Link to="/register">{t("nav.register")}</Link></Button>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-line mt-24 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div className="md:col-span-1 space-y-3">
          <LogoMark className="text-ink" />
          <p className="font-mono text-xs text-slate">{t("footer.tagline")}</p>
          <p className="text-xs text-slate">{t("footer.disclaimer")}</p>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase text-slate mb-3">{t("footer.products")}</h3>
          <ul className="space-y-2">
            <li><Link to="/productos/platform" className="hover:text-signal">{t("product.platform.title")}</Link></li>
            <li><Link to="/productos/factura" className="hover:text-signal">{t("product.factura.title")}</Link></li>
            <li><Link to="/pricing" className="hover:text-signal">{t("nav.pricing")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase text-slate mb-3">{t("footer.resources")}</h3>
          <ul className="space-y-2">
            <li><Link to="/docs" className="hover:text-signal">{t("nav.docs")}</Link></li>
            <li><Link to="/docs/quickstart" className="hover:text-signal">{t("docs.quickstart")}</Link></li>
            <li><Link to="/contact" className="hover:text-signal">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase text-slate mb-3">{t("footer.tools")}</h3>
          <ul className="space-y-2">
            <li><Link to="/tools" className="hover:text-signal">{t("nav.tools")}</Link></li>
            <li><Link to="/login" className="hover:text-signal">{t("nav.login")}</Link></li>
            <li><Link to="/register" className="hover:text-signal">{t("nav.register")}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
