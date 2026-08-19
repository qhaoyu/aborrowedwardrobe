import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BatikSwatch from "@/components/BatikSwatch";
import AddToCartForm from "@/components/AddToCartForm";
import ProductCard from "@/components/ProductCard";
import {
  formatMYR,
  getProductBySlug,
  patternLabels,
  products,
} from "@/lib/products";

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

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        {product.photo ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-sm shadow-md">
            <Image
              src={product.photo}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        ) : (
          <BatikSwatch
            pattern={product.pattern}
            colorway={product.colorway}
            className="aspect-square w-full rounded-sm shadow-md"
          />
        )}

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-terracotta)]">
            {patternLabels[product.pattern]} Motif ·{" "}
            {product.category === "shirt" ? "Shirt" : "Dress"}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-[color:var(--color-ink)] sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-xl text-[color:var(--color-ink)]/80">
            {formatMYR(product.priceMYR)}
          </p>

          <p className="mt-6 leading-relaxed text-[color:var(--color-ink)]/80">
            {product.description}
          </p>
          <p className="mt-4 italic leading-relaxed text-[color:var(--color-ink)]/60">
            {product.story}
          </p>

          <AddToCartForm slug={product.slug} sizes={product.sizes} />

          <p className="mt-8 text-xs text-[color:var(--color-ink)]/50">
            Ships worldwide, or collect in person from our studio on Petaling
            Street, Chinatown, Kuala Lumpur.
          </p>
        </div>
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
