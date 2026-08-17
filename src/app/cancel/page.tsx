import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
        Checkout Cancelled
      </p>
      <h1 className="mt-3 font-serif text-3xl text-[color:var(--color-ink)] sm:text-4xl">
        No charge was made.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-ink)]/70">
        Your cart is still saved, whenever you&apos;re ready to check out.
      </p>
      <Link
        href="/cart"
        className="mt-10 inline-block rounded-sm bg-[color:var(--color-terracotta)] px-6 py-3 text-sm uppercase tracking-wide text-[color:var(--color-cream)]"
      >
        Return to Cart
      </Link>
    </div>
  );
}
