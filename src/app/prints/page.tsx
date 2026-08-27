import Image from "next/image";
import Link from "next/link";
import {
  designs,
  fabricMotifLabels,
  fabricMotifMeanings,
  type FabricMotif,
} from "@/lib/products";

export const metadata = {
  title: "Prints | A Borrowed Wardrobe",
  description:
    "Every batik print in the house library — real fabric, photographed swatch by swatch, sorted into six families by hand.",
};

const families: FabricMotif[] = ["arus", "pasar", "gemilang", "kunang", "kelam", "sulur"];

type PrintsPageProps = {
  searchParams: Promise<{ family?: string }>;
};

export default async function PrintsPage({ searchParams }: PrintsPageProps) {
  const { family } = await searchParams;
  const activeFamily = families.includes(family as FabricMotif) ? (family as FabricMotif) : undefined;
  const visibleFamilies = activeFamily ? [activeFamily] : families;

  const tabs = [
    { key: undefined, label: "All" },
    ...families.map((f) => ({ key: f, label: fabricMotifLabels[f] })),
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
          The Fabric Library
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[color:var(--color-ink)] sm:text-4xl">
          Every Print We Carry
        </h1>
        <p className="mt-3 text-sm text-[color:var(--color-ink)]/70">
          Real batik, photographed swatch by swatch — the same {designs.length} prints you&apos;ll
          choose from when you pick a shirt or dress. Sorted by hand into six families rather than
          claimed against traditional motif names we can&apos;t verify from a photo alone.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const href = tab.key ? `/prints?family=${tab.key}` : "/prints";
          const active = activeFamily === tab.key;
          return (
            <a
              key={tab.label}
              href={href}
              className={`rounded-full border px-4 py-1.5 text-sm uppercase tracking-wide transition-colors ${
                active
                  ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)] text-[color:var(--color-cream)]"
                  : "border-[color:var(--color-line)] text-[color:var(--color-ink)]/70 hover:border-[color:var(--color-terracotta)]"
              }`}
            >
              {tab.label}
            </a>
          );
        })}
      </div>

      <div className="flex flex-col gap-14">
        {visibleFamilies.map((f) => {
          const items = designs.filter((d) => d.motif === f);
          return (
            <section key={f}>
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-[color:var(--color-line)] pb-3">
                <div>
                  <h2 className="font-serif text-xl text-[color:var(--color-ink)]">
                    {fabricMotifLabels[f]}
                  </h2>
                  <p className="mt-1 text-sm italic text-[color:var(--color-ink)]/60">
                    {fabricMotifMeanings[f]}
                  </p>
                </div>
                <p className="shrink-0 text-xs uppercase tracking-wide text-[color:var(--color-ink)]/50">
                  {items.length} print{items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {items.map((design) => (
                  <div key={design.slug}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-[color:var(--color-line)]">
                      <Image
                        src={design.photo}
                        alt={`${fabricMotifLabels[design.motif]} — ${design.name} fabric`}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-[color:var(--color-ink)]">
                      {fabricMotifLabels[design.motif]} · {design.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-14 flex flex-col items-start gap-3 border-t border-[color:var(--color-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[color:var(--color-ink)]/70">
          Every print here is available on any shirt or dress in the shop.
        </p>
        <Link
          href="/shop"
          className="shrink-0 rounded-sm bg-[color:var(--color-terracotta)] px-6 py-3 text-sm uppercase tracking-wide text-[color:var(--color-cream)] transition-opacity hover:opacity-90"
        >
          Shop the Collection
        </Link>
      </div>
    </div>
  );
}
