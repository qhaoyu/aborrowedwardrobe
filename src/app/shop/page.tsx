import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop | A Borrowed Wardrobe",
  description:
    "Batik shirts and dresses designed on Petaling Street, Chinatown, Kuala Lumpur.",
};

type ShopPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const filtered =
    category === "shirt" || category === "dress" || category === "pants"
      ? products.filter((p) => p.category === category)
      : products;

  const tabs = [
    { key: undefined, label: "All" },
    { key: "shirt", label: "Shirts" },
    { key: "dress", label: "Dresses" },
    { key: "pants", label: "Pants" },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
          The Collection
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[color:var(--color-ink)] sm:text-4xl">
          Shirts &amp; Dresses
        </h1>
        <p className="mt-3 max-w-xl text-sm text-[color:var(--color-ink)]/70">
          Hand-block-printed batik, cut for warm-weather travel. Every piece
          ships from our studio on Petaling Street.
        </p>
      </div>

      <div className="mb-8 flex gap-3">
        {tabs.map((tab) => {
          const href = tab.key ? `/shop?category=${tab.key}` : "/shop";
          const active = category === tab.key || (!category && !tab.key);
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

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
