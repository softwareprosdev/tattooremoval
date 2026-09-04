import { cn } from "@/lib/utils";

/**
 * Soft, slowly-drifting warm light behind the hero — candlelit spa ambience
 * rather than a flat dark backdrop. Pure CSS, no JS/WebGL dependency, so it
 * paints immediately and works even where the 3D scene doesn't.
 */
export function AmbientBokeh({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute -left-16 top-1/4 h-[28rem] w-[28rem] rounded-full bg-champagne-400/25 blur-[110px] motion-safe:animate-drift-a" />
      <div className="absolute -right-10 -top-10 h-96 w-96 rounded-full bg-metal-light/20 blur-[100px] motion-safe:animate-drift-b" />
      <div className="absolute bottom-[-6rem] left-1/3 h-80 w-80 rounded-full bg-laser-deep/20 blur-[120px] motion-safe:animate-drift-c" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-champagne-200/15 blur-[100px] motion-safe:animate-drift-a" />
    </div>
  );
}
