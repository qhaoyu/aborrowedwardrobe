"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function AddToCartForm({
  slug,
  sizes,
}: {
  slug: string;
  sizes: string[];
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
          Size
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`h-10 min-w-10 rounded-sm border px-3 text-sm transition-colors ${
                size === s
                  ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)] text-[color:var(--color-cream)]"
                  : "border-[color:var(--color-line)] text-[color:var(--color-ink)] hover:border-[color:var(--color-terracotta)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
          Quantity
        </p>
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-10 w-10 rounded-sm border border-[color:var(--color-line)] text-lg"
          >
            −
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="h-10 w-10 rounded-sm border border-[color:var(--color-line)] text-lg"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => {
            addItem(slug, size, quantity);
            setAdded(true);
          }}
          className="rounded-sm bg-[color:var(--color-terracotta)] px-8 py-3 text-sm uppercase tracking-wide text-[color:var(--color-cream)] transition-opacity hover:opacity-90"
        >
          Add to Cart
        </button>
        {added && (
          <Link
            href="/cart"
            className="text-sm uppercase tracking-wide text-[color:var(--color-ink)] underline underline-offset-4"
          >
            View Cart →
          </Link>
        )}
      </div>
    </div>
  );
}
