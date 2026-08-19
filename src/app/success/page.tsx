"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";

function SuccessContent() {
  const { clear } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleManageOrders() {
    if (!sessionId) return;
    setPortalLoading(true);
    setPortalError(null);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Could not open account portal.");
      }
      window.location.href = data.url;
    } catch (err) {
      setPortalError(
        err instanceof Error ? err.message : "Could not open account portal.",
      );
      setPortalLoading(false);
    }
  }

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
      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          href="/shop"
          className="inline-block rounded-sm border border-[color:var(--color-ink)] px-6 py-3 text-sm uppercase tracking-wide text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-cream)]"
        >
          Continue Shopping
        </Link>
        {sessionId && (
          <button
            type="button"
            onClick={handleManageOrders}
            disabled={portalLoading}
            className="text-sm uppercase tracking-wide text-[color:var(--color-ink)]/60 underline underline-offset-4 hover:text-[color:var(--color-terracotta)] disabled:opacity-50"
          >
            {portalLoading ? "Opening…" : "Manage your order"}
          </button>
        )}
        {portalError && <p className="text-sm text-red-600">{portalError}</p>}
      </div>
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
