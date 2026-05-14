import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { trainingResources } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { SourceCitation } from "@/components/layout/source-citation";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata(
  "Texas Cottage Food Training",
  "Review Texas cottage food training reminders and the educator toolkit workflow for classes, cohorts, and extension-style support programs.",
  "/texas-cottage-food-training",
);

export default function TrainingPage() {
  return (
    <PageShell
      badge="Training"
      title="Training for sellers, plus a reusable toolkit for educators and programs."
      description="Texas sellers still need a basic food handler training step. This page pairs that operational reminder with the classroom-friendly educator toolkit described in the PRD."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card className="p-8">
          <p className="text-sm leading-7 text-muted">{siteConfig.trainingRule}</p>
          <div className="mt-6 space-y-3">
            {trainingResources.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-white/80 p-4 text-sm leading-7 text-muted">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[24px] border border-brand/15 bg-[#fff8ef] p-5">
            <h2 className="text-xl font-semibold text-brand-dark">Educator toolkit</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              For cohort programs, extension-style classes, and market-training workshops, the Educator Toolkit bundles printable exercises, sample labels, and facilitator notes into a one-time classroom pack.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/pricing">Buy Educator Toolkit</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/educator-toolkit-sample.txt" download>
                  Download sample resource
                </Link>
              </Button>
            </div>
          </div>
        </Card>
        <SourceCitation />
      </div>
    </PageShell>
  );
}
