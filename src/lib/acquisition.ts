/** Capture UTM / referrer / landing for login analytics. */
export function getAcquisitionPayload() {
  if (typeof window === "undefined") return undefined;
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      referrer: document.referrer || undefined,
      landingPath: `${window.location.pathname}${window.location.search}`,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };
  } catch {
    return undefined;
  }
}
