import { buildMetadata } from "@/lib/seo";
import { labelDisclosureHelp, disclaimer } from "@/lib/content";
import { PageShell } from "@/components/layout/page-shell";
import { SourceCitation } from "@/components/layout/source-citation";
import { Card } from "@/components/ui/card";

export const metadata = buildMetadata(
  "Texas Cottage Food Label Requirements",
  "See the required Texas cottage food label fields, why they matter, and when TCS or registration-specific fields apply.",
  "/texas-cottage-food-label-requirements",
);

export default function LabelRequirementsPage() {
  return (
    <PageShell
      badge="Label requirements"
      title="Every field the Texas label workflow should check before you print."
      description="Use this page when you want the why behind the label generator: what must appear, what can be optional, and what changes for TCS foods or registered operators."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card className="p-8">
          <div className="space-y-4 text-sm leading-7 text-muted">
            {labelDisclosureHelp.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-white/80 p-4">
                {item}
              </div>
            ))}
            <p>{disclaimer}</p>
          </div>
        </Card>
        <SourceCitation />
      </div>
    </PageShell>
  );
}
