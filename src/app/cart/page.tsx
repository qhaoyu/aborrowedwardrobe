"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { fabricMotifLabels, formatMYR, getDesignBySlug, getProductBySlug } from "@/lib/products";

export default function CartPage() {
  const { lines, removeLine, setQuantity, subtotalMYR } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = lines
    .map((line) => ({
      line,
      product: getProductBySlug(line.slug),
      design: getDesignBySlug(line.designSlug),
    }))
    .filter((entry) => entry.product && entry.design);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Checkout failed.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <h1 className="font-serif text-3xl text-[color:var(--color-ink)]">
          Your cart is empty
        </h1>
        <p className="mt-3 text-sm text-[color:var(--color-ink)]/70">
          Add a shirt or pair of pants from the collection to get started.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-sm bg-[color:var(--color-terracotta)] px-6 py-3 text-sm uppercase tracking-wide text-[color:var(--color-cream)]"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <h1 className="font-serif text-3xl text-[color:var(--color-ink)]">Your Cart</h1>

      <div className="mt-8 flex flex-col divide-y divide-[color:var(--color-line)]">
        {items.map(({ line, product, design }) => {
          if (!product || !design) return null;
          return (
            <div key={`${line.slug}-${line.size}-${line.designSlug}`} className="flex gap-4 py-6">
              <Link href={`/shop/${product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={design.photo}
                  alt={`${fabricMotifLabels[design.motif]} — ${design.name}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="font-serif text-lg text-[color:var(--color-ink)]"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-[color:var(--color-ink)]/60">
                      {fabricMotifLabels[design.motif]} · {design.name} · Size {line.size}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm text-[color:var(--color-ink)]/80">
                    {formatMYR(product.priceMYR * line.quantity)}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-3 pt-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        setQuantity(line.slug, line.size, line.designSlug, line.quantity - 1)
                      }
                      className="h-8 w-8 rounded-sm border border-[color:var(--color-line)]"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        setQuantity(line.slug, line.size, line.designSlug, line.quantity + 1)
                      }
                      className="h-8 w-8 rounded-sm border border-[color:var(--color-line)]"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.slug, line.size, line.designSlug)}
                    className="text-xs uppercase tracking-wide text-[color:var(--color-ink)]/50 underline underline-offset-4 hover:text-[color:var(--color-terracotta)]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4 border-t border-[color:var(--color-line)] pt-6">
        <div className="flex w-full justify-between text-lg sm:w-64">
          <span className="text-[color:var(--color-ink)]/70">Subtotal</span>
          <span className="font-medium text-[color:var(--color-ink)]">
            {formatMYR(subtotalMYR)}
          </span>
        </div>
        <p className="w-full text-xs text-[color:var(--color-ink)]/50 sm:w-64 sm:text-right">
          Shipping and any taxes are calculated at checkout.
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="w-full rounded-sm bg-[color:var(--color-terracotta)] px-6 py-3 text-sm uppercase tracking-wide text-[color:var(--color-cream)] transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-64"
        >
          {loading ? "Redirecting to Stripe…" : "Checkout with Stripe"}
        </button>
      </div>
    </div>
  );
}
