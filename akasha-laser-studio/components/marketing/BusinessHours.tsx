import { Clock } from "lucide-react";
import { business } from "@/lib/config/business";
import { cn } from "@/lib/utils";

export function BusinessHours({ className }: { className?: string }) {
  return (
    <div className={cn("", className)}>
      <div className="mb-4 flex items-center gap-2 text-charcoal-500">
        <Clock className="h-4 w-4" aria-hidden="true" />
        <h3 className="text-xs font-semibold uppercase tracking-widest2">
          Business Hours
        </h3>
      </div>
      <dl className="space-y-2 text-sm">
        {business.hours.map((h) => (
          <div key={h.day} className="flex justify-between gap-6">
            <dt className="text-charcoal-100">{h.day}</dt>
            <dd
              className={h.closed ? "text-taupe-300" : "text-charcoal-500"}
            >
              {h.hours}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
