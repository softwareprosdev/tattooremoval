import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/config/business";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${business.name}'s website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="section-py bg-ivory">
      <Container className="max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-4 text-4xl">Terms of Use</h1>
        <p className="prose-body mt-2 text-sm text-taupe-300">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose-body mt-10 space-y-6">
          <p>
            These Terms of Use govern your access to and use of the{" "}
            {business.name} website. By using this site, you agree to these
            terms.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Informational Purpose</h2>
          <p>
            Content on this website is provided for general informational
            purposes about our services. It is not medical advice, and does
            not create a provider-client relationship. Any treatment plan,
            recommendation, or pricing discussed on this site is subject to
            an in-person or consultation-based assessment specific to you.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">No Guaranteed Outcomes</h2>
          <p>
            Laser tattoo removal and PMU correction outcomes vary
            significantly based on individual factors. Nothing on this
            website should be interpreted as a guarantee of complete
            removal, a specific number of treatments, or a specific
            timeline.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Consultation Requests</h2>
          <p>
            Submitting a consultation or contact request through this
            website does not confirm a scheduled appointment. A member of
            our team will follow up to confirm scheduling details.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Intellectual Property</h2>
          <p>
            All content on this site, including text, graphics, and
            visualizations, is the property of {business.legalName} unless
            otherwise noted, and may not be reproduced without permission.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {business.legalName}{" "}
            is not liable for any indirect, incidental, or consequential
            damages arising from your use of this website.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Contact</h2>
          <p>
            Questions about these terms can be directed to us at{" "}
            {business.address.full}.
          </p>

          <p className="text-xs text-taupe-300">
            This page is a general template and is not a substitute for
            legal advice. We recommend having these terms reviewed by a
            licensed attorney before relying on them.
          </p>
        </div>
      </Container>
    </section>
  );
}
