import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardChecklistsPage() {
  const session = await auth();

  const progress = session?.user?.id
    ? await getDb().checklistProgress.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  return (
    <PageShell
      badge="Saved checklists"
      title="Checklist history"
      description="Track which launch and market prep tasks you have already completed."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {progress.length ? (
          progress.map((entry) => (
            <Card key={entry.id} className="p-6">
              <h2 className="text-xl font-semibold capitalize text-brand-dark">{entry.type}</h2>
              <p className="mt-3 text-sm text-muted">
                {Array.isArray(entry.completedItems) ? entry.completedItems.length : 0} saved items complete
              </p>
            </Card>
          ))
        ) : (
          <Card className="p-6">
            <p className="text-sm text-muted">
              Save progress from the checklist page to see it summarized here.
            </p>
          </Card>
        )}
      </div>
    </PageShell>
  );
}
