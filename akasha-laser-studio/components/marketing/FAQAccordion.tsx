"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

export function FAQAccordion({
  items,
  className,
}: {
  items: FAQItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-champagne-300/60", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question} className="py-2">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-sans text-base font-medium text-charcoal-500 sm:text-lg">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-taupe-300 transition-transform duration-300",
                    isOpen && "rotate-180 text-charcoal-500"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-premium",
                isOpen
                  ? "grid-rows-[1fr] pb-6 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="prose-body min-h-0 max-w-2xl">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
