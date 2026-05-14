import { forwardRef, InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-2xl border border-border bg-white/90 px-4 text-sm outline-none ring-0 placeholder:text-muted/60 focus:border-brand/45",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
