/**
 * Central registry of analytics event names + a thin, privacy-conscious
 * dispatch layer. Events fan out to GA4 (gtag), GTM (dataLayer), and Meta
 * Pixel (fbq) when those are configured — see components/analytics in
 * app/layout.tsx for script injection. No PII (names, emails, phone
 * numbers, photos) should ever be passed as event parameters.
 */

export const ANALYTICS_EVENTS = {
  CONSULTATION_STARTED: "consultation_started",
  CONSULTATION_COMPLETED: "consultation_completed",
  PHONE_CLICKED: "phone_clicked",
  INSTAGRAM_CLICKED: "instagram_clicked",
  DIRECTIONS_CLICKED: "directions_clicked",
  SERVICE_VIEWED: "service_viewed",
  TATTOO_REMOVAL_CLICKED: "tattoo_removal_clicked",
  PMU_CORRECTION_CLICKED: "pmu_correction_clicked",
  PHOTO_UPLOADED: "photo_uploaded",
  FORM_ABANDONED: "form_abandoned",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires an analytics event to whichever providers are configured.
 * Safe to call unconditionally — no-ops on the server and when no
 * provider is present (e.g. local dev without env vars set).
 */
export function trackEvent(
  name: AnalyticsEventName,
  params: AnalyticsEventParams = {}
): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer?.push({ event: name, ...params });
    window.gtag?.("event", name, params);

    // Meta Pixel uses its own standard/custom event naming; we forward as
    // a custom event so it shows up in Events Manager without remapping.
    window.fbq?.("trackCustom", name, params);
  } catch {
    // Analytics must never break the user experience.
  }
}
