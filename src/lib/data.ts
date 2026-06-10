import { Prisma } from "@prisma/client";

import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { templates } from "@/lib/content";

export async function ensureTemplateSeed() {
  const db = getDb();

  for (const template of templates) {
    await db.template.upsert({
      where: { slug: template.slug },
      update: {
        title: template.title,
        category: template.category,
        summary: template.summary,
        prefillData: template.prefillData as Prisma.InputJsonValue,
        isPremium: template.isPremium,
      },
      create: {
        slug: template.slug,
        title: template.title,
        category: template.category,
        summary: template.summary,
        prefillData: template.prefillData as Prisma.InputJsonValue,
        isPremium: template.isPremium,
      },
    });
  }
}

export async function getSessionUser() {
  const session = await auth();
  return session?.user || null;
}

export async function getPurchasePlan(userId: string) {
  const purchase = await getDb().purchase.findFirst({
    where: { userId, status: "active" },
    orderBy: { updatedAt: "desc" },
  });

  return purchase?.plan || "free";
}
