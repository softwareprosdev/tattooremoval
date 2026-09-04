import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ScanFace, Syringe, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/marketing/Hero";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { ConsultationCTA } from "@/components/marketing/ConsultationCTA";
import { BeforeAfterGallery } from "@/components/marketing/BeforeAfterSlider";
import { LocationCard } from "@/components/marketing/LocationCard";
import { InstagramGallery } from "@/components/marketing/InstagramGallery";
import { TestimonialSection } from "@/components/marketing/TestimonialCard";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { business } from "@/lib/config/business";
import { HOME_FAQS } from "@/lib/config/faq";

export const metadata: Metadata = {
  title: business.seo.defaultTitle,
  description: business.seo.defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: business.seo.defaultTitle,
    description: business.seo.defaultDescription,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* SERVICES */}
      <section id="services" className="section-py bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="What We Treat"
            title="Two specialized paths. One personalized plan."
            description="Whether you're ready to move on from unwanted ink or correct outdated permanent makeup, your treatment plan starts with understanding your unique goals."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {business.services.map((service) => (
              <ServiceCard
                key={service.slug}
                eyebrow={service.slug === "tattoo-removal" ? "Laser Treatment" : "Correction & Fading"}
                name={service.name}
                summary={service.summary}
                href={service.href}
                cta={service.cta}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* LASER TECHNOLOGY */}
      <section className="section-py bg-charcoal-500 text-ivory-100">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-champagne-200">Our Technology</span>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl md:text-[2.75rem]">
              Advanced laser technology, applied with precision.
            </h2>
            <p className="prose-body mt-5 max-w-lg text-champagne-100/90">
              {business.technology.description} Every session is guided by a
              careful assessment of your tattoo or pigment, your skin, and
              your treatment goals.
            </p>
            <div className="mt-8">
              <Button href="/how-it-works" variant="light">
                Learn How It Works
              </Button>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image
              src="/images/technology-treatment.jpg"
              alt="Laser tattoo removal handpiece treating a client's back"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[65%_40%]"
            />
          </div>
        </Container>
      </section>

      {/* TATTOO REMOVAL EDUCATIONAL */}
      <section className="section-py bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Laser Tattoo Removal"
            title="A process built around your tattoo — not a template."
            description="Tattoo removal varies significantly depending on tattoo size, pigment, ink color, tattoo age, location, skin characteristics, tattoo density, and individual response. We never promise complete removal — every plan begins with an honest assessment."
            align="left"
          />
          <ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { step: "01", title: "Consultation", body: "We start by listening — your history, your goals, and any concerns." },
              { step: "02", title: "Tattoo Assessment", body: "A close look at ink density, color, depth, and skin characteristics." },
              { step: "03", title: "Treatment Planning", body: "A personalized plan built around your specific tattoo and goals." },
              { step: "04", title: "Laser Treatment", body: "Sessions using our laser technology, paced to your skin's response." },
              { step: "05", title: "Healing", body: "Guidance on aftercare to support your skin between sessions." },
              { step: "06", title: "Follow-Up Treatments", body: "Additional sessions as appropriate, reassessed along the way." },
            ].map((item) => (
              <li key={item.step} className="rounded-sm border border-champagne-300/70 bg-ivory-100 p-7">
                <span className="font-serif text-3xl text-champagne-400">{item.step}</span>
                <h3 className="mt-3 text-lg font-sans font-semibold text-charcoal-500">
                  {item.title}
                </h3>
                <p className="prose-body mt-2 text-sm">{item.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <Button href="/tattoo-removal">Get My Personalized Consultation</Button>
          </div>
        </Container>
      </section>

      {/* PMU CORRECTION */}
      <section className="section-py bg-champagne-100">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <span className="eyebrow">PMU Correction</span>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl">
              A fresh start for outdated or unwanted PMU.
            </h2>
            <p className="prose-body mt-5 max-w-lg">
              Unwanted eyebrow pigment, outdated permanent makeup, migrated
              pigment, or color changes don&apos;t have to define your next
              look. We help fade unwanted cosmetic pigmentation as part of
              preparing for a new PMU journey — not every PMU tattoo can be
              safely or completely removed, and we&apos;ll always be honest
              about what&apos;s realistic for your situation.
            </p>
            <div className="mt-8">
              <Button href="/pmu-correction">Book PMU Consultation</Button>
            </div>
          </div>
          <div className="order-1 aspect-square overflow-hidden rounded-sm lg:order-2">
            <Image
              src="/images/technology-treatment.jpg"
              alt="Laser treatment handpiece in use during a session"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[40%_60%]"
            />
          </div>
        </Container>
      </section>

      {/* RESULTS */}
      <section className="section-py bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Results"
            title="Real client results, shared with permission."
            description="A growing gallery of authentic before/after results — never generated or stock imagery."
          />
          <div className="mt-14">
            <BeforeAfterGallery />
          </div>
          <div className="mt-10 text-center">
            <Button href="/results" variant="secondary">
              View the Full Gallery
            </Button>
          </div>
        </Container>
      </section>

      <ConsultationCTA />

      {/* LOCAL SEO CONTENT */}
      <section className="section-py bg-ivory">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <span className="eyebrow">Serving the Rio Grande Valley</span>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl">
              Laser Tattoo Removal in McAllen, Texas
            </h2>
            <p className="prose-body mt-5">
              Akasha Laser Studio is located on Richmond Ave in McAllen,
              Texas, offering laser tattoo removal and PMU correction to
              clients throughout the Rio Grande Valley — including{" "}
              {business.serviceArea.nearby.slice(1).join(", ")}, and{" "}
              {business.address.city} itself. Every visit begins with a
              personalized consultation, so your treatment plan reflects
              your specific tattoo or pigment, your skin, and your goals.
            </p>
            <p className="prose-body mt-4">
              As a McAllen-area destination for laser tattoo removal and PMU
              correction, we combine advanced laser technology with a calm,
              private studio environment designed to put you at ease from
              your first visit.
            </p>
          </div>
          <div className="rounded-sm border border-champagne-300/70 bg-champagne-50 p-8">
            <h3 className="flex items-center gap-2 font-serif text-xl text-charcoal-500">
              <Sparkles className="h-5 w-5 text-taupe-400" aria-hidden="true" />
              Why Clients Choose Akasha
            </h3>
            <ul className="prose-body mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-taupe-400" aria-hidden="true" />
                Advanced laser technology, including the Hollywood Spectra system
              </li>
              <li className="flex gap-3">
                <ScanFace className="mt-0.5 h-4 w-4 shrink-0 text-taupe-400" aria-hidden="true" />
                Specialized tattoo removal and PMU correction expertise
              </li>
              <li className="flex gap-3">
                <Syringe className="mt-0.5 h-4 w-4 shrink-0 text-taupe-400" aria-hidden="true" />
                Personalized treatment plans built around your goals
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* TRUST */}
      <section className="section-py bg-champagne-100">
        <Container>
          <SectionHeading eyebrow="Why Akasha" title="Built on trust, not guesswork." />
          <div className="mt-14">
            <TestimonialSection />
          </div>
        </Container>
      </section>

      {/* LOCATION */}
      <section className="section-py bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Visit The Studio"
            title={business.address.full}
            description="Conveniently located in McAllen, Texas."
          />
          <div className="mt-14">
            <LocationCard />
          </div>
        </Container>
      </section>

      {/* PARTNER */}
      {business.partner.name ? (
        <section className="border-y border-champagne-300/60 bg-champagne-50 py-14">
          <Container className="text-center">
            <p className="eyebrow">Studio Partnership</p>
            <p className="prose-body mx-auto mt-3 max-w-xl">
              Located alongside{" "}
              {business.partner.url ? (
                <a
                  href={business.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-charcoal-500 underline underline-offset-4"
                >
                  {business.partner.name}
                </a>
              ) : (
                <span className="font-semibold text-charcoal-500">
                  {business.partner.name}
                </span>
              )}
              . {business.partner.description}
            </p>
          </Container>
        </section>
      ) : null}

      {/* INSTAGRAM */}
      <section className="section-py bg-ivory">
        <Container>
          <SectionHeading eyebrow="Follow Along" title="From the studio, on Instagram." />
          <div className="mt-14">
            <InstagramGallery />
          </div>
        </Container>
      </section>

      {/* FAQ PREVIEW */}
      <section className="section-py bg-champagne-100">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Common Questions" title="Frequently asked questions" />
          <div className="mt-12">
            <FAQAccordion items={HOME_FAQS} />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="text-sm font-semibold uppercase tracking-widest2 text-charcoal-500 underline underline-offset-4"
            >
              View All FAQs
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
