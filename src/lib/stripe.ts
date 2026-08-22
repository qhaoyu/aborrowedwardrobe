import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment before checking out.",
    );
  }
  if (!stripeClient) {
    // Next.js bundles these API routes for the default (Node) runtime, so
    // Stripe resolves its Node-targeted build, which talks to the API over
    // raw http/https sockets. That doesn't work under Cloudflare Workers'
    // nodejs_compat sandbox — every request fails with a connection error
    // after exhausting retries. Forcing the fetch-based client sidesteps
    // that entirely, since Workers fully supports fetch() natively.
    stripeClient = new Stripe(secretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });
  }
  return stripeClient;
}
