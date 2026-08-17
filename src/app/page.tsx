import Link from "next/link";
import BatikSwatch from "@/components/BatikSwatch";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[color:var(--color-line)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-terracotta)]">
              Petaling Street · Chinatown · Kuala Lumpur
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-[color:var(--color-ink)] sm:text-5xl">
              Wear the street you wandered.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[color:var(--color-ink)]/75">
              A Borrowed Wardrobe designs batik shirts and dresses out of a
              small studio in the middle of Petaling Street — for travellers
              who want to carry a piece of Kuala Lumpur home with them.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-sm bg-[color:var(--color-terracotta)] px-6 py-3 text-sm uppercase tracking-wide text-[color:var(--color-cream)] transition-opacity hover:opacity-90"
              >
                Shop the Collection
              </Link>
              <Link
                href="/about"
                className="rounded-sm border border-[color:var(--color-ink)] px-6 py-3 text-sm uppercase tracking-wide text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-cream)]"
              >
                Read Our Story
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <BatikSwatch
              pattern="parang"
              colorway={["#7a2e2e", "#d99a3d"]}
              className="aspect-[3/4] w-full rounded-sm shadow-md"
            />
            <BatikSwatch
              pattern="mega-mendung"
              colorway={["#1e3a5f", "#e8e2d0"]}
              className="mt-8 aspect-[3/4] w-full rounded-sm shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section className="border-b border-[color:var(--color-line)] bg-white/40">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <p className="font-serif text-2xl leading-relaxed text-[color:var(--color-ink)] sm:text-3xl">
            &ldquo;Every motif on our shirts and dresses is chosen for what it
            means, not just how it looks — parang for resilience, kawung for
            balance, truntum for a love that keeps growing.&rdquo;
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
            Designed above a shopfront on Petaling Street
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
              The Collection
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[color:var(--color-ink)]">
              Shirts &amp; Dresses
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm uppercase tracking-wide text-[color:var(--color-ink)] underline underline-offset-4 sm:block"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link
            href="/shop"
            className="text-sm uppercase tracking-wide text-[color:var(--color-ink)] underline underline-offset-4"
          >
            View all
          </Link>
        </div>
      </section>

      {/* Rental teaser */}
      <section className="bg-[color:var(--color-indigo)] text-[color:var(--color-cream)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold)]">
              Coming Soon
            </p>
            <h2 className="mt-2 font-serif text-3xl">
              Borrow a costume, not just a shirt.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-cream)]/80">
              We&apos;re building a rental experience for tourists — dress up
              in traditional costume for a photoshoot walk through Kuala
              Lumpur, then return it before you fly home.
            </p>
          </div>
          <Link
            href="/rental"
            className="whitespace-nowrap rounded-sm border border-[color:var(--color-cream)] px-6 py-3 text-sm uppercase tracking-wide transition-colors hover:bg-[color:var(--color-cream)] hover:text-[color:var(--color-indigo)]"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
