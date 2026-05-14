import { notFound } from "next/navigation";

import { blogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};

  return buildMetadata(post.title, post.excerpt, `/blog/${slug}`);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <PageShell badge="Blog" title={post.title} description={post.excerpt}>
      <Card className="max-w-3xl p-8">
        <div className="space-y-6 text-base leading-8 text-muted">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
