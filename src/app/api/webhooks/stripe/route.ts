import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getStripe } from "@/lib/billing";
import { getDb } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/email";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      {
        received: false,
        message:
          "Stripe webhook credentials are not configured. This handler is intentionally guarded for local and preview builds.",
      },
      { status: 202 },
    );
  }

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ message: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await request.text();
  const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

  if (event.type === "checkout.session.completed") {
    const checkout = event.data.object;
    const userId = checkout.metadata?.userId;
    const plan = checkout.metadata?.plan;

    if (userId && plan) {
      await getDb().purchase.create({
        data: {
          userId,
          plan,
          status: "active",
          stripeCustomerId: typeof checkout.customer === "string" ? checkout.customer : null,
          stripeSubscriptionId:
            typeof checkout.subscription === "string" ? checkout.subscription : null,
        },
      });

      if (checkout.customer_details?.email) {
        await sendTransactionalEmail({
          to: checkout.customer_details.email,
          subject: "Subscription confirmed",
          html: `<p>Your ${plan} access is now active.</p>`,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
