## Texas Cottage Food Compliance Hub

Texas-specific compliance workflows for home bakers and market sellers. The app combines a label generator, eligibility checker, checklist tracking, reusable templates, and source-linked guidance in a Next.js 15 app that can run without external credentials.

## Getting Started

Install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma with SQLite
- NextAuth v5 local credentials flow
- Stripe and Resend with guarded fallbacks when credentials are absent

## Environment

Copy `.env.example` to `.env` for local development if needed. The app works locally with:

```bash
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET="local-dev-secret-change-me"
AUTH_TRUST_HOST="true"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

External integrations are optional. See [HUMAN_INPUT_NEEDED.md](/opt/forge-builds/texas-cottage-food-compliance-hub/HUMAN_INPUT_NEEDED.md) for the production-only credentials.

## Verification

```bash
npm run lint
npm run build
```

The Docker deployment expects standalone Next.js output and a writable SQLite path. The checked-in `Dockerfile` is configured for that flow.
