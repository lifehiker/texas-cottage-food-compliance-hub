# FORGE PRD Tasks

Last updated: 2026-05-14 after deployment-auth remediation, rebuild, lint, dev-server startup, host-trust verification, local auth smoke test, route smoke tests, and Docker availability check

Status legend:
- [x] Complete
- [ ] Remaining
- [~] In progress

Execution order: foundation -> data/auth -> core workflows -> secondary workflows -> marketing/pages -> deployment -> QA

## 1. Foundation

- [x] Read `PRD.md` end-to-end
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end
- [x] Confirm app uses Next.js App Router + TypeScript
- [x] Confirm `output: "standalone"` is enabled in `next.config.ts`
- [x] Audit current Next.js 15 usage for build/runtime compatibility
- [x] Audit current design system, layout shell, and shared UI quality
- [x] Ensure no network-fetched fonts or other build-time external fetches are used
- [x] Ensure third-party SDKs are lazy-initialized with missing-env guards

## 2. Data Model

- [x] Prisma schema exists for `User`
- [x] Prisma schema exists for `Account`
- [x] Prisma schema exists for `Session`
- [x] Prisma schema exists for `VerificationToken`
- [x] Prisma schema exists for `LabelDocument`
- [x] Prisma schema exists for `ChecklistProgress`
- [x] Prisma schema exists for `Template`
- [x] Prisma schema exists for `Purchase`
- [x] Audit schema fields against PRD-required workflows and plan limits
- [x] Confirm migrations and local DB work for current schema
- [x] Seed template data safely for local/dev/prod fallback

## 3. Auth

- [x] NextAuth v5 base setup exists
- [x] Deployment-safe local credentials auth exists
- [x] Host trust is configured for proxy deployments to prevent `UntrustedHost`
- [x] Audit auth session shaping and route protection
- [x] Verify dashboard/save flows work for local auth and do not crash without external auth credentials

## 4. Core Workflows

### Label generator
- [x] Label generator route exists
- [x] Audit label form fields against PRD
- [x] Audit live preview behavior
- [x] Audit required disclosure handling
- [x] Audit required-field validation and warnings
- [x] Audit print/PDF export behavior
- [x] Audit save-label flow, plan gating, and dashboard surfacing

### Checklists
- [x] Checklist route exists
- [x] Launch checklist UI exists
- [x] Market day checklist UI exists
- [x] Audit checklist persistence for logged-in users
- [x] Audit free vs paid behavior against PRD expectations

### Eligibility and channel guidance
- [x] Eligibility route exists
- [x] Audit guided-tool behavior against PRD
- [x] Ensure outputs include likely allowed / needs review / unsupported states
- [x] Ensure source citations and disclaimer are present on rule-driven flows
- [x] Ensure sales-channel guidance is implemented clearly enough for direct sale / market / pickup / delivery questions

### Saved documents and templates
- [x] Dashboard route exists
- [x] Label library route exists
- [x] Checklist dashboard route exists
- [x] Template dashboard route exists
- [x] Audit saved labels library functionality
- [x] Audit saved checklist progress display
- [x] Audit template library count, access control, and prefill flows
- [x] Ensure 3-5 usable starter templates are available

## 5. Integrations and Safe Fallbacks

### Billing
- [x] Pricing page exists
- [x] Stripe checkout route exists
- [x] Stripe webhook route exists
- [x] Audit billing implementation for lazy initialization and missing-env fallback
- [x] Ensure Solo, Seller Pro, and Educator Toolkit flows degrade gracefully without Stripe credentials
- [x] Ensure plan gating matches PRD

### Email
- [x] Email helper exists
- [x] Audit transactional email behavior for missing-env fallback
- [x] Ensure welcome / saved-label / subscription confirmations are either implemented or safely documented when external credentials are required

### Analytics
- [x] Analytics helper exists
- [x] Audit GA4/PostHog integration for safe optional behavior
- [x] Ensure key events are wired or safely no-op without credentials

