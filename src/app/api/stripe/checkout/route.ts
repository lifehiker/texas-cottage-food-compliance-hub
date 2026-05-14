import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { getStripe, planPriceMap } from "@/lib/billing";
import { absoluteUrl } from "@/lib/site";

export async function POST(request: NextRequest) {
  const session = await auth();
  const body = (await request.json()) as { plan?: "solo" | "seller-pro" | "educator" };
  const plan = body.plan;
  const validPlans = ["solo", "seller-pro", "educator"] as const;

  if (!plan || !validPlans.includes(plan)) {
    return NextResponse.json({ message: "Invalid plan." }, { status: 400 });
  }

  const stripe = getStripe();
  const priceId = planPriceMap[plan];

  if (!stripe || !priceId) {
    return NextResponse.json(
      {
        message:
          "Stripe credentials are not configured in this environment. Pricing and gating are active, but checkout activation still needs production keys.",
      },
      { status: 503 },
    );
  }

  if (!session?.user?.email || !session.user.id) {
    return NextResponse.json({ message: "Sign in before starting checkout." }, { status: 401 });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: plan === "educator" ? "payment" : "subscription",
    customer_email: session.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: absoluteUrl("/pricing?checkout=success", request.nextUrl.origin),
    cancel_url: absoluteUrl("/pricing?checkout=cancelled", request.nextUrl.origin),
    metadata: {
      userId: session.user.id,
      plan,
    },
  });

  return NextResponse.json({ url: checkout.url });
}
