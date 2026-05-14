import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { SourceCitation } from "@/components/layout/source-citation";

export const metadata = buildMetadata(
  "Texas Cottage Food License",
  "Understand the difference between a Texas cottage food exemption, food handler training, registration updates, and a traditional food business license.",
  "/texas-cottage-food-license",
);

export default function LicensePage() {
  return (
    <PageShell
      badge="License intent"
      title="Do you need a cottage food license in Texas?"
      description="People often search for a license when they really need the answer to a broader question: can they legally start, what training is required, and what has to appear on the label."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card className="p-8 text-sm leading-7 text-muted">
          <p>
            Under the current Texas cottage food framework, qualifying sellers operate under an
            exemption model rather than a standard licensed food-establishment model. The practical
            tasks are completing food handler training, using compliant labels, staying within
            eligible categories, and following direct-sale rules.
          </p>
          <p className="mt-4">
            The app keeps this distinction visible so you do not confuse a license search with a
            missing label or training step.
          </p>
        </Card>
        <SourceCitation />
      </div>
    </PageShell>
  );
}