### Storage / export
- [x] Confirm no external storage dependency is required for MVP
- [x] Ensure PDF/export works with local/runtime-safe implementation

## 6. User-Facing Pages

### Marketing and SEO pages
- [x] `/`
- [x] `/pricing`
- [x] `/texas-cottage-food-law`
- [x] `/texas-cottage-food-label-generator`
- [x] `/texas-cottage-food-label-requirements`
- [x] `/texas-cottage-food-label-template`
- [x] `/texas-cottage-food-permit`
- [x] `/texas-cottage-food-license`
- [x] `/farmers-market-texas-cottage-food-label`
- [x] `/texas-cottage-food-checklist`
- [x] `/texas-cottage-food-training`
- [x] `/can-i-sell-this-in-texas`
- [x] `/templates/[slug]`
- [x] `/blog/[slug]`
- [x] Audit each page for completeness, polish, internal linking, CTA quality, disclaimer use, and mobile layout

### App pages
- [x] `/dashboard`
- [x] `/dashboard/labels`
- [x] `/dashboard/checklists`
- [x] `/dashboard/templates`
- [x] Audit each dashboard page for completeness, empty states, and navigation

## 7. API / Server Actions

- [x] `saveLabel` server action exists
- [x] `saveChecklistProgress` server action exists
- [x] Stripe checkout route exists
- [x] Stripe webhook route exists
- [x] NextAuth API route exists
- [x] Audit all server actions/routes for runtime errors and missing-env guards
- [x] Verify no third-party SDK is initialized at module scope in server routes/helpers

## 8. Marketing / SEO Infrastructure

- [x] Shared metadata helper exists
- [x] `sitemap.ts` exists
- [x] `robots.ts` exists
- [x] FAQ schema component exists
- [x] Audit per-page metadata quality against PRD keyword strategy
- [x] Audit sitemap/robots output
- [x] Ensure educator toolkit positioning and downloadable sample/fallback exist

## 9. Deployment

- [x] Create production-ready `Dockerfile`
- [x] Ensure Dockerfile only copies directories that exist
- [x] Confirm standalone Next.js output works with Docker layout
- [~] Test `docker build .` if Docker is available
- [x] Confirm environment-variable expectations are documented

## 10. Verification

- [x] Run `npm run build`
- [x] Fix all build errors
- [x] Run `npm run lint`
- [x] Start dev server
- [x] Verify primary routes load without crashes
- [x] Smoke-test interactive features: forms, buttons, navigation, auth entry, save flows, checkout fallbacks
- [x] Review UI visually across core pages and polish rough edges
- [x] Re-read relevant PRD sections after each major phase and update this file
- [x] Create `HUMAN_INPUT_NEEDED.md` for any real credential requirements
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping PRD requirements to code
- [x] Do final pass only after build/dev verification is clean

## Remaining Blocker

- [~] `docker build .` still depends on Docker socket access in this workspace. The Dockerfile has been validated structurally against the current standalone build output, but an actual image build can only run where Docker daemon access is available.

## Final verification notes

- [x] Production build passes on 2026-05-14 after the deployment auth/trust-host fix.
- [x] `npm run lint` passes on 2026-05-14.
- [x] Dev server starts cleanly on 2026-05-14.
- [x] Route checks returned `200` for `/`, `/pricing`, `/login`, `/signup`, `/texas-cottage-food-label-generator`, `/texas-cottage-food-checklist`, `/can-i-sell-this-in-texas`, and `/texas-cottage-food-training`.
- [x] Anonymous `/dashboard` access correctly redirects with `307` to `/login`.
- [x] Local credentials auth flow was exercised through `/api/auth/callback/credentials`, and authenticated `/dashboard` access returned `200`.
- [x] `/api/auth/session` returned a normal null session with production-style forwarded host headers, confirming the `UntrustedHost` deploy failure is fixed.
- [x] Stripe checkout fallback was exercised through `/api/stripe/checkout` and correctly returned guarded `503` behavior without Stripe credentials.
