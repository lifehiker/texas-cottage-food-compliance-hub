import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/page-shell";
import { SignInCard } from "@/components/auth/sign-in-card";

export const metadata = buildMetadata(
  "Signup",
  "Create a local workspace account to save Texas cottage food compliance workflows without external OAuth setup.",
  "/signup",
);

export default function SignupPage() {
  return (
    <PageShell
      badge="Create account"
      title="Create your workspace in one step."
      description="Enter a name and email to create a local account for saved labels, templates, and checklist progress."
    >
      <div className="mx-auto max-w-xl">
        <SignInCard />
      </div>
    </PageShell>
  );
}
