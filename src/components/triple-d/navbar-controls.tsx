import { LanguageSwitch } from "./language-switch";
import { ThemeToggle } from "./theme-toggle";

export function NavbarControls() {
  return (
    <div className="flex items-center gap-2">
      <LanguageSwitch />
      <ThemeToggle />
    </div>
  );
}
