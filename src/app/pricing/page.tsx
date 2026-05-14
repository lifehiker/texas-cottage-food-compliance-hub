import { plans } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { CheckoutButton } from "@/components/marketing/checkout-button";
import { SignInCard } from "@/components/auth/sign-in-card";

export const metadata = buildMetadata(
  "Pricing",
  "Choose free, Solo, Seller Pro, or the Educator Toolkit for Texas cottage food compliance workflows.",
  "/pricing",
);

export default function PricingPage() {
  return (
    <PageShell
      badge="Pricing"
      title="Use the free workflow now, then pay when you need a saved library."
      description="The product keeps the information public and puts the paywall around saved workflows, reusable templates, and advanced exports."
    >
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <SignInCard />
        <div className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <Card key={plan.id} className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">
                {plan.name}
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-foreground">{plan.price}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-muted">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-6">
                {plan.id === "free" ? (
                  <p className="text-sm font-medium text-sage">
                    Free access is already open on the main workflows.
                  </p>
                ) : (
                  <CheckoutButton plan={plan.id as "solo" | "seller-pro" | "educator"}>
                    Start {plan.name}
                  </CheckoutButton>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
