import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { directSalesRules, disclaimer } from "@/lib/content";
import { PageShell } from "@/components/layout/page-shell";
import { SourceCitation } from "@/components/layout/source-citation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata(
  "Texas Cottage Food Law",
  "Understand the current Texas cottage food workflow in plain English, including direct sales, training, labels, and TCS handling cues.",
  "/texas-cottage-food-law",
);

export default function TexasLawPage() {
  return (
    <PageShell
      badge="Law overview"
      title="Texas cottage food law, translated into the actual seller workflow."
      description="The point is not to reprint the statute. It is to help a seller decide what to make, how to label it, and what has to happen before a direct sale or market day."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-8">
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>
              Texas cottage food rules let qualifying home-based operators produce and sell
              certain foods directly to consumers without becoming a standard licensed food establishment.
            </p>
            <p>
              Current DSHS guidance also adds newer operational detail around registration,
              TCS foods, and label address alternatives. That is why this app treats the workflow
              as a structured checklist instead of a one-time blog post.
            </p>
            <div className="rounded-2xl bg-[#fff8ef] p-5">
              <h2 className="font-semibold text-foreground">What most sellers care about first</h2>
              <ul className="mt-3 space-y-3">
                {directSalesRules.map((rule) => (
                  <li key={rule}>• {rule}</li>
                ))}
              </ul>
            </div>
            <p>{disclaimer}</p>
          </div>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/texas-cottage-food-label-generator">Generate a label</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/texas-cottage-food-checklist">Open checklists</Link>
            </Button>
          </div>
        </Card>
        <SourceCitation />
      </div>
    </PageShell>
  );
}
