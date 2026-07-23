import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useTranslation } from "@/lib/i18n-context";
import {
  isTourDone,
  normalizeTourRoute,
  tourStepsFor,
  writeLocalTour,
  type TourStep,
} from "@/lib/tour/steps";

interface TourContextValue {
  startTour: (force?: boolean) => void;
  active: boolean;
}

const TourContext = createContext<TourContextValue | null>(null);

export function TourProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();
  const { t } = useTranslation();
  const route = normalizeTourRoute(pathname);
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const startTour = useCallback(
    (force = false) => {
      const list = tourStepsFor(route, t);
      if (list.length === 0) return;
      if (!force && isTourDone(route, user?.tourCompleted)) return;
      setSteps(list);
      setIndex(0);
      setActive(true);
    },
    [route, t, user?.tourCompleted],
  );

  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => startTour(false), 800);
    return () => clearTimeout(timer);
  }, [route, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!active || !steps[index]) {
      setRect(null);
      return;
    }
    const el = document.querySelector(`[data-tour="${steps[index].target}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setRect(el.getBoundingClientRect());
    } else {
      setRect(null);
    }
  }, [active, index, steps]);

  const finish = async () => {
    setActive(false);
    writeLocalTour(route);
    try {
      await api.patch("/api/me/tours", { route, completed: true });
    } catch {
      // local persistence is enough
    }
  };

  const value = useMemo(() => ({ startTour, active }), [startTour, active]);

  const step = steps[index];

  return (
    <TourContext.Provider value={value}>
      {children}
      {active && step && (
        <div className="fixed inset-0 z-[80]">
          <div className="absolute inset-0 bg-ink/50" onClick={() => void finish()} />
          {rect && (
            <div
              className="absolute border-2 border-signal rounded-md pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]"
              style={{
                top: rect.top - 4,
                left: rect.left - 4,
                width: rect.width + 8,
                height: rect.height + 8,
              }}
            />
          )}
          <div
            className="absolute z-[81] w-[min(360px,calc(100vw-2rem))] rounded-md border border-line bg-card p-4 shadow-lg"
            style={{
              top: Math.min(
                (rect?.bottom ?? 80) + 12,
                typeof window !== "undefined" ? window.innerHeight - 200 : 80,
              ),
              left: Math.max(16, Math.min(rect?.left ?? 16, (typeof window !== "undefined" ? window.innerWidth : 400) - 380)),
            }}
          >
            <div className="text-xs font-mono text-slate mb-1">
              {index + 1} / {steps.length}
            </div>
            <h3 className="font-display text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-slate mt-1">{step.body}</p>
            <div className="flex justify-between gap-2 mt-4">
              <Button size="sm" variant="ghost" onClick={() => void finish()}>
                {t("tour.skip")}
              </Button>
              <div className="flex gap-2">
                {index > 0 && (
                  <Button size="sm" variant="outline" onClick={() => setIndex((i) => i - 1)}>
                    {t("tour.back")}
                  </Button>
                )}
                {index < steps.length - 1 ? (
                  <Button size="sm" onClick={() => setIndex((i) => i + 1)}>
                    {t("tour.next")}
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => void finish()}>
                    {t("tour.done")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </TourContext.Provider>
  );
}

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("useTour must be used within TourProvider");
  return ctx;
}
