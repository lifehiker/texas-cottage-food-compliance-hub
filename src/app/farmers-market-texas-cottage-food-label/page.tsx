import { buildMetadata } from "@/lib/seo";
import { marketChecklist } from "@/lib/content";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { SourceCitation } from "@/components/layout/source-citation";

export const metadata = buildMetadata(
  "Farmers Market Texas Cottage Food Label",
  "Prepare a Texas farmers market label setup with the required disclosure, backup ingredient notes, and day-of packing workflow.",
  "/farmers-market-texas-cottage-food-label",
);

export default function MarketLabelPage() {
  return (
    <PageShell
      badge="Market workflow"
      title="Market labels are only half the job. The day-of workflow matters too."
      description="A farmers market seller needs more than one correct sticker. The working system includes backup ingredient notes, disclosure visibility, packing order, and venue-specific vendor prep."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card className="p-8">
          <div className="space-y-3 text-sm leading-7 text-muted">
            {marketChecklist.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-white/80 p-4">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <SourceCitation />
      </div>
    </PageShell>
  );
}
