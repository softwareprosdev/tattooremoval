import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { ConsultationCTA } from "@/components/marketing/ConsultationCTA";
import { ALL_FAQS } from "@/lib/config/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about laser tattoo removal and PMU correction at Akasha Laser Studio in McAllen, TX.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          typeof item.answer === "object" && item.answer !== null
            ? extractText(item.answer)
            : String(item.answer),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="section-py bg-ivory">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Support" title="Frequently asked questions" />
          <div className="mt-14">
            <FAQAccordion items={ALL_FAQS} />
          </div>
        </Container>
      </section>
      <ConsultationCTA />
    </>
  );
}

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (
    node &&
    typeof node === "object" &&
    "props" in node &&
    (node as { props?: { children?: ReactNode } }).props?.children
  ) {
    return extractText((node as { props: { children: ReactNode } }).props.children);
  }
  return "";
}
