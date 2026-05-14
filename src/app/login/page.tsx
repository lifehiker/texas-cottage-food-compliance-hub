import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/page-shell";
import { SignInCard } from "@/components/auth/sign-in-card";

export const metadata = buildMetadata(
  "Login",
  "Start a local workspace session to save Texas cottage food labels, templates, and checklist progress.",
  "/login",
);

export default function LoginPage() {
  return (
    <PageShell
      badge="Workspace access"
      title="Open your saved label and checklist workspace."
      description="This deployment uses a local credentials flow so the app works without third-party OAuth setup."
    >
      <div className="mx-auto max-w-xl">
        <SignInCard />
      </div>
    </PageShell>
  );
}
