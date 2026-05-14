# Forge Completion Audit

Last updated: 2026-05-14

## Foundation

- Next.js App Router + TypeScript: [package.json](/opt/forge-builds/texas-cottage-food-compliance-hub/package.json), [src/app/layout.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/layout.tsx)
- Standalone production output: [next.config.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/next.config.ts)
- Tailwind/global design system: [src/app/globals.css](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/globals.css), [src/components/ui](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/ui)
- Next/ESLint compatibility fix: [eslint.config.mjs](/opt/forge-builds/texas-cottage-food-compliance-hub/eslint.config.mjs)

## Data Model

- Auth and app models: [prisma/schema.prisma](/opt/forge-builds/texas-cottage-food-compliance-hub/prisma/schema.prisma)
- Initial migration and local DB: [prisma/migrations/20260512090158_init/migration.sql](/opt/forge-builds/texas-cottage-food-compliance-hub/prisma/migrations/20260512090158_init/migration.sql), [prisma/prisma/dev.db](/opt/forge-builds/texas-cottage-food-compliance-hub/prisma/prisma/dev.db)
- Template seeding: [src/lib/data.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/data.ts), [src/lib/content.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/content.ts)

## Auth

- NextAuth v5 setup with Prisma adapter: [src/auth.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/auth.ts)
- Auth route handler: [src/app/api/auth/[...nextauth]/route.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/api/auth/[...nextauth]/route.ts)
- Proxy-safe host trust, container env alignment, and secret fallback for deployment: [src/auth.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/auth.ts), [Dockerfile](/opt/forge-builds/texas-cottage-food-compliance-hub/Dockerfile), [src/lib/site.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/site.ts), [HUMAN_INPUT_NEEDED.md](/opt/forge-builds/texas-cottage-food-compliance-hub/HUMAN_INPUT_NEEDED.md)
- Public login and signup entry routes: [src/app/login/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/login/page.tsx), [src/app/signup/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/signup/page.tsx)
- Local credentials sign-in UI: [src/components/auth/sign-in-card.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/auth/sign-in-card.tsx)

## Core Workflows

- Label generator page: [src/app/texas-cottage-food-label-generator/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/texas-cottage-food-label-generator/page.tsx)
- Label form validation and fixed disclosure: [src/lib/label.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/label.ts), [src/components/label/label-form.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/label/label-form.tsx)
- Single-fire `label_started` analytics behavior: [src/components/label/label-form.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/label/label-form.tsx)
- Live label preview: [src/components/label/label-preview.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/label/label-preview.tsx)
- PDF export: [src/lib/pdf.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/pdf.tsx)
- Save-label flow and plan gating: [src/lib/actions.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/actions.ts)
- Checklist page and persistence: [src/app/texas-cottage-food-checklist/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/texas-cottage-food-checklist/page.tsx), [src/components/checklists/checklist.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/checklists/checklist.tsx), [src/lib/actions.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/actions.ts)
- Eligibility checker and channel guidance: [src/app/can-i-sell-this-in-texas/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/can-i-sell-this-in-texas/page.tsx), [src/components/eligibility/eligibility-checker.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/eligibility/eligibility-checker.tsx)
- Template library and prefilled workflows: [src/app/texas-cottage-food-label-template/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/texas-cottage-food-label-template/page.tsx), [src/app/templates/[slug]/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/templates/[slug]/page.tsx), [src/components/templates/template-card.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/templates/template-card.tsx)

## Marketing And SEO Pages

- Homepage: [src/app/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/page.tsx)
- Pricing: [src/app/pricing/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/pricing/page.tsx)
- Law overview: [src/app/texas-cottage-food-law/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/texas-cottage-food-law/page.tsx)
- Label requirements: [src/app/texas-cottage-food-label-requirements/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/texas-cottage-food-label-requirements/page.tsx)
- Permit intent page: [src/app/texas-cottage-food-permit/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/texas-cottage-food-permit/page.tsx)
- License intent page: [src/app/texas-cottage-food-license/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/texas-cottage-food-license/page.tsx)
- Farmers market workflow page: [src/app/farmers-market-texas-cottage-food-label/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/farmers-market-texas-cottage-food-label/page.tsx)
- Training and educator toolkit page: [src/app/texas-cottage-food-training/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/texas-cottage-food-training/page.tsx), [public/educator-toolkit-sample.txt](/opt/forge-builds/texas-cottage-food-compliance-hub/public/educator-toolkit-sample.txt)
- Blog examples: [src/app/blog/[slug]/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/blog/[slug]/page.tsx)

