import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/texas-cottage-food-label-generator", label: "Label Generator" },
  { href: "/can-i-sell-this-in-texas", label: "Eligibility" },
  { href: "/texas-cottage-food-checklist", label: "Checklists" },
  { href: "/pricing", label: "Pricing" },
];

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="no-print sticky top-0 z-40 border-b border-border/70 bg-[#fff8ef]/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-sm font-bold text-white">
            TX
          </div>
          <div>
            <div className="text-sm font-semibold tracking-[0.14em] text-brand-dark uppercase">
              Texas Cottage Food
            </div>
            <div className="text-sm text-muted">Compliance Hub</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={session?.user ? "/dashboard" : "/login"}
            className="hidden text-sm text-muted sm:inline-block"
          >
            {session?.user ? "Dashboard" : "Login"}
          </Link>
          <Button asChild variant="default" size="sm">
            <Link href={session?.user ? "/dashboard" : "/signup"}>
              {session?.user ? "Open workspace" : "Start free"}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
