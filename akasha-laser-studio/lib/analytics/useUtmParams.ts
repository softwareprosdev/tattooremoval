"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

/** Reads utm_source/utm_medium/utm_campaign from the current URL, once,
 * for attribution on form submissions. Never user-entered. */
export function useUtmParams() {
  const searchParams = useSearchParams();

  return React.useMemo(
    () => ({
      utmSource: searchParams.get("utm_source") ?? undefined,
      utmMedium: searchParams.get("utm_medium") ?? undefined,
      utmCampaign: searchParams.get("utm_campaign") ?? undefined,
    }),
    [searchParams]
  );
}
