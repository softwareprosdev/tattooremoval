import { cn } from "@/lib/utils";

/**
 * Elegant static artwork shown when WebGL is unavailable, reduced motion
 * is preferred, or the 3D bundle hasn't mounted yet. Pure CSS/SVG — no
 * JS dependency — so it paints immediately and never blocks LCP.
 */
export function WebGLFallback({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "ink" | "pmu";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-obsidian via-charcoal-500 to-charcoal-300",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-1/2 top-1/2 h-[150%] w-px -translate-x-1/2 -translate-y-1/2 rotate-[25deg] bg-gradient-to-b from-transparent via-laser/80 to-transparent blur-[2px]" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-laser/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-laser-glow/30 blur-2xl" />
      {variant === "hero" ? (
        <svg
          className="relative h-40 w-40 opacity-80"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="url(#g1)"
            strokeWidth="0.5"
          />
          <circle
            cx="100"
            cy="100"
            r="45"
            stroke="url(#g1)"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="200" y2="200">
              <stop offset="0%" stopColor="#A8F0E8" />
              <stop offset="100%" stopColor="#3E8E88" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      ) : null}
    </div>
  );
}
