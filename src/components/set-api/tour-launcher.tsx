import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useTour } from "@/lib/tour/tour-context";
import { useTranslation } from "@/lib/i18n-context";

export function TourLauncher() {
  const { startTour } = useTour();
  const { t } = useTranslation();

  return (
    <Button
      size="sm"
      variant="ghost"
      className="h-8 gap-1.5 text-slate"
      onClick={() => startTour(true)}
      data-tour="tour-launcher"
    >
      <HelpCircle className="h-4 w-4" />
      <span className="hidden sm:inline text-xs font-mono">{t("tour.help")}</span>
    </Button>
  );
}
