import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/config/business";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `Accessibility statement for ${business.name}'s website.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <section className="section-py bg-ivory">
      <Container className="max-w-3xl">
        <span className="eyebrow">Accessibility</span>
        <h1 className="mt-4 text-4xl">Accessibility Statement</h1>

        <div className="prose-body mt-10 space-y-6">
          <p>
            {business.name} is committed to ensuring our website is
            accessible to everyone, including people with disabilities. We
            aim to meet WCAG 2.2 Level AA guidelines where practical,
            including:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Semantic HTML and meaningful heading structure</li>
            <li>Keyboard-navigable menus, forms, and interactive elements</li>
            <li>Visible focus states for keyboard users</li>
            <li>Descriptive alt text for meaningful images</li>
            <li>Support for reduced-motion preferences, including in our 3D visualizations</li>
            <li>Sufficient color contrast throughout the site</li>
          </ul>
          <p>
            Our 3D visualizations are decorative and educational — they are
            never required to understand page content, and automatically
            switch to a static presentation when a visitor's system
            indicates a preference for reduced motion, or when WebGL isn't
            available on their device.
          </p>
          <h2 className="text-xl font-serif text-charcoal-500">Feedback</h2>
          <p>
            If you encounter any barrier while using this website, please
            let us know by calling {business.phones.map((p) => p.number).join(" or ")}.
            We take accessibility feedback seriously and will work to
            address issues promptly.
          </p>
        </div>
      </Container>
    </section>
  );
}
