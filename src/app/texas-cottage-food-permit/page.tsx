import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { SourceCitation } from "@/components/layout/source-citation";

export const metadata = buildMetadata(
  "Texas Cottage Food Permit",
  "See when Texas cottage food operators are generally exempt from permits and when venue rules or registration details still matter.",
  "/texas-cottage-food-permit",
);

export default function PermitPage() {
  return (
    <PageShell
      badge="Permit intent"
      title="Do you need a permit for cottage food in Texas?"
      description="Most searchers asking this are trying to understand whether they can begin selling without becoming a fully licensed food business. The short answer is usually yes for qualifying cottage foods, but the actual workflow still includes training, labels, and venue-specific checks."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card className="p-8 text-sm leading-7 text-muted">
          <p>
            Texas cottage food operations are generally exempt from the normal licensing and
            inspection path used by many food establishments. That does not mean there are no
            operational steps. Current DSHS guidance still matters for training, direct-sale rules,
            labels, registration updates, and TCS categories.
          </p>
          <p className="mt-4">
            Farmers markets and other venues can still impose their own vendor paperwork. The app
            treats that as a venue workflow issue rather than a blanket state permit issue.
          </p>
        </Card>
        <SourceCitation />
      </div>
    </PageShell>
  );
}
