"use client";

import { Phone, CalendarCheck } from "lucide-react";
import { business } from "@/lib/config/business";
import { trackEvent } from "@/lib/analytics/events";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import Link from "next/link";

/**
 * Sticky bottom CTA bar shown only on small screens. Kept out of the
 * document flow above the fold so it never overlaps hero content, and
 * respects safe-area insets for notched devices.
 */
export function MobileCTA() {
  const phone = business.phones[0];

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-champagne-300/70 bg-ivory-100/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Link
        href="/book-consultation"
        onClick={() =>
          trackEvent(ANALYTICS_EVENTS.CONSULTATION_STARTED, {
            source: "mobile_sticky_cta",
          })
        }
        className="flex flex-1 items-center justify-center gap-2 bg-charcoal-500 py-4 text-xs font-semibold uppercase tracking-widest2 text-ivory-100"
      >
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        Book Free Consultation
      </Link>
      {phone ? (
        <a
          href={phone.href}
          onClick={() =>
            trackEvent(ANALYTICS_EVENTS.PHONE_CLICKED, {
              source: "mobile_sticky_cta",
            })
          }
          className="flex w-24 items-center justify-center gap-1.5 border-l border-champagne-300/70 py-4 text-xs font-semibold uppercase tracking-widest2 text-charcoal-500"
          aria-label={`Call Akasha Laser Studio at ${phone.number}`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
      ) : null}
    </div>
  );
}
