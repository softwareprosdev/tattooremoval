import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterGallery } from "@/components/marketing/BeforeAfterSlider";
import { ConsultationCTA } from "@/components/marketing/ConsultationCTA";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Real before/after results from Akasha Laser Studio in McAllen, TX. Individual results vary.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <>
      <section className="section-py bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Results"
            title="Real client results, shared with permission."
            description="This gallery only ever features authentic, business-supplied client photos. As new results are shared with us, they'll appear here."
          />
          <div className="mt-14">
            <BeforeAfterGallery />
          </div>
        </Container>
      </section>
      <ConsultationCTA
        title="Ready for a fresh start?"
        description="See what's possible for your specific tattoo or PMU with a free, no-pressure consultation."
      />
    </>
  );
}
