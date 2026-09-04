import { cn } from "@/lib/utils";

/**
 * A single hand-drawn orchid stem, rendered as thin line art. A quiet
 * signifier of "spa" that doesn't rely on stock photography — sits low
 * in a corner, never competing with the headline.
 */
export function BotanicalAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 420"
      fill="none"
      className={cn("text-champagne-200", className)}
      aria-hidden="true"
    >
      <path
        d="M60 410 C50 320 90 260 70 190 C54 134 90 80 132 34"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M70 190 C40 178 18 150 22 112"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M90 260 C122 250 148 224 148 188"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      {[
        { cx: 132, cy: 34, r: 17 },
        { cx: 96, cy: 66, r: 12 },
        { cx: 150, cy: 78, r: 10 },
      ].map((bloom, i) => (
        <g key={i} opacity={0.5 - i * 0.08}>
          <circle
            cx={bloom.cx}
            cy={bloom.cy}
            r={bloom.r}
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <circle
            cx={bloom.cx}
            cy={bloom.cy}
            r={bloom.r * 0.32}
            fill="currentColor"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  );
}
