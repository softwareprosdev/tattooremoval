import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { ToastProvider } from "@/components/ui/Toast";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { business } from "@/lib/config/business";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.akashalaser.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: business.seo.defaultTitle,
    template: business.seo.titleTemplate,
  },
  description: business.seo.defaultDescription,
  keywords: [
    "tattoo removal McAllen TX",
    "laser tattoo removal McAllen",
    "tattoo removal near McAllen",
    "PMU correction McAllen",
    "permanent makeup removal McAllen",
    "eyebrow tattoo removal McAllen",
  ],
  authors: [{ name: business.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: business.name,
    title: business.seo.defaultTitle,
    description: business.seo.defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: business.seo.defaultTitle,
    description: business.seo.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2B2925",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-charcoal-500 focus:px-4 focus:py-2 focus:text-sm focus:text-ivory-100"
        >
          Skip to main content
        </a>
        <LocalBusinessSchema />
        <ToastProvider>
          <Navbar />
          <main id="main-content" className="flex-1 pb-20 lg:pb-0">
            {children}
          </main>
          <Footer />
          <MobileCTA />
        </ToastProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
