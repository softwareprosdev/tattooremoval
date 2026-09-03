import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultationCTA } from "@/components/marketing/ConsultationCTA";
import { LocationCard } from "@/components/marketing/LocationCard";
import { business } from "@/lib/config/business";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${business.name}, a laser tattoo removal and PMU correction studio in McAllen, TX.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="section-py bg-ivory">
        <Container className="max-w-3xl text-center">
          <span className="eyebrow">About Us</span>
          <h1 className="mt-4 text-balance text-4xl sm:text-5xl">
            A studio built around precision, technology, and confidence.
          </h1>
          <p className="prose-body mx-auto mt-6 max-w-2xl">
            {business.name} is a laser tattoo removal and PMU correction
            studio located in {business.address.city}, {business.address.state}.
            We built Akasha around a simple idea: every tattoo, and every
            client, deserves a treatment plan as individual as they are —
            not a one-size-fits-all approach.
          </p>
        </Container>
      </section>

      <section className="section-py bg-champagne-100">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {[
            {
              title: "Personalized, Not Generic",
              body: "Every consultation starts with your tattoo, your skin, and your goals — never a template.",
            },
            {
              title: "Advanced Technology",
              body: `We utilize the ${business.technology.name} laser system as part of our approach to tattoo removal and pigment treatment.`,
            },
            {
              title: "Honest, Always",
              body: "We'll never promise a guaranteed outcome. Our job is to give you a clear, honest picture of what's realistic.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-sm border border-champagne-300/70 bg-ivory-100 p-8">
              <h2 className="font-serif text-xl text-charcoal-500">{item.title}</h2>
              <p className="prose-body mt-3 text-sm">{item.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="section-py bg-ivory">
        <Container>
          <SectionHeading eyebrow="Where To Find Us" title="Our McAllen studio" />
          <div className="mt-14">
            <LocationCard />
          </div>
        </Container>
      </section>

      <ConsultationCTA
        title="Start with a conversation."
        description="Book a free consultation and let's talk about your goals."
      />
    </>
  );
}
