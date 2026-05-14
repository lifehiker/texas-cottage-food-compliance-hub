import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TemplateDefinition } from "@/lib/content";

export function TemplateCard({ template }: { template: TemplateDefinition }) {
  return (
    <Card className="flex h-full flex-col justify-between p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge>{template.category}</Badge>
          {template.isPremium ? <span className="text-xs font-semibold text-brand-dark">Premium</span> : null}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-brand-dark">{template.title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted">{template.summary}</p>
        </div>
      </div>
      <Button asChild variant={template.isPremium ? "secondary" : "default"} className="mt-6">
        <Link href={`/templates/${template.slug}`}>Open template</Link>
      </Button>
    </Card>
  );
}
