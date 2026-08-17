"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";

function SuccessContent() {
  const { clear } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
        Order Confirmed
      </p>
      <h1 className="mt-3 font-serif text-3xl text-[color:var(--color-ink)] sm:text-4xl">
        Terima kasih — thank you.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-ink)]/70">
        Your order has been placed. A confirmation has been sent to your
        email, and if you selected shipping, your batik will be on its way
        from Petaling Street shortly.
      </p>
      {sessionId && (
        <p className="mt-4 text-xs text-[color:var(--color-ink)]/40">
          Reference: {sessionId}
        </p>
      )}
      <Link
        href="/shop"
        className="mt-10 inline-block rounded-sm border border-[color:var(--color-ink)] px-6 py-3 text-sm uppercase tracking-wide text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-cream)]"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
