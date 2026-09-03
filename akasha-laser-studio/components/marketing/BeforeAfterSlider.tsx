"use client";

import * as React from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type BeforeAfterResult = {
  id: string;
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  treatmentType: string;
  stage?: string;
  caption?: string;
};

export function BeforeAfterSlider({ result }: { result: BeforeAfterResult }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState(50);
  const [dragging, setDragging] = React.useState(false);

  const updateFromClientX = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, updateFromClientX]);

  return (
    <figure className="overflow-hidden rounded-sm border border-champagne-300/70 bg-ivory-100 shadow-soft">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full select-none overflow-hidden bg-champagne-100 touch-none"
        onPointerDown={(e) => {
          setDragging(true);
          updateFromClientX(e.clientX);
        }}
      >
        <Image
          src={result.afterSrc}
          alt={`${result.alt} — after`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <Image
            src={result.beforeSrc}
            alt={`${result.alt} — before`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-ivory-100 shadow-soft"
          style={{ left: `${position}%` }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Before/after comparison for ${result.alt}`}
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight")
                setPosition((p) => Math.min(100, p + 5));
            }}
            className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-ivory-100 text-charcoal-500 shadow-soft"
          >
            <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <span className="absolute left-3 top-3 rounded-xs bg-obsidian/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-ivory-100">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-xs bg-obsidian/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-ivory-100">
          After
        </span>
      </div>

      <figcaption className="p-5">
        <p className="text-sm font-semibold text-charcoal-500">
          {result.treatmentType}
          {result.stage ? (
            <span className="ml-2 font-normal text-taupe-300">
              {result.stage}
            </span>
          ) : null}
        </p>
        {result.caption ? (
          <p className="prose-body mt-1 text-sm">{result.caption}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}

/**
 * Grid of before/after results with the required disclaimer. Renders an
 * elegant placeholder state when no real client photos have been
 * supplied yet — never seed this with fabricated results.
 */
export function BeforeAfterGallery({
  results = [],
  className,
}: {
  results?: BeforeAfterResult[];
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {results.map((r) => (
            <BeforeAfterSlider key={r.id} result={r} />
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-champagne-400 bg-champagne-50 px-8 py-20 text-center">
          <p className="prose-body mx-auto max-w-md">
            Real client results will be featured here as they become
            available. Every result shared is authentic to Akasha Laser
            Studio — we never publish generated or stock imagery as
            treatment outcomes.
          </p>
        </div>
      )}
      <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-taupe-300">
        Individual results vary. Images shown are provided for educational
        purposes and may not represent typical results.
      </p>
    </div>
  );
}
