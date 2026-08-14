export type PlanId = "free" | "fixed" | "usage";
export type PlanStatus = "active" | "pending_payment";
export type SystemRole = "SUPERADMIN" | "ADMIN" | "USER";
export type KycStatus = "NOT_STARTED" | "PENDING" | "APPROVED" | "DECLINED";
export type SubRole = "DEV" | "CONTABILIDAD" | "ADMINISTRACION";

export type Permission =
  | "org:manage"
  | "team:read"
  | "team:write"
  | "keys:read"
  | "keys:write"
  | "usage:read"
  | "billing:read"
  | "invoices:read"
  | "arca:read"
  | "arca:write"
  | "items:read"
  | "items:write"
  | "tickets:read"
  | "tickets:write";

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  systemRole: SystemRole;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  kycStatus: KycStatus;
  lastLoginAt?: string | null;
  onboardingSkippedAt?: string | null;
  tourCompleted?: Record<string, string> | null;
  createdAt: string;
}

export interface OrgSummary {
  id: string;
  name: string;
  planId: PlanId;
  pendingPlanId?: PlanId | null;
  planStatus?: PlanStatus;
  kycStatus: KycStatus;
  arcaCuit: string | null;
  clientType: string | null;
  source?: string | null;
  heardAbout?: string | null;
  intendedUse?: string | null;
  companyRole?: string | null;
  companySize?: string | null;
  onboardingCompletedAt?: string | null;
  orgRole: "OWNER" | "ADMIN" | "MEMBER";
  subRole: SubRole | null;
  permissions: Permission[];
}

export interface OrganizationCuit {
  id: string;
  orgId: string;
  cuit: string;
  displayName: string | null;
  isDefault: boolean;
  status: "active" | "revoked";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  user: SessionUser;
}

export interface TwoFactorChallenge {
  status: "twofa_required";
  method: "totp" | "email";
  pendingToken: string;
}

export interface VerifyEmailChallenge {
  status: "verify_email";
  userId: string;
  email: string;
  message: string;
}

export interface ApiKeyView {
  id: string;
  name: string;
  prefix: string;
  status: "active" | "suspended" | "revoked";
  lastUsedAt: string | null;
  usageStartedAt: string;
  cycleEndsAt: string | null;
  createdAt: string;
  permissions?: string[];
  cuitIds?: string[];
  cuits?: string[];
}

export interface InvoiceView {
  id: string;
  periodStart: string;
  periodEnd: string;
  amount: number;
  units: number;
  status: "pending" | "paid" | "overdue" | "void";
  dueAt: string;
  issuedAt: string;
  paidAt: string | null;
}

export interface UsageView {
  plan: {
    id: PlanId;
    name: string;
    /** `null` when unlimited (JSON cannot encode Infinity). */
    cap: number | null;
    includedUnits: number;
    unitCost: number;
  };
  cycle: {
    units: number;
    cost: number;
    remaining: number | null;
  };
  daily: { day: string; count: number }[];
}

export interface CreateKeyResponse {
  key: ApiKeyView;
  plaintext: string;
}

export interface IssuedComprobanteView {
  id: string;
  cuitEmisor: string;
  emisorNombre: string | null;
  cbteTipo: number;
  cbteTipoLabel: string;
  ptoVta: number;
  cbteNro: number;
  numero: string;
  cbteFch: string;
  cbteFchFormatted: string;
  docTipoReceptor: number;
  docNroReceptor: string;
  receptorNombre: string | null;
  impTotal: number;
  impNeto: number;
  impIVA: number;
  cae: string;
  caeVto: string;
  caeVtoFormatted: string;
  resultado: string;
  createdAt: string;
}

export interface IssuedComprobantesResponse {
  comprobantes: IssuedComprobanteView[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
