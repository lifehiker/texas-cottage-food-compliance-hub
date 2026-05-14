import Link from "next/link";

import { Card } from "@/components/ui/card";
import { sourceNotes } from "@/lib/site";

export function SourceCitation() {
  return (
    <Card className="rounded-[24px] border-brand/15 bg-[#fff7ed] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
        Source citations
      </p>
      <div className="mt-4 space-y-4 text-sm text-muted">
        {sourceNotes.map((source) => (
          <div key={source.href}>
            <Link href={source.href} target="_blank" className="font-semibold text-foreground underline-offset-4 hover:underline">
              {source.title}
            </Link>
            <p>{source.note}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
