import { auth } from "@/auth";
import { ensureTemplateSeed } from "@/lib/data";
import { getDb } from "@/lib/db";
import { PageShell } from "@/components/layout/page-shell";
import { TemplateCard } from "@/components/templates/template-card";

export const dynamic = "force-dynamic";

export default async function DashboardTemplatesPage() {
  const session = await auth();

  await ensureTemplateSeed();
  const rows = await getDb().template.findMany({ orderBy: { title: "asc" } });

  const templates = rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    category: row.category,
    summary: row.summary,
    isPremium: row.isPremium,
    prefillData: row.prefillData as Record<string, string | boolean>,
  }));

  return (
    <PageShell
      badge="Templates"
      title="Starter templates"
      description="Use these to move quickly from common product types to editable labels."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.slug} template={template} />
        ))}
      </div>
    </PageShell>
  );
}
