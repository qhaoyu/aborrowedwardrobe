import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Lets a customer reach Stripe's hosted Customer Portal (view receipts,
// update shipping/payment details) without any accounts or passwords of
// our own. Access is gated on the Checkout Session ID from their own
// success-page URL — proof they completed that specific purchase —
// rather than a bare email, which anyone could type in for anyone else.
export async function POST(request: NextRequest) {
  let body: { session_id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const sessionId = body.session_id;
  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ error: "Missing order reference." }, { status: 400 });
  }

  const origin = request.nextUrl.origin;

  try {
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    const customerId =
      typeof checkoutSession.customer === "string"
        ? checkoutSession.customer
        : checkoutSession.customer?.id;

    if (!customerId) {
      return NextResponse.json(
        { error: "No account found for this order." },
        { status: 404 },
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/success?session_id=${sessionId}`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not open account portal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
