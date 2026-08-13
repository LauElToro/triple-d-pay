/** Frontend-only referral helpers (no backend yet). */

export function referralCodeFromUserId(userId: string): string {
  const compact = userId.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  if (compact.length >= 8) return compact.slice(0, 8);
  return (compact || "setapi").padEnd(8, "0").slice(0, 8);
}

export function buildReferralUrl(code: string): string {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://set-api.com";
  const params = new URLSearchParams({ ref: code.trim() });
  return `${origin}/register?${params.toString()}`;
}
