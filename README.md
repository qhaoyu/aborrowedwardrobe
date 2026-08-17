# A Borrowed Wardrobe

Website for **A Borrowed Wardrobe** — batik shirts and dresses designed and
sold from Petaling Street, Chinatown, Kuala Lumpur. Built with
[Next.js](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS,
with checkout handled by [Stripe](https://stripe.com).

## What's here

- **Storytelling homepage** — brand story, featured pieces, and a teaser for
  the upcoming costume rental experience.
- **Catalogue** (`/shop`) — batik shirts and dresses, filterable by category,
  each with a product detail page (`/shop/[slug]`) covering the motif, story,
  sizes, and price.
- **Cart & Stripe Checkout** (`/cart`) — a client-side cart (persisted to
  `localStorage`) that hands off to a Stripe Checkout Session for payment.
  Success and cancellation land on `/success` and `/cancel`.
- **Our Story** (`/about`) — the longer version of the brand story.
- **Wardrobe Rental — Coming Soon** (`/rental`) — a teaser page for the
  planned costume rental business (renting traditional costumes to tourists
  for photoshoots around Kuala Lumpur), with an interest form.

Product data lives in `src/lib/products.ts` — edit names, prices (in MYR),
descriptions, sizes, and colours there. There are no real product photos yet;
each product uses a generated batik-pattern SVG placeholder
(`src/components/BatikSwatch.tsx`) standing in until real photography is
ready — swap in `<Image>` calls once you have shots.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setting up Stripe

1. Create a [Stripe account](https://dashboard.stripe.com/register) if you
   don't have one.
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Grab your **test** API keys from
   [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
   and fill in `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
4. Restart `npm run dev`. Add items to the cart and check out with a
   [Stripe test card](https://docs.stripe.com/testing#cards) such as
   `4242 4242 4242 4242` (any future expiry, any CVC).
5. When you're ready to accept real payments, switch to your **live** keys
   in production and make sure your Stripe account has completed
   [activation](https://dashboard.stripe.com/account/onboarding).

Checkout Sessions are created server-side in
`src/app/api/checkout/route.ts`. Prices are read from `products.ts` on the
server (never trusted from the client), so the source of truth for pricing
is always that file. Shipping address and phone number are collected as
part of the Stripe-hosted checkout page.

### Going further with Stripe

- To sell in person from the Petaling Street studio, look at
  [Stripe Terminal](https://stripe.com/terminal) or
  [Tap to Pay](https://stripe.com/terminal/tap-to-pay).
- To manage stock, add [Stripe webhooks](https://docs.stripe.com/webhooks)
  (e.g. on `checkout.session.completed`) and connect them to an inventory
  system.
- For the future rental business, Stripe supports
  [pre-authorizations](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method)
  (useful for security deposits) and
  [subscriptions](https://docs.stripe.com/billing/subscriptions/overview) if
  rentals ever move to a recurring model.

## Deploying

This is a standard Next.js app, so it deploys cleanly to
[Vercel](https://vercel.com/new), [Netlify](https://netlify.com), any
Node.js host, or Cloudflare (see below). On whichever platform you pick, set
`STRIPE_SECRET_KEY` as an environment variable/secret, and update
`contactEmail` in `src/lib/site.ts` to your real business email.

### Deploying to Cloudflare Workers

The repo is already wired up for Cloudflare via
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) (config in
`wrangler.jsonc` and `open-next.config.ts`).

1. **One-time login:**
   ```bash
   npx wrangler login
   ```
2. **Set the Stripe secret** (this is the only env var the app actually
   reads at runtime):
   ```bash
   npx wrangler secret put STRIPE_SECRET_KEY
   ```
   Paste your `sk_live_...` (or `sk_test_...` while testing) key when
   prompted. Secrets set this way are encrypted and never appear in
   `wrangler.jsonc` or the repo.
3. **Deploy:**
   ```bash
   npm run cf:deploy
   ```
   This runs `next build`, adapts the output for Cloudflare, and deploys the
   Worker. You'll get a `*.workers.dev` URL immediately.
4. **Point your domain at it:** in the Cloudflare dashboard, go to
   **Workers & Pages → aborrowedwardrobe → Settings → Domains & Routes** and
   add your custom domain. If your domain's DNS already lives on Cloudflare,
   this is a one-click step; otherwise Cloudflare will walk you through
   moving the domain's nameservers over first.

Other useful scripts:

- `npm run cf:build` — build and adapt for Cloudflare without deploying.
- `npm run cf:preview` — build, then run the Worker locally via Wrangler
  (closer to production than `next dev`).
- `npm run cf:typegen` — regenerate `cloudflare-env.d.ts` if you add
  bindings (KV, R2, etc.) to `wrangler.jsonc`.

**Continuous deploys:** instead of running `npm run cf:deploy` by hand, you
can connect the GitHub repo under **Workers & Pages → Create → Connect to
Git** in the Cloudflare dashboard so every push to `main` deploys
automatically (set `STRIPE_SECRET_KEY` as a secret there too — build-time
environment variables and runtime secrets are configured separately in that
UI).

`compatibility_flags` in `wrangler.jsonc` includes `nodejs_compat`, which
the Stripe SDK needs to run on Workers — don't remove it.

## Project structure

```
wrangler.jsonc            # Cloudflare Worker config
open-next.config.ts       # OpenNext Cloudflare adapter config
src/
  app/
    page.tsx               # Homepage
    shop/page.tsx           # Catalogue
    shop/[slug]/page.tsx    # Product detail
    cart/page.tsx           # Cart
    api/checkout/route.ts   # Stripe Checkout Session creation
    success/, cancel/       # Post-checkout pages
    about/page.tsx          # Brand story
    rental/page.tsx         # Wardrobe rental teaser
  components/               # Navbar, Footer, ProductCard, BatikSwatch, etc.
  lib/
    products.ts             # Product catalogue data
    cart-context.tsx        # Client-side cart state
    stripe.ts               # Server-side Stripe client
    site.ts                 # Site-wide config (contact email, address)
```

## Next steps / ideas

- Swap `BatikSwatch` placeholders for real product photography.
- Add real customer accounts / order history if needed (Stripe Checkout
  alone doesn't require this).
- Build out the rental booking flow once ready — the `/rental` page currently
  only collects interest via a `mailto:` form.
