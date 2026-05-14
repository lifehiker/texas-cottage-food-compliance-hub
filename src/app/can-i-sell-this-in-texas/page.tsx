import { PageShell } from "@/components/layout/page-shell";
import { SourceCitation } from "@/components/layout/source-citation";
import { EligibilityChecker } from "@/components/eligibility/eligibility-checker";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(
  "Can I Sell This in Texas?",
  "Check whether a product is likely allowed, needs review, or is unsupported under current Texas cottage food guidance.",
  "/can-i-sell-this-in-texas",
);

export default function EligibilityPage() {
  return (
    <PageShell
      badge="Eligibility"
      title="Use product category and channel as a first-pass filter."
      description="The app does not replace category-specific review, but it makes the quick yes, review, or no call much faster before you design labels or prep inventory."
    >
      <div className="mb-6">
        <SourceCitation />
      </div>
      <EligibilityChecker />
    </PageShell>
  );
}
