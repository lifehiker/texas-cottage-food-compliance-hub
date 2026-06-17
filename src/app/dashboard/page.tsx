import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ensureTemplateSeed } from "@/lib/data";
import { getDb } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/page-shell";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  try {
    await ensureTemplateSeed();
  } catch {
    // seed already exists or write-lock contention; proceed
  }
  const db = getDb();
  const [labels, checklists, templateCount] = await Promise.all([
    db.labelDocument.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      take: 3,
    }),
    db.checklistProgress.findMany({ where: { userId: session.user.id } }),
    db.template.count(),
  ]);

  return (
    <PageShell
      badge="Dashboard"
      title={`Welcome back, ${session.user.name || "seller"}.`}
      description="Your saved labels, checklist progress, and starter templates live here."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted">Active plan</p>
          <h2 className="mt-2 text-3xl font-semibold text-brand-dark">{session.user.plan}</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Free users can preview exports. Paid tiers unlock saved workflow libraries and premium templates.
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted">Saved labels</p>
          <h2 className="mt-2 text-3xl font-semibold text-brand-dark">{labels.length}</h2>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/dashboard/labels">Open label library</Link>
          </Button>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted">Available templates</p>
          <h2 className="mt-2 text-3xl font-semibold text-brand-dark">{templateCount}</h2>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/dashboard/templates">Browse templates</Link>
          </Button>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-brand-dark">Recent labels</h3>
          <div className="mt-4 space-y-4">
            {labels.length ? (
              labels.map((label) => (
                <div key={label.id} className="rounded-2xl border border-border bg-[#fff8ef] p-4">
                  <p className="font-semibold text-foreground">{label.productName}</p>
                  <p className="text-sm text-muted">{label.businessName}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No saved labels yet. Start in the generator.</p>
            )}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-brand-dark">Checklist progress</h3>
          <div className="mt-4 space-y-4">
            {checklists.length ? (
              checklists.map((entry) => {
                const items = entry.completedItems as string[];
                return (
                  <div key={entry.id} className="rounded-2xl border border-border bg-[#fff8ef] p-4">
                    <p className="font-semibold capitalize text-foreground">{entry.type}</p>
                    <p className="text-sm text-muted">{items.length} items complete</p>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted">No saved progress yet. Use the checklist pages to track work.</p>
            )}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
