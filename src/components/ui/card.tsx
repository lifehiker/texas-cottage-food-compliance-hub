import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-border bg-surface/90 shadow-[var(--shadow)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
