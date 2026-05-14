import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { launchChecklist, marketChecklist } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Checklist } from "@/components/checklists/checklist";
import { PageShell } from "@/components/layout/page-shell";
import { SourceCitation } from "@/components/layout/source-citation";

export const metadata = buildMetadata(
  "Texas Cottage Food Checklist",
  "Use launch and market-day checklists for Texas cottage food training, labeling, packaging, and seller prep.",
  "/texas-cottage-food-checklist",
);

export default async function ChecklistPage() {
  const session = await auth();
  const progress = session?.user?.id
    ? await getDb().checklistProgress.findMany({ where: { userId: session.user.id } })
    : [];
  const launchCompleted =
    (progress.find((item) => item.type === "launch")?.completedItems as string[] | undefined) ||
    [];
  const marketCompleted =
    (progress.find((item) => item.type === "market")?.completedItems as string[] | undefined) ||
    [];

  return (
    <PageShell
      badge="Checklists"
      title="Move from setup to first market day without missing the operational details."
      description="The launch checklist helps with training, labeling, packaging, and channels. The market checklist handles the physical day-of prep."
    >
      <div className="mb-6">
        <SourceCitation />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Checklist
          type="launch"
          title="Launch checklist"
          description="Work through the first-time seller setup sequence."
          items={launchChecklist}
          initialCompleted={launchCompleted}
        />
        <Checklist
          type="market"
          title="Market day checklist"
          description="Use this the night before and morning of every event."
          items={marketChecklist}
          initialCompleted={marketCompleted}
        />
      </div>
    </PageShell>
  );
}
