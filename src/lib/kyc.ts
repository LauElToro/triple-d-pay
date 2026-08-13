/**
 * Temporary kill-switch for the Didit KYC gate.
 * Default: false. Set VITE_KYC_REQUIRED=true (and Backend KYC_REQUIRED=true) to enforce it again.
 */
export const KYC_REQUIRED = (import.meta.env.VITE_KYC_REQUIRED ?? "false") === "true";

export function isKycBlocking(user?: {
  systemRole?: string;
  kycStatus?: string;
} | null): boolean {
  if (!KYC_REQUIRED) return false;
  if (!user) return false;
  if (user.systemRole === "SUPERADMIN") return false;
  return user.kycStatus !== "APPROVED";
}
