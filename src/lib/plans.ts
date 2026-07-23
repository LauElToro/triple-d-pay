import type { PlanId } from "@/lib/api-types";

export type { PlanId };

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
}
