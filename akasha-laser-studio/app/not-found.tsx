import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ivory">
      <Container className="max-w-xl text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-4 text-4xl sm:text-5xl">This page has faded from view.</h1>
        <p className="prose-body mt-5">
          The page you're looking for doesn't exist or may have moved. Let's
          get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/">Return Home</Button>
          <Button href="/book-consultation" variant="secondary">
            Book a Free Consultation
          </Button>
        </div>
        <p className="prose-body mt-8 text-sm">
          Or browse{" "}
          <Link href="/tattoo-removal" className="font-semibold text-charcoal-500">
            Tattoo Removal
          </Link>{" "}
          ·{" "}
          <Link href="/pmu-correction" className="font-semibold text-charcoal-500">
            PMU Correction
          </Link>{" "}
          ·{" "}
          <Link href="/faq" className="font-semibold text-charcoal-500">
            FAQ
          </Link>
        </p>
      </Container>
    </section>
  );
}
