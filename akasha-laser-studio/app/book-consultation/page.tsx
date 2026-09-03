import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultationWizard } from "@/components/forms/ConsultationWizard";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book a free, personalized consultation for laser tattoo removal or PMU correction at Akasha Laser Studio in McAllen, TX.",
  alternates: { canonical: "/book-consultation" },
};

export default function BookConsultationPage() {
  return (
    <section className="section-py bg-ivory">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Free Consultation"
          title="Let's create a personalized plan."
          description="Answer a few quick questions and we'll follow up to schedule your consultation. This request does not confirm an appointment — our team will reach out to finalize your visit."
        />
        <div className="mt-14">
          <ConsultationWizard />
        </div>
      </Container>
    </section>
  );
}
