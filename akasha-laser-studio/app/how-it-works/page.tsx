import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultationCTA } from "@/components/marketing/ConsultationCTA";
import { Scene3D } from "@/components/3d/Scene3D";
import { business } from "@/lib/config/business";

export const metadata: Metadata = {
  title: "How Laser Tattoo Removal Works",
  description:
    "How laser tattoo removal and PMU correction work at Akasha Laser Studio in McAllen, TX — from consultation through healing.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="section-py bg-obsidian text-ivory-100">
        <Container className="text-center">
          <span className="eyebrow text-champagne-200">How It Works</span>
          <h1 className="mx-auto mt-4 max-w-2xl text-balance text-4xl sm:text-5xl">
            Fade. Treat. Heal. Repeat. Reveal.
          </h1>
          <p className="prose-body mx-auto mt-6 max-w-xl text-champagne-100/90">
            A conceptual look at the laser tattoo removal journey. This
            visualization is an educational illustration, not a guaranteed
            clinical outcome or timeline.
          </p>
        </Container>
        <div className="mx-auto mt-14 aspect-[16/9] max-w-4xl overflow-hidden rounded-sm">
          <Scene3D kind="ink" className="h-full w-full" />
        </div>
      </section>

      <section className="section-py bg-ivory">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="The Science, Simply" title="What's actually happening beneath the skin?" align="left" />
          <div className="prose-body mt-8 space-y-5">
            <p>
              Laser tattoo removal works by delivering focused light energy
              that targets ink pigment sitting beneath the skin's surface.
              Different wavelengths respond differently to different ink
              colors, which is part of why a thorough assessment of your
              tattoo matters before treatment begins.
            </p>
            <p>
              Once pigment is targeted, your body's own natural processes
              gradually work to clear it over the following weeks — which is
              why tattoo removal happens across a series of spaced-out
              sessions rather than a single visit.
            </p>
            <p>
              Akasha Laser Studio utilizes the Hollywood Spectra laser
              system as part of our approach. We pair that technology with
              a personalized treatment plan, because the same tattoo can
              respond very differently from one person to the next.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-py bg-champagne-100">
        <Container>
          <SectionHeading eyebrow="Your Journey" title="What the process looks like." />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-5">
            {["Consultation", "Assessment", "Treatment", "Healing", "Follow-Up"].map((label, i) => (
              <div key={label} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-champagne-400 bg-ivory-100 font-serif text-xl text-charcoal-500">
                  {i + 1}
                </div>
                <p className="mt-3 text-sm font-medium text-charcoal-500">{label}</p>
              </div>
            ))}
          </div>
          <p className="prose-body mx-auto mt-12 max-w-2xl text-center">
            The number of follow-up sessions varies based on your tattoo and
            your body's response — something we'll discuss candidly at every
            step, never overpromising a specific number up front.
          </p>
        </Container>
      </section>

      <ConsultationCTA />
    </>
  );
}
