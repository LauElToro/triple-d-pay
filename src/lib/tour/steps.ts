/** Lightweight product tours — no external lib. */

export interface TourStep {
  target: string; // data-tour attribute value
  title: string;
  body: string;
}

export type TourRoute =
  | "/app"
  | "/app/keys"
  | "/app/subscription"
  | "/app/requests"
  | "/app/team"
  | "/app/settings"
  | "/admin";

const LOCAL_KEY = "sa_tours_done";

export function readLocalTours(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
  } catch {
    return {};
  }
}

export function writeLocalTour(route: string) {
  const map = readLocalTours();
  map[route] = new Date().toISOString();
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function isTourDone(route: string, server?: Record<string, string> | null): boolean {
  if (server?.[route]) return true;
  return Boolean(readLocalTours()[route]);
}

export function tourStepsFor(route: string, t: (key: string) => string): TourStep[] {
  const map: Record<string, TourStep[]> = {
    "/app": [
      { target: "notices", title: t("tour.app.s0title"), body: t("tour.app.s0body") },
      { target: "nav-keys", title: t("tour.app.s1title"), body: t("tour.app.s1body") },
      { target: "nav-subscription", title: t("tour.app.s2title"), body: t("tour.app.s2body") },
    ],
    "/app/keys": [
      { target: "keys-create", title: t("tour.keys.s0title"), body: t("tour.keys.s0body") },
      { target: "keys-prefix", title: t("tour.keys.s1title"), body: t("tour.keys.s1body") },
    ],
    "/app/subscription": [
      { target: "sub-plans", title: t("tour.sub.s0title"), body: t("tour.sub.s0body") },
      { target: "sub-invoices", title: t("tour.sub.s1title"), body: t("tour.sub.s1body") },
    ],
    "/app/requests": [
      { target: "usage-chart", title: t("tour.req.s0title"), body: t("tour.req.s0body") },
    ],
    "/app/team": [
      { target: "team-invite", title: t("tour.team.s0title"), body: t("tour.team.s0body") },
    ],
    "/app/settings": [
      { target: "settings-org", title: t("tour.settings.s0title"), body: t("tour.settings.s0body") },
      { target: "settings-cuit", title: t("tour.settings.s1title"), body: t("tour.settings.s1body") },
    ],
    "/admin": [
      { target: "admin-kpis", title: t("tour.admin.s0title"), body: t("tour.admin.s0body") },
    ],
  };
  return map[route] ?? [];
}

export function normalizeTourRoute(pathname: string): string {
  if (pathname === "/app/" || pathname === "/app") return "/app";
  if (pathname.startsWith("/admin")) return "/admin";
  return pathname;
}
