import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { LocationCard } from "@/components/marketing/LocationCard";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Akasha Laser Studio in McAllen, TX to ask a question or start your laser tattoo removal or PMU correction consultation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="section-py bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's start a conversation."
          description="Have a question, or ready to get started? Send us a message and we'll be in touch."
        />
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <ContactForm />
          <LocationCard />
        </div>
      </Container>
    </section>
  );
}
