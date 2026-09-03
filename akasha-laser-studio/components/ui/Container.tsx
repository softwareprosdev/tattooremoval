import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: ElementType<{ className?: string; children?: ReactNode }>;
}) {
  return <Tag className={cn("container", className)}>{children}</Tag>;
}
