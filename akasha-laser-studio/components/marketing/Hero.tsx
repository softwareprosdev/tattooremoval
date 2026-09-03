"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Scene3D } from "@/components/3d/Scene3D";
import { AmbientBokeh } from "@/components/marketing/AmbientBokeh";
import { BotanicalAccent } from "@/components/marketing/BotanicalAccent";
import { business } from "@/lib/config/business";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/events";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-gradient-to-br from-charcoal-500 via-obsidian to-obsidian">
      <AmbientBokeh />
      <div className="absolute inset-0">
        <Scene3D kind="hero" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/10" />
      <BotanicalAccent className="pointer-events-none absolute -bottom-6 -left-6 hidden h-48 w-auto opacity-80 sm:block lg:h-56" />

      <Container className="relative z-10 py-32 sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow text-champagne-200">
            McAllen, Texas · Laser Tattoo Removal &amp; PMU Correction
          </span>
          <h1 className="mt-6 text-balance text-4xl text-ivory-100 sm:text-5xl md:text-6xl md:leading-[1.05]">
            Fade the Past. Reveal What&apos;s Next.
          </h1>
          <p className="prose-body mt-6 max-w-xl text-champagne-100/90">
            Advanced laser tattoo removal and permanent makeup correction in
            McAllen, Texas.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              href="/book-consultation"
              variant="light"
              size="lg"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.CONSULTATION_STARTED, {
                  source: "hero_primary_cta",
                })
              }
            >
              Book a Free Consultation
            </Button>
            <Button
              href="#services"
              variant="secondary"
              size="lg"
              className="border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-500"
            >
              Explore Our Services
            </Button>
          </div>

          <p className="mt-10 flex flex-wrap gap-x-3 gap-y-2 text-xs uppercase tracking-widest2 text-champagne-100/70">
            <span>Personalized treatment plans</span>
            <span aria-hidden="true">•</span>
            <span>Advanced laser technology</span>
            <span aria-hidden="true">•</span>
            <span>{business.address.city}, {business.address.state}</span>
          </p>
        </motion.div>
      </Container>

      <a
        href={business.phones[0]?.href}
        onClick={() =>
          trackEvent(ANALYTICS_EVENTS.PHONE_CLICKED, { source: "hero_floating" })
        }
        className="absolute bottom-8 right-8 z-10 hidden items-center gap-2 rounded-full border border-champagne-100/30 bg-ivory-100/10 px-5 py-3 text-sm text-ivory-100 backdrop-blur-md transition-colors hover:bg-ivory-100/20 lg:flex"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {business.phones[0]?.number}
      </a>
    </section>
  );
}
