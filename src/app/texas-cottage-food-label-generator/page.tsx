import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageShell } from "@/components/layout/page-shell";
import { SourceCitation } from "@/components/layout/source-citation";
import { LabelForm } from "@/components/label/label-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(
  "Texas Cottage Food Label Generator",
  "Generate a source-linked Texas cottage food label with required disclosure, allergen notes, TCS fields, and print/PDF output.",
  "/texas-cottage-food-label-generator",
);

export default function LabelGeneratorPage() {
  return (
    <PageShell
      badge="Interactive tool"
      title="Build a Texas cottage food label with the required fields already in the workflow."
      description="This generator keeps the disclosure fixed, surfaces TCS-specific fields when needed, and makes it easy to print or export the finished label."
    >
      <div className="mb-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <Badge>Built for sellers</Badge>
          <p className="mt-4 text-sm leading-7 text-muted">
            Use the generator for packaged baked goods, candies, jams, and other current
            cottage-food categories. For refrigerated or vendor-sold products, the app also
            surfaces date-made and safe-handling cues.
          </p>
        </Card>
        <SourceCitation />
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-gray-100" />}>
        <LabelForm />
      </Suspense>
    </PageShell>
  );
}
