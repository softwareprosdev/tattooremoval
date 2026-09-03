"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/config/business";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/events";

export function ConsultationCTA({
  title = "Let's Talk About Your Tattoo.",
  description = "Every tattoo is different. Start with a personalized consultation so we can better understand your goals and discuss your options.",
  primaryLabel = "Book a Free Consultation",
  dark = true,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  dark?: boolean;
}) {
  const phone = business.phones[0];

  return (
    <section
      className={
        dark
          ? "bg-charcoal-500 text-ivory-100"
          : "bg-champagne-100 text-charcoal-500"
      }
    >
      <Container className="section-py flex flex-col items-center gap-8 text-center">
        <h2 className="max-w-2xl text-balance text-3xl sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p
          className={`prose-body max-w-xl ${
            dark ? "text-champagne-100/90" : "text-charcoal-100"
          }`}
        >
          {description}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            href="/book-consultation"
            variant={dark ? "light" : "primary"}
            size="lg"
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.CONSULTATION_STARTED, {
                source: "consultation_cta_section",
              })
            }
          >
            {primaryLabel}
          </Button>
          {phone ? (
            <Button
              href={phone.href}
              variant={dark ? "secondary" : "ghost"}
              size="lg"
              className={dark ? "border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-500" : ""}
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.PHONE_CLICKED, {
                  source: "consultation_cta_section",
                })
              }
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {business.name}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
