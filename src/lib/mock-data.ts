export type PlanId = "free" | "fixed" | "usage";

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "AR$ 0",
    tagline: "Para probar la integración",
    features: [
      "Hasta 50 comprobantes/mes",
      "1 API Key",
      "Soporte por email",
      "Sin costo por 30 días",
    ],
    cta: "Empezar gratis",
  },
  {
    id: "fixed",
    name: "Fijo",
    price: "AR$ 29.900",
    tagline: "Volumen predecible",
    features: [
      "Hasta 2.000 comprobantes/mes",
      "1 API Key",
      "Reportes de uso",
      "Facturación mensual",
    ],
    cta: "Contratar Fijo",
  },
  {
    id: "usage",
    name: "Por uso",
    price: "AR$ 22 / comprobante",
    tagline: "Escala sin techo",
    features: [
      "Sin límite mensual",
      "1 API Key",
      "Metering en tiempo real",
      "Se factura al cierre de ciclo",
    ],
    cta: "Contratar Por uso",
  },
];

export interface MockUser {
  id: string;
  email: string;
  planId: PlanId;
  createdAt: string;
}

export interface MockKey {
  id: string;
  prefix: string;
  status: "active" | "suspended";
  usageStartedAt: string;
  cycleEndsAt: string;
}

export interface MockInvoice {
  id: string;
  periodStart: string;
  periodEnd: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueAt: string;
}

export const MOCK_KEY: MockKey = {
  id: "key_01HXYZ",
  prefix: "tdk_live_9f2a",
  status: "active",
  usageStartedAt: "2026-07-01",
  cycleEndsAt: "2026-07-31",
};

export const MOCK_INVOICES: MockInvoice[] = [
  {
    id: "inv_2026_07",
    periodStart: "2026-07-01",
    periodEnd: "2026-07-31",
    amount: 29900,
    status: "pending",
    dueAt: "2026-08-15",
  },
  {
    id: "inv_2026_06",
    periodStart: "2026-06-01",
    periodEnd: "2026-06-30",
    amount: 29900,
    status: "paid",
    dueAt: "2026-07-15",
  },
  {
    id: "inv_2026_05",
    periodStart: "2026-05-01",
    periodEnd: "2026-05-31",
    amount: 29900,
    status: "paid",
    dueAt: "2026-06-15",
  },
];

export const MOCK_USAGE = [
  { day: "Lun", count: 42 },
  { day: "Mar", count: 78 },
  { day: "Mié", count: 65 },
  { day: "Jue", count: 91 },
  { day: "Vie", count: 120 },
  { day: "Sáb", count: 34 },
  { day: "Dom", count: 12 },
];

export function generateKeyPlaintext(): string {
  const seg = () =>
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 6);
  return `tdk_live_${seg()}${seg()}`;
}

export function formatARS(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}
