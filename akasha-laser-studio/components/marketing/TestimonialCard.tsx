import { Quote } from "lucide-react";

export type Testimonial = {
  quote: string;
  attribution: string;
  treatment?: string;
};

/**
 * Renders verified testimonials only. Never seed this component with
 * fabricated quotes — pass real, business-supplied testimonials via
 * `testimonials`. Falls back to trust-building content (not fake
 * reviews) when none are available yet.
 */
export function TestimonialSection({
  testimonials = [],
}: {
  testimonials?: Testimonial[];
}) {
  if (testimonials.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          {
            title: "Personalized Consultation",
            body: "Every treatment plan starts with an in-depth conversation about your tattoo, skin, and goals — never a one-size-fits-all approach.",
          },
          {
            title: "Advanced Laser Technology",
            body: "We utilize the Hollywood Spectra laser system as part of our approach to tattoo removal and pigment treatment.",
          },
          {
            title: "Local to McAllen, TX",
            body: "Conveniently located on Richmond Ave, serving clients throughout McAllen and the surrounding Rio Grande Valley.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-sm border border-champagne-300/70 bg-ivory-100 p-8 shadow-soft"
          >
            <h3 className="font-serif text-xl text-charcoal-500">
              {card.title}
            </h3>
            <p className="prose-body mt-3">{card.body}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <figure
          key={i}
          className="flex flex-col rounded-sm border border-champagne-300/70 bg-ivory-100 p-8 shadow-soft"
        >
          <Quote
            className="h-6 w-6 text-champagne-400"
            aria-hidden="true"
          />
          <blockquote className="prose-body mt-4 flex-1">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-5 text-sm font-semibold text-charcoal-500">
            {t.attribution}
            {t.treatment ? (
              <span className="block text-xs font-normal text-taupe-300">
                {t.treatment}
              </span>
            ) : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
