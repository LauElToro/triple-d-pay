/** Dashboard filter presets — real usage numbers come from the API. */

export type UsageLimitId = "requests" | "cuits" | "automations";

export interface UsageLimit {
  id: UsageLimitId;
  used: number;
  limit: number;
  unlimited?: boolean;
  productionOnly: boolean;
}

export const FILTER_ENVIRONMENTS = ["production", "development"] as const;
export type FilterEnvironment = (typeof FILTER_ENVIRONMENTS)[number];

export const FILTER_PRESETS = ["currentPeriod", "last30", "last7"] as const;
export type FilterPreset = (typeof FILTER_PRESETS)[number];

/** Default date inputs for filter UI (last 30 days). */
export function defaultFilterPeriod(now = new Date()) {
  const end = now.toISOString().slice(0, 10);
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 30);
  const start = startDate.toISOString().slice(0, 10);
  return { start, end };
}