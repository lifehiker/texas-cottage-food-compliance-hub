import { Suspense } from "react";
import { notFound } from "next/navigation";

import { LabelForm } from "@/components/label/label-form";
import { PageShell } from "@/components/layout/page-shell";
import { templates } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = templates.find((item) => item.slug === slug);
  if (!template) return {};

  return buildMetadata(
    template.title,
    `${template.summary} Build and customize this Texas cottage food label template.`,
    `/templates/${slug}`,
  );
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = templates.find((item) => item.slug === slug);

  if (!template) notFound();

  return (
    <PageShell
      badge={template.category}
      title={template.title}
      description={template.summary}
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-gray-100" />}>
        <LabelForm prefill={template.prefillData} />
      </Suspense>
    </PageShell>
  );
}
