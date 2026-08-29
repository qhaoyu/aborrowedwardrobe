"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { costumes, type Costume } from "@/lib/costumes";

const AUTO_ADVANCE_MS = 4500;

function pickRandomSlides(): Costume[] {
  const count = 3 + Math.floor(Math.random() * 3); // 3-5
  const shuffled = [...costumes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function RentalCarousel() {
  // Picked client-side only (see the render guard below) — picking during
  // the server render would bake in one random set, then hydration would
  // roll a different one and React would flag a mismatch.
  const [slides, setSlides] = useState<Costume[] | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time random pick after mount, no alternative source for initial state (see cart-context.tsx for the same pattern)
    setSlides(pickRandomSlides());
  }, []);

  useEffect(() => {
    if (!slides || slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [slides]);

  if (!slides) {
    return (
      <div className="mx-auto aspect-[3/4] w-full max-w-sm animate-pulse rounded-sm bg-[color:var(--color-cream)]/10" />
    );
  }

  const active = slides[index];

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-xl">
        {slides.map((costume, i) => (
          <Link
            key={costume.slug}
            href={`/rental/${costume.slug}`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={costume.photo}
              alt={costume.name}
              fill
              sizes="(min-width: 640px) 384px, 100vw"
              className="object-cover object-top"
              priority={i === 0}
            />
          </Link>
        ))}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              aria-label="Previous costume"
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-cream)]/85 text-[color:var(--color-ink)] shadow-md"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
              aria-label="Next costume"
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-cream)]/85 text-[color:var(--color-ink)] shadow-md"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold)]">
            {active.category}
          </p>
          <Link
            href={`/rental/${active.slug}`}
            className="font-serif text-lg text-[color:var(--color-cream)] hover:underline"
          >
            {active.name}
          </Link>
        </div>
        {slides.length > 1 && (
          <div className="flex shrink-0 gap-1.5">
            {slides.map((costume, i) => (
              <button
                key={costume.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${costume.name}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-[color:var(--color-gold)]"
                    : "w-1.5 bg-[color:var(--color-cream)]/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
