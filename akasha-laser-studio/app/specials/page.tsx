import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultationCTA } from "@/components/marketing/ConsultationCTA";

export const metadata: Metadata = {
  title: "Specials",
  description: "Current specials and promotions from Akasha Laser Studio in McAllen, TX.",
  alternates: { canonical: "/specials" },
  robots: { index: false, follow: true },
};

/**
 * Placeholder page, architected so real promotions can be added later
 * (e.g. from a CMS or the leads/admin database) without a rewrite. No
 * specials are fabricated here — only real, business-supplied
 * promotions should ever populate this page.
 */
export default function SpecialsPage() {
  return (
    <>
      <section className="section-py bg-ivory">
        <Container className="max-w-2xl text-center">
          <SectionHeading
            eyebrow="Specials"
            title="Current offers, coming soon."
            description="We don't have any active specials to share just yet. Check back soon, or follow us on Instagram for updates — every consultation is complimentary in the meantime."
          />
        </Container>
      </section>
      <ConsultationCTA />
    </>
  );
}
