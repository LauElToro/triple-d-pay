const STORAGE_KEY = "set-api.remembered-email";

export function getRememberedEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setRememberedEmail(email: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (email) localStorage.setItem(STORAGE_KEY, email.trim());
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore quota / private mode
  }
}

export function hasRememberedEmail(): boolean {
  return Boolean(getRememberedEmail());
}
