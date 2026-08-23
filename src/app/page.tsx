import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import StoryBlock from "@/components/StoryBlock";
import { products } from "@/lib/products";

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <div>
      {/* Opening — a minimal, cinematic statement. Everything else reveals as you scroll. */}
      <section className="relative flex min-h-[90svh] flex-col justify-center overflow-hidden border-b border-[color:var(--color-line)] px-5 sm:px-8">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] sm:block [mask-image:linear-gradient(to_right,transparent,black_20%)]"
          aria-hidden
        >
          <Image
            src="/editorial/look-19/01.jpg"
            alt=""
            fill
            priority
            sizes="45vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto w-full max-w-6xl py-24 sm:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-terracotta)]">
            A Borrowed Wardrobe
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[color:var(--color-ink)]/50">
            Petaling Street · Chinatown · Kuala Lumpur
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.05] text-[color:var(--color-ink)] sm:text-6xl md:text-7xl">
            Wear the street you wandered.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--color-ink)]/75">
            A Borrowed Wardrobe designs batik shirts and dresses out of a
            small studio in the middle of Petaling Street — for travellers
            who want to carry a piece of Kuala Lumpur home with them.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
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

        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <span
            className="h-10 w-px animate-pulse bg-[color:var(--color-ink)]/30"
            aria-hidden
          />
        </div>
      </section>

      {/* The story, told the way a portfolio tells a case study: observation, craft, place. */}
      <StoryBlock
        eyebrow="The Street"
        heading="They always stopped. They rarely bought."
        photo="/editorial/look-03/01.jpg"
        photoAlt="A model in songket fabric in a Kuala Lumpur mural alley"
      >
        <p>
          Travellers walking through Petaling Street would stop, again and
          again, in front of the same batik stalls — running their hands
          over the fabric, admiring patterns they didn&apos;t quite know the
          meaning of.
        </p>
        <p>
          Most left without buying anything, unsure of the fit, or the
          story behind what they were looking at.
        </p>
      </StoryBlock>

      <StoryBlock
        eyebrow="The Craft"
        heading="A story printed into every motif."
        photo="/editorial/look-15/01.jpg"
        photoAlt="A model in a batik jacket near Central Market, Kuala Lumpur"
        reverse
      >
        <p>
          We wanted to change that. Every shirt and dress we make is
          block-printed with a traditional batik motif and cut in modern,
          travel-friendly silhouettes.
        </p>
        <p className="italic text-[color:var(--color-ink)]/85">
          &ldquo;Parang for resilience, kawung for balance, truntum for a
          love that keeps growing.&rdquo;
        </p>
      </StoryBlock>

      <StoryBlock
        eyebrow="The Studio"
        heading="Above a shopfront, on the street itself."
        photo="/editorial/look-22/01.jpg"
        photoAlt="A model in an embroidered cape dress in a Kuala Lumpur market"
      >
        <p>
          Our studio sits above a shopfront in the middle of Chinatown,
          Kuala Lumpur — the same street our customers wander through on
          their first night in the city.
        </p>
        <p>
          The same street we hope they&apos;ll think of every time they
          wear what they bought here.
        </p>
      </StoryBlock>

      {/* The collection — a clean, boutique-grade showcase. */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-terracotta)]">
                The Collection
              </p>
              <h2 className="mt-2 font-serif text-3xl text-[color:var(--color-ink)] sm:text-4xl">
                Shirts &amp; Dresses
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-ink)]/70">
                Hand-block-printed batik, cut for warm-weather travel. Every
                piece ships from our studio on Petaling Street.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden shrink-0 text-sm uppercase tracking-wide text-[color:var(--color-ink)] underline underline-offset-4 sm:block"
            >
              View all
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4">
          {featured.map((product, i) => (
            <ScrollReveal key={product.slug} delay={i * 80}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            href="/shop"
            className="text-sm uppercase tracking-wide text-[color:var(--color-ink)] underline underline-offset-4"
          >
            View all
          </Link>
        </div>
      </section>

      {/* Rental teaser */}
      <ScrollReveal>
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
                We&apos;re building a rental experience for tourists — dress
                up in traditional costume for a photoshoot walk through
                Kuala Lumpur, then return it before you fly home.
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
      </ScrollReveal>
    </div>
  );
}
