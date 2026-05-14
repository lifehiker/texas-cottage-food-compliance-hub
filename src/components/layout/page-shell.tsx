import { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

export function PageShell({
  badge,
  title,
  description,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10 max-w-3xl space-y-5">
        <Badge>{badge}</Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-brand-dark sm:text-5xl">
          {title}
        </h1>
        <p className="text-lg leading-8 text-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}
