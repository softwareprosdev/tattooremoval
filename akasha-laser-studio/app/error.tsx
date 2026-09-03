"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/config/business";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-ivory">
      <Container className="max-w-xl text-center">
        <span className="eyebrow">Something went wrong</span>
        <h1 className="mt-4 text-4xl">We hit an unexpected snag.</h1>
        <p className="prose-body mt-5">
          Please try again. If the problem continues, you can reach us
          directly at {business.phones[0]?.number}.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Button href="/" variant="secondary">
            Return Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
