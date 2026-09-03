import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultationCTA } from "@/components/marketing/ConsultationCTA";
import { Scene3D } from "@/components/3d/Scene3D";
import { business } from "@/lib/config/business";

export const metadata: Metadata = {
  title: "Laser Tattoo Removal in McAllen, TX",
  description:
    "Laser tattoo removal at Akasha Laser Studio in McAllen, TX — personalized treatment plans built around your tattoo, pigment, skin, and goals.",
  alternates: { canonical: "/tattoo-removal" },
};

const FACTORS = [
  "Tattoo size",
  "Pigment and ink color",
  "Tattoo age",
  "Tattoo location on the body",
  "Skin characteristics",
  "Tattoo density",
  "Individual response to treatment",
];

const PROCESS = [
  { title: "Consultation", body: "We start with a conversation about your tattoo, your history, and your goals — free of pressure or obligation." },
  { title: "Tattoo Assessment", body: "A close look at your tattoo's ink density, color palette, depth, and the characteristics of your skin." },
  { title: "Treatment Planning", body: "Your plan is built around your specific tattoo — not a generic protocol." },
  { title: "Laser Treatment", body: "Sessions using advanced laser technology, paced according to how your skin responds." },
  { title: "Healing", body: "Clear aftercare guidance to support your skin between sessions." },
  { title: "Follow-Up Treatments", body: "Additional sessions as appropriate, reassessed together along the way." },
];

export default function TattooRemovalPage() {
  return (
    <>
      <section className="section-py bg-charcoal-500 text-ivory-100">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-champagne-200">Laser Tattoo Removal</span>
            <h1 className="mt-4 text-balance text-4xl sm:text-5xl">
              Ready to move on from unwanted ink?
            </h1>
            <p className="prose-body mt-6 max-w-lg text-champagne-100/90">
              {business.services[0]?.summary}
            </p>
          </div>
          <div className="aspect-square overflow-hidden rounded-sm">
            <Scene3D kind="ink" className="h-full w-full" />
          </div>
        </Container>
      </section>

      <section className="section-py bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="What Affects Your Results"
            title="No two tattoos respond the same way."
            description="Tattoo removal varies significantly from person to person. We never promise complete removal — your consultation gives you an honest, personalized picture."
            align="left"
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FACTORS.map((factor) => (
              <li
                key={factor}
                className="rounded-sm border border-champagne-300/70 bg-champagne-50 px-5 py-4 text-sm text-charcoal-500"
              >
                {factor}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-py bg-champagne-100">
        <Container>
          <SectionHeading eyebrow="The Process" title="What to expect, step by step." />
          <ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((item, i) => (
              <li key={item.title} className="rounded-sm border border-champagne-300/70 bg-ivory-100 p-7">
                <span className="font-serif text-3xl text-champagne-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-sans font-semibold text-charcoal-500">
                  {item.title}
                </h3>
                <p className="prose-body mt-2 text-sm">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ConsultationCTA
        title="Get My Personalized Consultation"
        description="Every tattoo tells a different story. Let's talk about yours and discuss what's realistic for your specific situation."
      />
    </>
  );
}
