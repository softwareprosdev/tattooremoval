"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Tattoo Removal", href: "/tattoo-removal" },
  { label: "PMU Correction", href: "/pmu-correction" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-ivory-100/95 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-medium tracking-wide text-charcoal-500"
          aria-label="Akasha Laser Studio home"
        >
          AKASHA
          <span className="ml-2 align-middle text-[10px] font-sans font-semibold uppercase tracking-widest2 text-taupe-400">
            Laser Studio
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-sans tracking-wide text-charcoal-300 transition-colors hover:text-charcoal-500",
                pathname === link.href && "text-charcoal-500"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/book-consultation" size="sm">
            Book Free Consultation
          </Button>
        </div>

        <button
          type="button"
          className="p-2 text-charcoal-500 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-champagne-300/60 bg-ivory-100 lg:hidden"
          >
            <nav
              className="flex flex-col gap-1 px-5 py-4"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-sm px-2 py-3 text-base text-charcoal-400 hover:bg-champagne-100/70"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/book-consultation" className="mt-3 w-full">
                Book Free Consultation
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
