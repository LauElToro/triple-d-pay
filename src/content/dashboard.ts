/** Static dashboard data — separate from mock-data.ts (frontend-only). */

export const DASHBOARD_PERIOD = {
  start: "2026-07-22",
  end: "2026-08-22",
} as const;

export type UsageLimitId = "requests" | "cuits" | "automations";

export interface UsageLimit {
  id: UsageLimitId;
  used: number;
  limit: number;
  productionOnly: boolean;
}

export const USAGE_LIMITS: UsageLimit[] = [
  { id: "requests", used: 0, limit: 1000, productionOnly: true },
  { id: "cuits", used: 0, limit: 1, productionOnly: true },
  { id: "automations", used: 0, limit: 10, productionOnly: false },
];

export const FILTER_ENVIRONMENTS = ["production", "development"] as const;
export type FilterEnvironment = (typeof FILTER_ENVIRONMENTS)[number];

export const FILTER_PRESETS = ["currentPeriod", "last30", "last7"] as const;
export type FilterPreset = (typeof FILTER_PRESETS)[number];
