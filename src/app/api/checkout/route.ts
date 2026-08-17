import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

type CheckoutLine = {
  slug: string;
  size: string;
  quantity: number;
};

const MAX_QUANTITY_PER_LINE = 20;

export async function POST(request: NextRequest) {
  let body: { lines?: CheckoutLine[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const line of lines) {
    const product = getProductBySlug(line.slug);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product: ${line.slug}` },
        { status: 400 },
      );
    }
    if (!product.sizes.includes(line.size)) {
      return NextResponse.json(
        { error: `Invalid size "${line.size}" for ${product.name}.` },
        { status: 400 },
      );
    }
    const quantity = Math.floor(Number(line.quantity));
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_LINE) {
      return NextResponse.json(
        { error: `Invalid quantity for ${product.name}.` },
        { status: 400 },
      );
    }

    lineItems.push({
      quantity,
      price_data: {
        currency: "myr",
        unit_amount: Math.round(product.priceMYR * 100),
        product_data: {
          name: `${product.name} (${line.size})`,
          description: product.description,
        },
      },
    });
  }

  const origin = request.nextUrl.origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      shipping_address_collection: {
        allowed_countries: [
          "MY", "SG", "ID", "TH", "US", "GB", "AU", "CA", "NZ", "JP", "KR", "CN", "HK", "TW", "DE", "FR",
        ],
      },
      phone_number_collection: { enabled: true },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Could not create checkout session." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
