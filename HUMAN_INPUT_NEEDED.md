# Human Input Needed

The app runs locally without external credentials by using:
- demo credential sign-in instead of Google OAuth
- guarded Stripe checkout fallbacks
- guarded Resend email fallbacks
- optional analytics no-ops
- local SQLite via `DATABASE_URL=file:./prisma/dev.db`

Provide the following only when you want to activate those production integrations.

## Required For Google OAuth

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

Steps:
1. Create an OAuth client in Google Cloud.
2. Add the production callback URL: `https://your-domain.com/api/auth/callback/google`
3. Set `NEXTAUTH_URL` to your public site URL.
4. Set a strong `NEXTAUTH_SECRET`.

## Required For Stripe Billing

- `STRIPE_SECRET_KEY`
- `STRIPE_SOLO_PRICE_ID`
- `STRIPE_PRO_PRICE_ID`
- `STRIPE_EDUCATOR_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`

Steps:
1. Create one recurring monthly price for Solo.
2. Create one recurring monthly price for Seller Pro.
3. Create one one-time price for the Educator Toolkit.
4. Point a Stripe webhook at `/api/webhooks/stripe`.
5. Subscribe the webhook to at least `checkout.session.completed`.

## Required For Resend Transactional Email

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

Used for:
- welcome emails on account creation
- saved-label confirmations
- subscription confirmations

## Optional Analytics

- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

If omitted, pageviews and event tracking safely no-op.
