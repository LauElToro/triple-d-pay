import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { LogoMark } from "./logo";
import { NavbarControls } from "./navbar-controls";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslation } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

const desktopNavLinkClass = "text-sm text-slate hover:text-ink transition-colors";
const desktopNavLinkActiveClass = "text-signal font-bold";

const mobileNavLinkClass =
  "text-base font-medium text-ink hover:text-signal transition-colors py-1";
const mobileNavLinkActiveClass = "text-signal font-bold";

function isPublicNavActive(to: string, pathname: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

function usePublicNavLinks() {
  const { t } = useTranslation();
  return [
    { to: "/productos/platform", label: t("product.platform.title") },
    { to: "/productos/factura", label: t("product.factura.title") },
    { to: "/docs", label: t("nav.docs") },
    { to: "/tools", label: t("nav.tools") },
    { to: "/pricing", label: t("nav.pricing") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;
}

export function SiteHeader() {
  const { t } = useTranslation();
  const links = usePublicNavLinks();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="border-b border-line bg-card/70 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/"><LogoMark /></Link>
        <nav className="flex items-center gap-2 sm:gap-3 flex-1 justify-end min-w-0">
          <div className="hidden lg:flex items-center gap-4 mr-2">
            {links.map((link) => {
              const active = isPublicNavActive(link.to, pathname);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(desktopNavLinkClass, active && desktopNavLinkActiveClass)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <NavbarControls />
          <div className="hidden lg:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link
                to="/login"
                aria-current={pathname === "/login" ? "page" : undefined}
                className={cn(pathname === "/login" && "text-signal font-bold")}
              >
                {t("nav.login")}
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link
                to="/register"
                aria-current={pathname === "/register" ? "page" : undefined}
              >
                {t("nav.register")}
              </Link>
            </Button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden shrink-0"
                aria-label={t("nav.openMenu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs">
              <SheetHeader>
                <SheetTitle className="text-left font-mono text-sm">{t("nav.menu")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {links.map((link) => {
                  const active = isPublicNavActive(link.to, pathname);
                  return (
                    <SheetClose asChild key={link.to}>
                      <Link
                        to={link.to}
                        aria-current={active ? "page" : undefined}
                        className={cn(mobileNavLinkClass, active && mobileNavLinkActiveClass)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <div className="border-t border-line pt-4 flex flex-col gap-2">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className={cn("w-full", pathname === "/login" && "border-signal text-signal")}
                    >
                      <Link to="/login" aria-current={pathname === "/login" ? "page" : undefined}>
                        {t("nav.login")}
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link
                        to="/register"
                        aria-current={pathname === "/register" ? "page" : undefined}
                      >
                        {t("nav.register")}
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
