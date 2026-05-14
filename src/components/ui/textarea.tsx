import { forwardRef, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-28 w-full rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm outline-none placeholder:text-muted/60 focus:border-brand/45",
      className,
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
