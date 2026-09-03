"use client";

import * as React from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile widget. Renders nothing (and forms should treat
 * verification as satisfied) when NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't
 * configured, so local development isn't blocked before the business
 * sets up Turnstile — the server still skips verification in that case
 * too (see lib/security/turnstile.ts), so this stays consistent.
 */
export function TurnstileWidget({
  onVerify,
  className,
}: {
  onVerify: (token: string) => void;
  className?: string;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<string | undefined>(undefined);
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  const render = React.useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile) return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "light",
      callback: onVerify,
      "expired-callback": () => onVerify(""),
      "error-callback": () => onVerify(""),
    });
  }, [siteKey, onVerify]);

  React.useEffect(() => {
    if (scriptLoaded) render();
    return () => {
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptLoaded]);

  if (!siteKey) {
    return (
      <p className="text-xs text-taupe-300">
        Bot protection will appear here once Turnstile is configured.
      </p>
    );
  }

  return (
    <div className={className}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        onLoad={() => setScriptLoaded(true)}
      />
      <div ref={containerRef} />
    </div>
  );
}
