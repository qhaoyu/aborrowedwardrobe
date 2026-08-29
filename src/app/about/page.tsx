import Image from "next/image";
import Link from "next/link";

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

      <section className="border-b border-[color:var(--color-line)]">
        <div className="grid md:grid-cols-2 md:items-stretch">
          <div className="relative order-1 aspect-[4/5] w-full overflow-hidden md:aspect-auto md:min-h-[600px]">
            {/* Swap for a real photo of Karl Ho: <Image src="/team/karl-ho.jpg" alt="Karl Ho" fill sizes="50vw" className="object-cover" /> */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color:var(--color-line)]/30 text-[color:var(--color-ink)]/35">
              <span className="font-serif text-7xl">KH</span>
              <span className="text-xs uppercase tracking-[0.2em]">
                Photo coming soon
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--color-ink)]/85 via-[color:var(--color-ink)]/25 to-transparent px-8 pb-8 pt-32 sm:px-10">
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)]">
                Our Designer
              </p>
              <h2 className="mt-2 font-serif text-5xl text-white sm:text-6xl">
                Karl Ho
              </h2>
            </div>
          </div>
          <div className="order-2 flex flex-col justify-center bg-white/40 px-5 py-16 sm:px-10 md:px-16 lg:px-20">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
              National Treasure in Fashion &amp; Batik
            </p>
            <div className="mt-5 space-y-4 leading-relaxed text-[color:var(--color-ink)]/80">
              <p>
                Every print in this collection starts with Karl Ho, the
                Seremban-born couturier behind it. A Performing Arts graduate
                of the University of Malaya, he founded the fashion house
                THEMODHOUSE in 2006 and grew it into seventeen stores across
                Malaysia and two more in Dongguan, China.
              </p>
              <p>
                From there his couture travelled further still — onto the
                runway at New York&apos;s Couture Fashion Week, then Cannes,
                where he won the Outstanding Fashion Styling Award, then
                Fujian, where he was named Cultural Fashion Ambassador by
                Tourism Changting. In October 2025, Milan Fashion Week named
                him Best Designer. Three months later, back home in Negeri
                Sembilan, he set an ASEAN Book of Record for the largest
                custom batik showcase ever staged — 1,800 participants, each
                piece his own.
              </p>
            </div>
            <p className="mt-8 border-l-2 border-[color:var(--color-terracotta)] pl-5 font-serif text-xl italic leading-snug text-[color:var(--color-ink)]">
              &ldquo;That&apos;s the hand behind every piece you&apos;ll find
              here.&rdquo;
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["New York", "Cannes", "Fujian", "Milan", "ASEAN Book of Record"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--color-line)] px-3 py-1 text-xs uppercase tracking-wide text-[color:var(--color-ink)]/60"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
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
            We wanted to change that. Every piece — top, trousers, or
            sweater — is hand-block-printed batik, cut in modern,
            travel-friendly silhouettes. Pick the piece first, then choose
            any print from our own house collection, so what you bring
            home means something beyond a souvenir.
          </p>
          <p>
            Our studio sits above a shopfront in the middle of Chinatown,
            Kuala Lumpur — the same street our customers wander through on
            their first night in the city, and the same street we hope
            they&apos;ll think of every time they wear what they bought here.
          </p>
        </div>
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md">
          <Image
            src="/editorial/peranakan-elegance-bridal-attire/01.jpg"
            alt="A model in Peranakan Elegance Bridal Attire, outside a Petaling Street restaurant"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
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
