import type { FAQItem } from "@/components/marketing/FAQAccordion";

/**
 * Central FAQ content, shared between the homepage preview and the full
 * /faq page. Pricing/policy questions use deliberately careful language
 * rather than invented figures — see the master content guidelines.
 */
export const ALL_FAQS: FAQItem[] = [
  {
    question: "How does laser tattoo removal work?",
    answer: (
      <p>
        Laser tattoo removal uses focused light energy to target ink
        pigment beneath the skin. Over a series of sessions, the body's
        natural processes gradually break down and clear treated pigment.
        The specifics of how your tattoo responds depend on factors like
        ink color, density, and your individual skin.
      </p>
    ),
  },
  {
    question: "How many treatments will I need?",
    answer: (
      <p>
        The number of sessions varies significantly from person to
        person and tattoo to tattoo — factors like size, ink density,
        color, age, and location on the body all play a role. Your
        treatment plan and estimated session count are discussed during
        your consultation, based on an assessment of your specific
        tattoo.
      </p>
    ),
  },
  {
    question: "Does tattoo removal hurt?",
    answer: (
      <p>
        Sensations during treatment vary by person and by area of the
        body. We'll walk you through what to expect and how we approach
        your comfort during your consultation.
      </p>
    ),
  },
  {
    question: "Can every tattoo be completely removed?",
    answer: (
      <p>
        Not every tattoo can be completely removed. Results depend on
        factors including ink color, density, depth, tattoo age, and your
        skin's individual response. Many clients see significant fading
        over a series of sessions; our goal is always to give you an
        honest picture of what's realistic for your specific tattoo.
      </p>
    ),
  },
  {
    question: "Can colored tattoos be treated?",
    answer: (
      <p>
        Different ink colors respond differently to laser treatment, and
        some colors are more responsive than others. We'll assess your
        tattoo's specific colors and pigments during your consultation to
        discuss what to expect.
      </p>
    ),
  },
  {
    question: "Can you remove eyebrow PMU?",
    answer: (
      <p>
        We offer PMU correction services designed to help fade unwanted
        eyebrow and other cosmetic pigmentation. Not every PMU tattoo can
        be safely or completely removed — this depends on the pigment
        used, how it was implanted, and your skin. A consultation lets us
        assess your specific situation.
      </p>
    ),
  },
  {
    question: "What happens during a consultation?",
    answer: (
      <p>
        We'll discuss your tattoo or PMU, your goals, and your history,
        and assess the area in person (or via the photos you share).
        You'll leave with a clearer picture of your options and next
        steps — free of pressure or obligation.
      </p>
    ),
  },
  {
    question: "How should I prepare?",
    answer: (
      <p>
        We'll share specific preparation guidance ahead of your
        appointment. In general, protecting the treatment area from sun
        exposure beforehand is recommended — your consultation is the
        best place to get guidance specific to your situation.
      </p>
    ),
  },
  {
    question: "What should I expect after treatment?",
    answer: (
      <p>
        Aftercare guidance is provided following every session to support
        your skin through healing. We'll walk you through exactly what to
        expect and how to care for the treated area.
      </p>
    ),
  },
  {
    question: "How much does tattoo removal cost?",
    answer: (
      <p>
        Every tattoo is different. Because treatment depends on factors
        such as tattoo size, pigment, location, and previous treatments,
        personalized pricing is discussed during your consultation.
      </p>
    ),
  },
  {
    question: "Do you offer free consultations?",
    answer: (
      <p>
        Yes — consultations at Akasha Laser Studio are free. Book online
        or call the studio directly to schedule yours.
      </p>
    ),
  },
];

export const HOME_FAQS = ALL_FAQS.slice(0, 5);
