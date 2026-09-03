import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultationCTA } from "@/components/marketing/ConsultationCTA";
import { Scene3D } from "@/components/3d/Scene3D";
import { business } from "@/lib/config/business";

export const metadata: Metadata = {
  title: "PMU Correction in McAllen, TX",
  description:
    "PMU correction at Akasha Laser Studio in McAllen, TX — helping fade unwanted eyebrow and cosmetic pigmentation before your next permanent makeup journey.",
  alternates: { canonical: "/pmu-correction" },
};

const SITUATIONS = [
  {
    title: "Unwanted Eyebrow Pigment",
    body: "Faded, uneven, or discolored eyebrow PMU that no longer suits your look.",
  },
  {
    title: "Outdated PMU",
    body: "Permanent makeup applied years ago in styles or shapes that have since changed.",
  },
  {
    title: "Migrated Pigment",
    body: "Pigment that has shifted or spread beyond its original placement over time.",
  },
  {
    title: "Color Changes",
    body: "Pigment that has shifted in tone — often turning blue, gray, or orange with age.",
  },
  {
    title: "Preparing for New PMU",
    body: "Fading existing pigment to create a cleaner canvas ahead of a new PMU application.",
  },
];

export default function PMUCorrectionPage() {
  return (
    <>
      <section className="section-py bg-charcoal-500 text-ivory-100">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-champagne-200">PMU Correction</span>
            <h1 className="mt-4 text-balance text-4xl sm:text-5xl">
              A fresh start for outdated or unwanted PMU.
            </h1>
            <p className="prose-body mt-6 max-w-lg text-champagne-100/90">
              {business.services[1]?.summary}
            </p>
          </div>
          <div className="aspect-square overflow-hidden rounded-sm">
            <Scene3D kind="pmu" className="h-full w-full" />
          </div>
        </Container>
      </section>

      <section className="section-py bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Common Situations"
            title="If any of this sounds familiar, you're not alone."
            align="left"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SITUATIONS.map((s) => (
              <div key={s.title} className="rounded-sm border border-champagne-300/70 bg-champagne-50 p-7">
                <h3 className="font-serif text-lg text-charcoal-500">{s.title}</h3>
                <p className="prose-body mt-2 text-sm">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="prose-body mx-auto mt-10 max-w-2xl text-center text-sm text-taupe-300">
            Not every PMU tattoo can be safely or completely removed. Pigment
            type, depth, and your skin all factor into what's realistic —
            your consultation gives you an honest assessment specific to
            your situation.
          </p>
        </Container>
      </section>

      <ConsultationCTA
        title="Book PMU Consultation"
        description="Start with a conversation about your current PMU and what you're hoping to achieve next."
      />
    </>
  );
}
