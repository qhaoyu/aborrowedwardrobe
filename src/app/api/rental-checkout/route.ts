import { NextRequest, NextResponse } from "next/server";
import { getCostumeBySlug } from "@/lib/costumes";
import { getDropoffMethod, getPickupSlot, getRentalDuration } from "@/lib/rental";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

type RentalCheckoutBody = {
  costumeSlug?: string;
  date?: string;
  durationId?: string;
  pickupSlotId?: string;
  dropoffId?: string;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: NextRequest) {
  let body: RentalCheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const costume = body.costumeSlug ? getCostumeBySlug(body.costumeSlug) : undefined;
  if (!costume) {
    return NextResponse.json({ error: "Unknown costume." }, { status: 400 });
  }

  const duration = body.durationId ? getRentalDuration(body.durationId) : undefined;
  if (!duration) {
    return NextResponse.json({ error: "Choose a rental duration." }, { status: 400 });
  }

  // A duration that's locked to one pickup slot (the 10-hour full day) always
  // resolves to that slot server-side — the client can't override it.
  const pickupSlotId = duration.requiresPickupSlot ?? body.pickupSlotId;
  const pickupSlot = pickupSlotId ? getPickupSlot(pickupSlotId) : undefined;
  if (!pickupSlot) {
    return NextResponse.json({ error: "Choose a pickup time." }, { status: 400 });
  }

  const dropoff = body.dropoffId ? getDropoffMethod(body.dropoffId) : undefined;
  if (!dropoff) {
    return NextResponse.json({ error: "Choose a drop-off method." }, { status: 400 });
  }

  if (!body.date || !DATE_RE.test(body.date)) {
    return NextResponse.json({ error: "Choose a pickup date." }, { status: 400 });
  }
  const today = new Date().toISOString().slice(0, 10);
  if (body.date < today) {
    return NextResponse.json({ error: "Pickup date can't be in the past." }, { status: 400 });
  }

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    quantity: 1,
    price_data: {
      currency: "myr",
      unit_amount: Math.round(duration.priceMYR * 100),
      product_data: {
        name: `${costume.name} — ${duration.label} rental`,
        description: `Pickup ${body.date}, ${pickupSlot.label}. Return: ${dropoff.label}.`,
      },
    },
  };

  const origin = request.nextUrl.origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [lineItem],
      customer_creation: "always",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/rental/${costume.slug}`,
      phone_number_collection: { enabled: true },
      // Delivery drop-off needs an address for the courier to collect from;
      // self drop-off doesn't need one collected at all.
      ...(dropoff.id === "delivery"
        ? { shipping_address_collection: { allowed_countries: ["MY"] } }
        : {}),
      metadata: {
        type: "rental",
        costumeSlug: costume.slug,
        costumeName: costume.name,
        pickupDate: body.date,
        pickupSlot: pickupSlot.id,
        duration: duration.id,
        dropoff: dropoff.id,
      },
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
