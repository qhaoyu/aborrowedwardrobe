"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/rental", label: "Rental" },
];

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-line)] bg-[color:var(--color-cream)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-lg tracking-wide text-[color:var(--color-ink)] sm:text-xl">
            A Borrowed Wardrobe
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
            Petaling Street · Kuala Lumpur
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wide text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-terracotta)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="relative text-sm uppercase tracking-wide text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-terracotta)]"
          >
            Cart
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--color-terracotta)] px-1 text-xs text-[color:var(--color-cream)]">
                {count}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-4 sm:hidden">
          <Link href="/cart" className="relative text-sm text-[color:var(--color-ink)]">
            Cart
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--color-terracotta)] px-1 text-xs text-[color:var(--color-cream)]">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span className="h-px w-5 bg-[color:var(--color-ink)]" />
            <span className="h-px w-5 bg-[color:var(--color-ink)]" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-[color:var(--color-line)] px-5 pb-4 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm uppercase tracking-wide text-[color:var(--color-ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
