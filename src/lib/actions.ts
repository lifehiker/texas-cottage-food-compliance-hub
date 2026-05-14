"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { sendTransactionalEmail } from "@/lib/email";
import { getDb } from "@/lib/db";
import { siteConfig } from "@/lib/site";

type LabelInput = {
  title: string;
  businessName: string;
  productName: string;
  ingredients: string;
  allergenStatement?: string;
  netQuantity: string;
  contactCity: string;
  contactState: string;
  contactZip: string;
  addressLine?: string;
  registrationNumber?: string;
  requiredDisclosure: string;
  batchCode?: string;
  madeOnDate?: string;
  isTcsFood: boolean;
  safeHandling: boolean;
  notes?: string;
};

async function getSavedDocumentCount(userId: string) {
  const db = getDb();
  const [labelCount, checklistCount] = await Promise.all([
    db.labelDocument.count({ where: { userId } }),
    db.checklistProgress.count({ where: { userId } }),
  ]);

  return labelCount + checklistCount;
}

export async function saveLabel(input: LabelInput) {
  const session = await auth();

  if (!session?.user?.id) {
    return { ok: false, message: "Sign in to save labels." };
  }

  const db = getDb();
  const count = await getSavedDocumentCount(session.user.id);

  if (session.user.plan === "free") {
    return {
      ok: false,
      message: "Free accounts can preview exports but need a paid plan to build a label library.",
    };
  }

  if (session.user.plan === "solo" && count >= 25) {
    return { ok: false, message: "Solo accounts can save up to 25 label and checklist records." };
  }

  const record = await db.labelDocument.create({
    data: {
      userId: session.user.id,
      ...input,
    },
  });

  if (session.user.email) {
    await sendTransactionalEmail({
      to: session.user.email,
      subject: "Label saved",
      html: `<p>Your label for <strong>${record.productName}</strong> is saved in ${siteConfig.name}.</p>`,
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/labels");

  return { ok: true, message: "Label saved.", id: record.id };
}

export async function saveChecklistProgress(type: "launch" | "market", completedItems: string[]) {
  const session = await auth();

  if (!session?.user?.id) {
    return { ok: false, message: "Sign in to save checklist progress." };
  }

  const plan = session.user.plan || "free";
  const count = await getSavedDocumentCount(session.user.id);

  if (plan === "free") {
    return {
      ok: false,
      message: "Free accounts can use the checklist, but saving progress requires a paid plan.",
    };
  }

  if (plan === "solo" && count >= 25) {
    return {
      ok: false,
      message: "Solo accounts can save up to 25 label and checklist records.",
    };
  }

  await getDb().checklistProgress.upsert({
    where: {
      userId_type: {
        userId: session.user.id,
        type,
      },
    },
    update: {
      completedItems: completedItems as Prisma.InputJsonValue,
    },
    create: {
      userId: session.user.id,
      type,
      completedItems: completedItems as Prisma.InputJsonValue,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/checklists");

  return { ok: true, message: "Checklist progress saved." };
}

export async function startFallbackCheckout(plan: "solo" | "seller-pro" | "educator") {
  return {
    ok: false,
    message:
      `Stripe credentials are not configured for the ${plan} checkout flow in this environment. ` +
      "The pricing UI is live, but payment activation still needs production keys.",
  };
}
