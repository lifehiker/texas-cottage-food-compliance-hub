import Stripe from "stripe";

let stripeClient: Stripe | null | undefined;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  return stripeClient;
}

export const planPriceMap = {
  solo: process.env.STRIPE_SOLO_PRICE_ID,
  "seller-pro": process.env.STRIPE_PRO_PRICE_ID,
  educator: process.env.STRIPE_EDUCATOR_PRICE_ID,
} as const;
