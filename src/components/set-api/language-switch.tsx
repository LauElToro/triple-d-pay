import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { FlagIcon } from "@/components/set-api/flag-icon";
import { LOCALES } from "@/lib/i18n/types";
import { useI18n } from "@/lib/i18n-context";

export function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n();
  const current = LOCALES.find((l) => l.code === locale);

  return (
    <Select value={locale} onValueChange={(v) => setLocale(v as typeof locale)}>
      <SelectTrigger
        className="h-8 w-11 border-line bg-background px-2 justify-center gap-0 [&>svg:last-child]:ml-1"
        aria-label={current ? `${t("nav.language")}: ${current.label}` : t("nav.language")}
      >
        {current && <FlagIcon locale={current.code} className="h-3.5 w-[1.05rem]" />}
      </SelectTrigger>
      <SelectContent align="end">
        {LOCALES.map(({ code, label }) => (
          <SelectItem key={code} value={code} textValue={label} className="text-xs">
            <span className="flex items-center gap-2 font-mono">
              {label}
              <FlagIcon locale={code} className="h-3.5 w-[1.05rem]" />
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
