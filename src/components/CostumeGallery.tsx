"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";
import TiltCard from "@/components/TiltCard";
import { formatMYR } from "@/lib/products";
import { rentalDurationOptions } from "@/lib/rental";
import type { Costume } from "@/lib/costumes";

const fromPriceMYR = Math.min(...rentalDurationOptions.map((d) => d.priceMYR));

export default function CostumeGallery({ costumes }: { costumes: Costume[] }) {
  const [filter, setFilter] = useState<string | "all">("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const active = costumes.find((c) => c.slug === openSlug) ?? null;
  const lenis = useLenis();

  // Categories aren't a fixed set — as costumes get their real names, their
  // category becomes the state/culture that name identifies, so the list of
  // groups grows over time. Sorting alphabetically keeps that list ordered
  // without needing a curated list to update by hand.
  const categories = useMemo(
    () => Array.from(new Set(costumes.map((c) => c.category))).sort(),
    [costumes]
  );
  const visibleCategories = filter === "all" ? categories : [filter];

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSlug(null);
      if (e.key === "ArrowRight") {
        setPhotoIndex((i) => (i + 1) % active.gallery.length);
      }
      if (e.key === "ArrowLeft") {
        setPhotoIndex((i) => (i - 1 + active.gallery.length) % active.gallery.length);
      }
    };
    document.addEventListener("keydown", onKey);
    // See DesignPicker for why both the CSS lock and lenis.stop() are needed.
    lenis?.stop();
    const { documentElement } = document;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
      documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [active, lenis]);

  function open(slug: string) {
    setPhotoIndex(0);
    setOpenSlug(slug);
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-full border px-4 py-1.5 text-sm uppercase tracking-wide transition-colors ${
            filter === "all"
              ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)] text-[color:var(--color-cream)]"
              : "border-[color:var(--color-line)] text-[color:var(--color-ink)]/70 hover:border-[color:var(--color-terracotta)]"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm uppercase tracking-wide transition-colors ${
              filter === cat
                ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)] text-[color:var(--color-cream)]"
                : "border-[color:var(--color-line)] text-[color:var(--color-ink)]/70 hover:border-[color:var(--color-terracotta)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-14">
        {visibleCategories.map((cat) => {
          const items = costumes.filter((c) => c.category === cat);
          return (
            <section key={cat}>
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-[color:var(--color-line)] pb-3">
                <h2 className="font-serif text-xl text-[color:var(--color-ink)]">
                  {cat}
                </h2>
                <p className="shrink-0 text-xs uppercase tracking-wide text-[color:var(--color-ink)]/50">
                  {items.length} look{items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {items.map((costume) => (
                  <button
                    key={costume.slug}
                    type="button"
                    onClick={() => open(costume.slug)}
                    className="group text-left"
                  >
                    <TiltCard className="overflow-hidden rounded-sm border border-[color:var(--color-line)] shadow-sm transition-shadow duration-300 ease-out group-hover:shadow-lg">
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <Image
                          src={costume.photo}
                          alt={costume.name}
                          fill
                          sizes="(min-width: 768px) 25vw, 50vw"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    </TiltCard>
                    <p className="mt-2 font-serif text-base text-[color:var(--color-ink)]">
                      {costume.name}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          <div
            className="absolute inset-0 bg-[color:var(--color-ink)]/70"
            onClick={() => setOpenSlug(null)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
            className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-sm bg-[color:var(--color-cream)] shadow-xl sm:max-w-3xl sm:flex-row sm:rounded-sm"
          >
            <div className="relative aspect-[2/3] w-full shrink-0 sm:w-1/2">
              <Image
                src={active.gallery[photoIndex]}
                alt={`${active.name} — photo ${photoIndex + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              {active.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setPhotoIndex((i) => (i - 1 + active.gallery.length) % active.gallery.length)
                    }
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-cream)]/85 text-lg text-[color:var(--color-ink)] shadow-md"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoIndex((i) => (i + 1) % active.gallery.length)}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-cream)]/85 text-lg text-[color:var(--color-ink)] shadow-md"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div
              data-lenis-prevent
              className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
                    {active.category}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl text-[color:var(--color-ink)]">
                    {active.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenSlug(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[color:var(--color-ink)]/60 hover:bg-[color:var(--color-line)]"
                >
                  ✕
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-ink)]/75">
                {active.description}
              </p>

              <Link
                href={`/rental/${active.slug}`}
                className="mt-5 inline-block rounded-sm bg-[color:var(--color-terracotta)] px-6 py-3 text-center text-sm uppercase tracking-wide text-[color:var(--color-cream)] transition-opacity hover:opacity-90"
              >
                Rent This Look — from {formatMYR(fromPriceMYR)}
              </Link>

              {active.gallery.length > 1 && (
                <div className="mt-6 grid grid-cols-5 gap-2">
                  {active.gallery.map((photo, i) => (
                    <button
                      key={photo}
                      type="button"
                      onClick={() => setPhotoIndex(i)}
                      aria-label={`Show photo ${i + 1}`}
                      aria-pressed={photoIndex === i}
                      className={`relative aspect-square overflow-hidden rounded-sm border transition-colors ${
                        photoIndex === i
                          ? "border-[color:var(--color-terracotta)]"
                          : "border-[color:var(--color-line)] hover:border-[color:var(--color-terracotta)]/50"
                      }`}
                    >
                      <Image src={photo} alt="" fill sizes="80px" className="object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-start gap-2 border-t border-[color:var(--color-line)] pt-4 text-xs text-[color:var(--color-ink)]/60">
                <span aria-hidden>📍</span>
                <p>
                  <span className="font-medium text-[color:var(--color-ink)]/80">
                    Good spot for photos in this look:
                  </span>{" "}
                  {active.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
