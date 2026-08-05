const CUIT_WEIGHTS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2] as const;

export function normalizeCuit(value: string): string {
  return value.replace(/\D/g, "");
}

/** Validates Argentine CUIT check digit (modulo 11). Mirrors SET_API_ARCA / backend. */
export function isValidCuit(value: string): boolean {
  const cuit = normalizeCuit(value);
  if (!/^\d{11}$/.test(cuit)) return false;

  const digits = cuit.split("").map(Number);
  const checksum =
    CUIT_WEIGHTS.reduce((sum, weight, index) => sum + weight * digits[index], 0) % 11;
  let expected = 11 - checksum;
  if (expected === 11) expected = 0;
  else if (expected === 10) expected = 9;

  return digits[10] === expected;
}
