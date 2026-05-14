"use client";

import { useState, useTransition } from "react";

import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

export function CheckoutButton({
  plan,
  children,
}: {
  plan: "solo" | "seller-pro" | "educator";
  children: React.ReactNode;
}) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function startCheckout() {
    startTransition(async () => {
      setMessage(null);
      trackEvent("checkout_started", { plan });
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = (await response.json()) as { url?: string; message?: string };

      if (data.url) {
        trackEvent("checkout_redirected", { plan });
        window.location.href = data.url;
        return;
      }

      trackEvent("checkout_blocked", { plan });
      setMessage(data.message || "Checkout is unavailable right now.");
    });
  }

  return (
    <div className="space-y-3">
      <Button onClick={startCheckout} className="w-full" variant={plan === "seller-pro" ? "default" : "secondary"}>
        {pending ? "Preparing..." : children}
      </Button>
      {message ? <p className="text-sm leading-6 text-muted">{message}</p> : null}
    </div>
  );
}
