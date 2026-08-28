import CategoryTile from "@/components/CategoryTile";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop | A Borrowed Wardrobe",
  description:
    "Batik tops, pants, and sweaters designed on Petaling Street, Chinatown, Kuala Lumpur.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="mb-12 max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
          The Collection
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[color:var(--color-ink)] sm:text-4xl">
          Shop by Category
        </h1>
        <p className="mt-3 text-sm text-[color:var(--color-ink)]/70">
          Hand-block-printed batik, cut for warm-weather travel. Pick a
          piece, then choose any print from the full collection.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {products.map((product) => (
          <CategoryTile key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
