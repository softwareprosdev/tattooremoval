"use client";

import { MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BusinessHours } from "@/components/marketing/BusinessHours";
import { business } from "@/lib/config/business";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/events";

export function LocationCard({
  showMap = true,
  className,
}: {
  showMap?: boolean;
  className?: string;
}) {
  const phone = business.phones[0];

  return (
    <div
      className={`overflow-hidden rounded-sm border border-champagne-300/70 bg-ivory-100 shadow-soft ${className ?? ""}`}
    >
      {showMap ? (
        <div className="aspect-[16/9] w-full bg-champagne-100">
          <iframe
            title={`Map to ${business.name}`}
            src={business.address.mapsEmbedSrc}
            className="h-full w-full grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 sm:p-10">
        <div>
          <div className="flex items-start gap-2 text-charcoal-500">
            <MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-serif text-lg">{business.name}</p>
              <p className="prose-body">
                {business.address.line1}
                <br />
                {business.address.city}, {business.address.state}{" "}
                {business.address.zip}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              href={business.address.mapsDirectionsUrl}
              external
              variant="primary"
              size="sm"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.DIRECTIONS_CLICKED, {
                  source: "location_card",
                })
              }
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </Button>
            {phone ? (
              <Button
                href={phone.href}
                variant="secondary"
                size="sm"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.PHONE_CLICKED, {
                    source: "location_card",
                  })
                }
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {phone.number}
              </Button>
            ) : null}
          </div>
        </div>

        <BusinessHours />
      </div>
    </div>
  );
}
