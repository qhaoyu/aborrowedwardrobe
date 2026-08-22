import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductConfigurator from "@/components/ProductConfigurator";
import { getProductBySlug, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | A Borrowed Wardrobe`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <Link
        href="/shop"
        className="text-sm uppercase tracking-wide text-[color:var(--color-ink)]/60 hover:text-[color:var(--color-ink)]"
      >
        ← Back to Shop
      </Link>

      <div className="mt-6">
        <ProductConfigurator product={product} />
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-6 font-serif text-2xl text-[color:var(--color-ink)]">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
