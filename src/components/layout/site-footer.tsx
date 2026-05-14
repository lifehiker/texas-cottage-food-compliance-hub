import Link from "next/link";

import { sourceNotes } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-[#fff9f2]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-brand-dark">Built around official Texas guidance</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            This app operationalizes the current Texas cottage food guidance into labels,
            checklists, and market workflows. It does not replace the official source.
          </p>
        </div>
        <div className="space-y-3 text-sm text-muted">
          {sourceNotes.map((source) => (
            <div key={source.href}>
              <Link href={source.href} target="_blank" className="font-medium text-foreground underline-offset-4 hover:underline">
                {source.title}
              </Link>
              <p>{source.note}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
