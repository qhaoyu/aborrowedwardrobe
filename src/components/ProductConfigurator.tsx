"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BatikSwatch from "@/components/BatikSwatch";
import DesignPicker from "@/components/DesignPicker";
import { useCart } from "@/lib/cart-context";
import {
  designs,
  formatMYR,
  patternLabels,
  type Design,
  type Product,
} from "@/lib/products";

export default function ProductConfigurator({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [design, setDesign] = useState<Design | null>(null);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="relative">
        {product.photo ? (
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-sm shadow-md">
            <Image
              src={product.photo}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover object-top"
            />
          </div>
        ) : (
          <BatikSwatch
            pattern={product.pattern}
            colorway={product.colorway}
            className="aspect-square w-full rounded-sm shadow-md"
          />
        )}

        {/* A wax-seal-style stamp that picks up the chosen motif, tying the photo to the choice on the right without pretending we have a photo of every combination. */}
        <div
          className={`absolute bottom-4 right-4 h-20 w-20 overflow-hidden rounded-full shadow-lg ring-4 ring-[color:var(--color-cream)] transition-transform duration-500 ${
            design ? "scale-100" : "scale-0"
          }`}
        >
          {design && (
            <BatikSwatch
              pattern={design.motif}
              colorway={design.colorway}
              className="h-full w-full"
            />
          )}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-terracotta)]">
          {design ? `${patternLabels[design.motif]} · ${design.colorwayName} · ` : ""}
          {product.category === "shirt" ? "Shirt" : "Dress"}
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[color:var(--color-ink)] sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-3 text-xl text-[color:var(--color-ink)]/80">
          {formatMYR(product.priceMYR)}
        </p>

        <p className="mt-6 leading-relaxed text-[color:var(--color-ink)]/80">
          {product.description}
        </p>
        <p className="mt-4 italic leading-relaxed text-[color:var(--color-ink)]/60">
          {product.story}
        </p>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
            Choose Your Motif
          </p>
          <div className="mt-3">
            <DesignPicker designs={designs} value={design} onChange={setDesign} />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
              Size
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
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
              disabled={!design}
              onClick={() => {
                if (!design) return;
                addItem(product.slug, size, design.slug, quantity);
                setAdded(true);
              }}
              className="rounded-sm bg-[color:var(--color-terracotta)] px-8 py-3 text-sm uppercase tracking-wide text-[color:var(--color-cream)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
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
          {!design && (
            <p className="text-xs text-[color:var(--color-ink)]/50">
              Choose a motif above to add this piece to your cart.
            </p>
          )}
        </div>

        <p className="mt-8 text-xs text-[color:var(--color-ink)]/50">
          Ships worldwide, or collect in person from our studio on Petaling
          Street, Chinatown, Kuala Lumpur.
        </p>
      </div>
    </div>
  );
}
