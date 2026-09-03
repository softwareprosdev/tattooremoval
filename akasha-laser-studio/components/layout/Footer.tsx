import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/config/business";

const FOOTER_NAV = [
  { label: "Tattoo Removal", href: "/tattoo-removal" },
  { label: "PMU Correction", href: "/pmu-correction" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_NAV = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

export function Footer() {
  return (
    <footer className="border-t border-champagne-300/60 bg-charcoal-500 text-ivory-100">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-xl">{business.name}</p>
          <p className="mt-1 text-xs uppercase tracking-widest2 text-taupe-200">
            {business.legalName}
          </p>
          <p className="prose-body mt-5 max-w-xs text-champagne-100/90">
            Advanced laser tattoo removal and PMU correction, with
            personalized treatment plans built around you.
          </p>
          <a
            href={business.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-champagne-100 hover:text-ivory-100"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            {business.social.instagram.handle}
          </a>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest2 text-taupe-200">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-champagne-100/90 hover:text-ivory-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest2 text-taupe-200">
            Visit Us
          </h3>
          <address className="prose-body mt-5 max-w-xs text-champagne-100/90 not-italic">
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {business.address.line1}
                <br />
                {business.address.city}, {business.address.state}{" "}
                {business.address.zip}
              </span>
            </span>
          </address>
          <ul className="mt-4 space-y-2">
            {business.phones.map((phone) => (
              <li key={phone.number}>
                <a
                  href={phone.href}
                  className="flex items-center gap-2 text-sm text-champagne-100/90 hover:text-ivory-100"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {phone.number}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest2 text-taupe-200">
            Hours
          </h3>
          <ul className="mt-5 space-y-2 text-sm text-champagne-100/90">
            {business.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className={h.closed ? "text-taupe-200" : ""}>
                  {h.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-champagne-100/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-champagne-100/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.legalName}. All rights
            reserved.
          </p>
          <ul className="flex gap-6">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ivory-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
