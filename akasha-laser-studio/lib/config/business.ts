/**
 * Centralized business configuration for Akasha Laser Studio.
 *
 * This is the single source of truth for business identity, contact
 * details, hours, and service metadata used across the site (hero copy,
 * footer, structured data, contact page, etc). Update values here rather
 * than hunting through components.
 *
 * Anything not explicitly supplied by the business (pricing, staff bios,
 * certifications, guarantees) is intentionally omitted rather than
 * invented. Where a future CMS/admin field is anticipated, it is noted
 * in a comment so the shape can be extended without a rewrite.
 */

export type BusinessHours = {
  day: string;
  hours: string;
  closed?: boolean;
};

export const business = {
  name: "Akasha Laser Studio",
  legalName: "Akasha Laser LLC",
  tagline: "Fade the Past. Reveal What's Next.",

  address: {
    line1: "1600 Richmond Ave Ste 1",
    city: "McAllen",
    state: "TX",
    zip: "78503",
    country: "US",
    full: "1600 Richmond Ave Ste 1, McAllen, TX 78503",
    // Google Maps place search query — safe fallback that doesn't require an API key.
    mapsQuery: "Akasha+Laser+Studio+1600+Richmond+Ave+Ste+1+McAllen+TX+78503",
    mapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=1600+Richmond+Ave+Ste+1%2C+McAllen%2C+TX+78503",
    mapsEmbedSrc:
      "https://www.google.com/maps?q=1600+Richmond+Ave+Ste+1,+McAllen,+TX+78503&output=embed",
    geo: {
      // TODO: replace with verified coordinates once confirmed by the business.
      latitude: 26.2159,
      longitude: -98.2438,
    },
  },

  // Legacy/historical location — retained for reference only (e.g. old
  // reviews, directory listings that still cite it). Never surfaced as
  // the current address anywhere in the UI.
  historicalAddress: {
    line1: "3817 N 10th St, Suite 3",
    city: "McAllen",
    state: "TX",
    full: "3817 N 10th St, Suite 3, McAllen, TX",
    label: "Historical location (no longer in use)",
  },

  phones: [
    { number: "(832) 714-1599", href: "tel:+18327141599", primary: true },
    { number: "(956) 382-3718", href: "tel:+19563823718", primary: false },
  ],

  email: {
    // TODO: add business inquiry email address when supplied.
    general: "",
  },

  hours: [
    { day: "Monday", hours: "Closed", closed: true },
    { day: "Tuesday", hours: "9:00 AM – 6:00 PM" },
    { day: "Wednesday", hours: "9:00 AM – 6:00 PM" },
    { day: "Thursday", hours: "9:00 AM – 6:00 PM" },
    { day: "Friday", hours: "9:00 AM – 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
    { day: "Sunday", hours: "Closed", closed: true },
  ] satisfies BusinessHours[],

  social: {
    instagram: {
      handle: "@akasha_laser",
      url: "https://www.instagram.com/akasha_laser/",
    },
    // TODO: add Facebook/TikTok if/when supplied.
  },

  partner: {
    name: "SkinSational Medspa",
    description:
      "Akasha Laser Studio operates alongside SkinSational Medspa at our McAllen location.",
    // TODO: add SkinSational's official website/social URL when supplied to make the name clickable.
    url: "",
  },

  services: [
    {
      slug: "tattoo-removal",
      name: "Laser Tattoo Removal",
      shortName: "Tattoo Removal",
      href: "/tattoo-removal",
      summary:
        "Ready to move on from unwanted ink? Akasha Laser Studio provides laser tattoo-removal treatments designed around your tattoo, pigment, skin, and treatment goals.",
      cta: "Explore Tattoo Removal",
    },
    {
      slug: "pmu-correction",
      name: "PMU Correction",
      shortName: "PMU Correction",
      href: "/pmu-correction",
      summary:
        "Unwanted or outdated cosmetic pigment doesn't have to define your next look. Our PMU correction services are designed to help fade unwanted eyebrow and cosmetic pigmentation before a new permanent makeup journey.",
      cta: "Explore PMU Correction",
    },
  ],

  // Technology referenced by the business. Do not add capability claims
  // beyond what is confirmed.
  technology: {
    name: "Hollywood Spectra",
    description:
      "Akasha Laser Studio utilizes the Hollywood Spectra laser system as part of our advanced approach to laser tattoo removal and pigment treatment.",
  },

  serviceArea: {
    primary: "McAllen, TX",
    nearby: [
      "McAllen",
      "Edinburg",
      "Mission",
      "Pharr",
      "San Juan",
      "Alton",
      "Hidalgo County",
    ],
  },

  seo: {
    defaultTitle: "Laser Tattoo Removal & PMU Correction in McAllen, TX",
    titleTemplate: "%s | Akasha Laser Studio",
    defaultDescription:
      "Akasha Laser Studio offers advanced laser tattoo removal and PMU correction in McAllen, Texas. Book a free, personalized consultation today.",
  },
} as const;

export type Business = typeof business;
