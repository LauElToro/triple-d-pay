import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "./site-chrome";

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
