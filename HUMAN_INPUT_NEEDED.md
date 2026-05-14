# Human Input Needed

The app runs locally without external credentials by using:
- built-in local credentials sign-in
- guarded Stripe checkout fallbacks
- guarded Resend email fallbacks
- optional analytics no-ops
- local SQLite via `DATABASE_URL=file:./prisma/dev.db`

Provide the following only when you want to activate those production integrations.

## Recommended For Production Auth

- `AUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- Optional: `AUTH_URL` if your reverse proxy does not forward the public host/protocol cleanly

Steps:
1. Generate a strong secret, for example with `openssl rand -base64 32`.
2. Set `AUTH_SECRET` in production to override the baked-in fallback secret.
3. Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin for the deployment.
4. Leave `AUTH_TRUST_HOST=true` so Auth.js accepts the deployment host behind the proxy.
5. If auth redirects still point at an internal hostname, set `AUTH_URL` to the same public HTTPS origin.

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
