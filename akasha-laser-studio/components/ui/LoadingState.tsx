import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-5 w-5 animate-spin text-current", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
      />
    </svg>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 py-24 text-charcoal-100"
    >
      <LoadingSpinner className="h-8 w-8" />
      <span className="text-sm uppercase tracking-widest2">{label}</span>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="section-py">
      <div className="container animate-pulse space-y-6">
        <div className="mx-auto h-4 w-40 rounded bg-champagne-200" />
        <div className="mx-auto h-10 w-2/3 rounded bg-champagne-200" />
        <div className="mx-auto h-4 w-1/2 rounded bg-champagne-100" />
      </div>
    </div>
  );
}