## Dashboard

- Workspace overview: [src/app/dashboard/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/dashboard/page.tsx)
- Saved labels: [src/app/dashboard/labels/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/dashboard/labels/page.tsx)
- Saved checklists: [src/app/dashboard/checklists/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/dashboard/checklists/page.tsx)
- Saved templates: [src/app/dashboard/templates/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/dashboard/templates/page.tsx)

## Billing, Email, Analytics, And Fallbacks

- Stripe lazy initialization, request-origin checkout URLs, and checkout fallback: [src/lib/billing.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/billing.ts), [src/app/api/stripe/checkout/route.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/api/stripe/checkout/route.ts), [src/lib/site.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/site.ts)
- Stripe webhook guard: [src/app/api/webhooks/stripe/route.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/api/webhooks/stripe/route.ts)
- Resend lazy initialization and fallback: [src/lib/email.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/email.ts)
- Welcome, saved-label, and subscription emails: [src/auth.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/auth.ts), [src/lib/actions.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/actions.ts), [src/app/api/webhooks/stripe/route.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/api/webhooks/stripe/route.ts)
- Optional analytics with safe no-op behavior: [src/lib/analytics.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/analytics.tsx), [src/components/label/label-form.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/label/label-form.tsx), [src/components/checklists/checklist.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/checklists/checklist.tsx), [src/components/marketing/checkout-button.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/marketing/checkout-button.tsx)

## SEO Infrastructure

- Metadata helper: [src/lib/seo.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/seo.ts)
- Root metadata and keywords: [src/app/layout.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/layout.tsx)
- FAQ schema: [src/components/layout/faq-schema.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/layout/faq-schema.tsx)
- Sitemap: [src/app/sitemap.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/sitemap.ts)
- Robots: [src/app/robots.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/app/robots.ts)
- Source citation blocks and disclaimers: [src/components/layout/source-citation.tsx](/opt/forge-builds/texas-cottage-food-compliance-hub/src/components/layout/source-citation.tsx), [src/lib/content.ts](/opt/forge-builds/texas-cottage-food-compliance-hub/src/lib/content.ts)

## Deployment

- Docker build for standalone Next.js app: [Dockerfile](/opt/forge-builds/texas-cottage-food-compliance-hub/Dockerfile)
- Docker ignore rules: [.dockerignore](/opt/forge-builds/texas-cottage-food-compliance-hub/.dockerignore)
- Local/production env examples: [.env.example](/opt/forge-builds/texas-cottage-food-compliance-hub/.env.example), [HUMAN_INPUT_NEEDED.md](/opt/forge-builds/texas-cottage-food-compliance-hub/HUMAN_INPUT_NEEDED.md)

## Deferred External-Credential Items

- Stripe checkout and subscription activation require real Stripe keys, price IDs, and a webhook secret.
- Resend delivery requires a verified sender and API key.
- GA4/PostHog require public analytics keys if tracking should be active.

The app still runs without those credentials because every integration path is guarded and falls back to a safe local/demo behavior instead of crashing the build or runtime.

## Verification Snapshot

- `npm run build` passes on 2026-05-14.
- `npm run lint` passes on 2026-05-14.
- `npm run dev` starts cleanly on 2026-05-14.
- `node .next/standalone/server.js` starts cleanly on 2026-05-14.
- Verified route responses on 2026-05-14:
  - `200`: `/`, `/pricing`, `/login`, `/signup`, `/texas-cottage-food-label-generator`, `/texas-cottage-food-checklist`, `/can-i-sell-this-in-texas`, `/texas-cottage-food-training`
  - `307` anonymous redirect: `/dashboard` to `/login`
  - `200` authenticated access after local credentials sign-in: `/dashboard`
  - normal null-session response from `/api/auth/session` with forwarded production host headers in dev and standalone runtime
- Verified guarded billing fallback on 2026-05-14:
  - `503` from `/api/stripe/checkout` without Stripe credentials
- `docker build .` could not be completed because Docker socket access is denied in this environment, not because of a Dockerfile syntax or app-build failure.
