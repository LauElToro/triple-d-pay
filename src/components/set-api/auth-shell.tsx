import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { LogoMark } from "./logo";
import { NavbarControls } from "./navbar-controls";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-paper overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--mist)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklch,var(--signal)_18%,transparent)_0%,_transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      <header className="relative z-10 p-6 flex items-center justify-between">
        <Link to="/">
          <LogoMark />
        </Link>
        <NavbarControls />
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
}
