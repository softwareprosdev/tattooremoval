import { business } from "@/lib/config/business";

/**
 * JSON-LD structured data for the business. Deliberately omits
 * aggregateRating/review, priceRange, and any credential claims that
 * have not been supplied and verified by the business — never
 * fabricate these fields.
 */
export function LocalBusinessSchema() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.akashalaser.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    legalName: business.legalName,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    telephone: business.phones[0]?.number,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address.geo.latitude,
      longitude: business.address.geo.longitude,
    },
    openingHoursSpecification: business.hours
      .filter((h) => !h.closed)
      .map((h) => {
        const [open, close] = h.hours
          .split("–")
          .map((s) => s.trim().replace(/\s/g, " "));
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${h.day}`,
          opens: to24Hour(open ?? ""),
          closes: to24Hour(close ?? ""),
        };
      }),
    sameAs: [business.social.instagram.url].filter(Boolean),
    areaServed: business.serviceArea.nearby.map((name) => ({
      "@type": "City",
      name,
    })),
    priceRange: undefined,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function to24Hour(time: string): string {
  const match = time.match(/(\d+):(\d+)\s?(AM|PM)/i);
  if (!match) return "09:00";
  let [, hourStr, minute, meridiem] = match;
  let hour = parseInt(hourStr ?? "9", 10);
  if (meridiem?.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (meridiem?.toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}
