import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServiceCard({
  eyebrow,
  name,
  summary,
  href,
  cta,
  className,
}: {
  eyebrow: string;
  name: string;
  summary: string;
  href: string;
  cta: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-sm border border-champagne-300/70 bg-ivory-100 p-8 shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-glow sm:p-10",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-laser/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"
      />
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h3 className="mt-4 text-2xl sm:text-3xl">{name}</h3>
        <p className="prose-body mt-4 max-w-md">{summary}</p>
      </div>
      <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest2 text-charcoal-500">
        {cta}
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
