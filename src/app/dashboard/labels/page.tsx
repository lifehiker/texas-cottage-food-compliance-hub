import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardLabelsPage() {
  const session = await auth();

  const labels = session?.user?.id
    ? await getDb().labelDocument.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  return (
    <PageShell
      badge="Saved labels"
      title="Your label library"
      description="Every saved label stays editable and reusable for future product runs."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {labels.length ? (
          labels.map((label) => (
            <Card key={label.id} className="p-6">
              <h2 className="text-xl font-semibold text-brand-dark">{label.productName}</h2>
              <p className="mt-1 text-sm text-muted">{label.businessName}</p>
              <p className="mt-4 text-sm leading-7 text-muted">{label.ingredients}</p>
            </Card>
          ))
        ) : (
          <Card className="p-6">
            <p className="text-sm text-muted">
              Save a label from the generator to start building your reusable library.
            </p>
          </Card>
        )}
      </div>
    </PageShell>
  );
}
