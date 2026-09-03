import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${business.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="section-py bg-ivory">
      <Container className="max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-4 text-4xl">Privacy Policy</h1>
        <p className="prose-body mt-2 text-sm text-taupe-300">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose-body mt-10 space-y-6">
          <p>
            This Privacy Policy describes how {business.legalName}, doing
            business as {business.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;), collects, uses, and protects information
            when you visit our website or submit a consultation or contact
            request.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Information We Collect</h2>
          <p>
            When you submit a contact or consultation request, we collect
            information you provide directly, which may include your name,
            email address, phone number, service interest, details about
            your tattoo or permanent makeup, preferred appointment date and
            time, and any message you include.
          </p>
          <p>
            <strong>Photos.</strong> If you choose to upload photos as part
            of your request, those photos are used only to help us
            understand your inquiry and prepare for your consultation.
            Photos are stored in a private, access-controlled system and are
            never made public or shared with third parties without your
            permission.
          </p>
          <p>
            We also automatically collect limited technical and usage
            information through analytics tools (such as Google Analytics,
            Google Tag Manager, and Meta Pixel, where enabled) to help us
            understand how visitors use our site.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">How We Use Information</h2>
          <p>
            We use the information you provide to respond to your inquiry,
            schedule and prepare for consultations and appointments,
            communicate with you about your treatment, and improve our
            website and services. We do not sell your personal information.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Service Providers</h2>
          <p>
            We use trusted third-party service providers to operate our
            website and process consultation requests, including Supabase
            (secure data storage), Resend (email communications), and
            Cloudflare Turnstile (spam and bot protection). These providers
            process information only as necessary to provide their
            services to us.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Data Security</h2>
          <p>
            We take reasonable technical and organizational measures to
            protect the information you share with us, including storing
            uploaded photos in a private storage bucket accessible only via
            time-limited, authenticated links.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Your Choices</h2>
          <p>
            You may contact us at any time to ask what information we hold
            about you, to request corrections, or to request deletion of
            your information, subject to any recordkeeping obligations we
            may have.
          </p>

          <h2 className="text-xl font-serif text-charcoal-500">Contact Us</h2>
          <p>
            Questions about this Privacy Policy can be directed to us at{" "}
            {business.address.full}, or by phone at{" "}
            {business.phones.map((p) => p.number).join(" or ")}.
          </p>

          <p className="text-xs text-taupe-300">
            This page is a general template and is not a substitute for
            legal advice. We recommend having this policy reviewed by a
            licensed attorney familiar with Texas and applicable federal law
            before relying on it.
          </p>
        </div>
      </Container>
    </section>
  );
}
