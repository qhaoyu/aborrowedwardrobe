import Link from "next/link";
import BatikSwatch from "@/components/BatikSwatch";

export const metadata = {
  title: "Our Story | A Borrowed Wardrobe",
  description:
    "A Borrowed Wardrobe is designed and sold from a small studio on Petaling Street, Chinatown, Kuala Lumpur.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-[color:var(--color-line)] bg-white/40">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
            Our Story
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[color:var(--color-ink)]">
            Borrowed from the street, made to keep.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center">
        <div className="space-y-5 leading-relaxed text-[color:var(--color-ink)]/80">
          <p>
            A Borrowed Wardrobe started with a simple observation: travellers
            walking through Petaling Street would stop, again and again, in
            front of the same batik stalls — running their hands over the
            fabric, admiring patterns they didn&apos;t quite know the meaning
            of, and often leaving without buying anything, unsure of the fit
            or the story behind what they were looking at.
          </p>
          <p>
            We wanted to change that. Every shirt and dress we make is
            block-printed with a traditional batik motif — parang, kawung,
            mega mendung, truntum — and cut in modern, travel-friendly
            silhouettes. Each piece comes with the story of its pattern, so
            what you bring home means something beyond a souvenir.
          </p>
          <p>
            Our studio sits above a shopfront in the middle of Chinatown,
            Kuala Lumpur — the same street our customers wander through on
            their first night in the city, and the same street we hope
            they&apos;ll think of every time they wear what they bought here.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <BatikSwatch
            pattern="truntum"
            colorway={["#2b2b2b", "#c94f4f"]}
            className="aspect-square w-full rounded-sm shadow-md"
          />
          <BatikSwatch
            pattern="sido-mukti"
            colorway={["#4a1f3d", "#d4af37"]}
            className="mt-8 aspect-square w-full rounded-sm shadow-md"
          />
          <BatikSwatch
            pattern="sekar-jagad"
            colorway={["#8a3b1f", "#2c6e49"]}
            className="aspect-square w-full rounded-sm shadow-md"
          />
          <BatikSwatch
            pattern="kawung"
            colorway={["#1f3a3d", "#c9b458"]}
            className="mt-[-2rem] aspect-square w-full rounded-sm shadow-md"
          />
        </div>
      </section>

      <section className="bg-[color:var(--color-ink)] text-[color:var(--color-cream)]">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl">
            Visit the studio
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-cream)]/75">
            We&apos;re based right on Petaling Street, in the heart of
            Chinatown, Kuala Lumpur — come see the prints in person, or
            browse the full collection online.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-sm border border-[color:var(--color-cream)] px-6 py-3 text-sm uppercase tracking-wide hover:bg-[color:var(--color-cream)] hover:text-[color:var(--color-ink)]"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
