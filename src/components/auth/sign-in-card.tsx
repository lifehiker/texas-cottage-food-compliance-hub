"use client";

import { FormEvent, useState, useTransition } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SignInCard() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleDemoSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const name = String(form.get("name") || "");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        name,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError("We could not start the demo session.");
      } else if (result?.url) {
        window.location.href = result.url;
      }
    });
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-brand-dark">Save labels and checklists</h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            Use the built-in local account flow for this deployment. If the email is new, the
            workspace is created automatically.
          </p>
        </div>
        <form className="space-y-3" onSubmit={handleDemoSignIn}>
          <Input name="name" placeholder="Your name" />
          <Input name="email" type="email" placeholder="seller@example.com" required />
          <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Opening workspace..." : "Open workspace"}
          </Button>
        </form>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </div>
    </Card>
  );
}
