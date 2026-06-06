import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, PackageCheck, ScrollText } from "lucide-react";

import {
  citationBullets,
  directSalesRules,
  faqItems,
  homepageStats,
  templates,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SourceCitation } from "@/components/layout/source-citation";
import { TemplateCard } from "@/components/templates/template-card";

export const metadata = buildMetadata(
  "Texas cottage food labels, checklists, and eligibility workflows",
  "Generate compliant Texas cottage food labels, validate required fields, check product fit, and prep for market day with source-linked workflows.",
  "/",
);

const workflowCards = [
  {
    icon: FileText,
    title: "Build the label once",
    body: "Generate the required Texas disclosure, ingredient, allergen, address or registration, and TCS fields in one pass.",
  },
  {
    icon: PackageCheck,
    title: "Check if the product fits",
    body: "Move quickly from product category and channel to a practical allowed, review, or unsupported decision.",
  },
  {
    icon: ScrollText,
    title: "Prep for launch and market day",
    body: "Use saved checklists for training, packaging, signage, and event readiness.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pt-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pt-20">
        <Card className="overflow-hidden p-8 sm:p-10">
          <Badge>Texas-specific workflow</Badge>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-brand-dark sm:text-6xl">
            Stop stitching together PDFs, posts, and label templates.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Texas Cottage Food Compliance Hub turns current state guidance into a practical
            label builder, eligibility checker, saved document workspace, and market-day prep
            system for home bakers and small sellers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/texas-cottage-food-label-generator">
                Open label generator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/can-i-sell-this-in-texas">Check product eligibility</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {homepageStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-[#fffaf4] p-4">
                <p className="text-2xl font-semibold text-brand-dark">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="paper-grid p-8">
            <div className="space-y-4 rounded-[24px] bg-white/88 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
                The workflow sequence
              </p>
              <div className="space-y-4">
                {[
                  "Can I sell this in Texas?",
                  "What has to be on the label?",
                  "Can I use this sales channel?",
                  "What do I need before market day?",
                ].map((step, index) => (
                  <div key={step} className="flex items-center gap-4 rounded-2xl border border-border bg-[#fff8ef] p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium text-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <SourceCitation />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {workflowCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="p-6">
                <Icon className="h-6 w-6 text-brand" />
                <h2 className="mt-5 text-xl font-semibold text-brand-dark">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{card.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <Card className="p-8">
          <h2 className="text-3xl font-semibold text-brand-dark">What the app keeps in view</h2>
          <div className="mt-6 space-y-3">
            {citationBullets.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-7 text-muted">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-8">
          <h2 className="text-3xl font-semibold text-brand-dark">Direct-sale and online reminders</h2>
          <div className="mt-6 space-y-3">
            {directSalesRules.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-7 text-muted">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sage" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <Badge>Template library</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-brand-dark">Start from realistic label packs</h2>
          </div>
          <Button asChild variant="ghost">
            <Link href="/dashboard/templates">View saved templates</Link>
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          {templates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {faqItems.map((item) => (
          <Card key={item.question} className="p-6">
            <h3 className="text-lg font-semibold text-brand-dark">{item.question}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{item.answer}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
