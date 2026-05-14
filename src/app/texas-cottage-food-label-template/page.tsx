import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { templates } from "@/lib/content";
import { PageShell } from "@/components/layout/page-shell";
import { TemplateCard } from "@/components/templates/template-card";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata(
  "Texas Cottage Food Label Template",
  "Start from ready-made Texas cottage food label templates for cookies, candy, market products, and TCS review flows.",
  "/texas-cottage-food-label-template",
);

export default function LabelTemplatePage() {
  return (
    <PageShell
      badge="Template library"
      title="Use a free Texas cottage food label template, then save and reuse the polished version."
      description="The free template layer gets you moving quickly. Paid plans add saved libraries, premium packs, and repeated export workflows."
    >
      <div className="grid gap-6 lg:grid-cols-4">
        {templates.map((template) => (
          <TemplateCard key={template.slug} template={template} />
        ))}
      </div>
      <div className="mt-8">
        <Button asChild>
          <Link href="/texas-cottage-food-label-generator">Build from a blank label instead</Link>
        </Button>
      </div>
    </PageShell>
  );
}
