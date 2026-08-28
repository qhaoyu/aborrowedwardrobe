import Image from "next/image";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import { formatMYR, type Product } from "@/lib/products";

// The big, obvious tile used to represent one whole category (Batik Top,
// Pants, Sweater) — shared between /shop and the homepage's collection
// section so the two stay visually identical without duplicating the markup.
export default function CategoryTile({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <TiltCard className="overflow-hidden rounded-sm border border-[color:var(--color-line)] shadow-md transition-shadow duration-500 ease-out group-hover:shadow-xl">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {product.photo && (
            <Image
              src={product.photo}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/70 via-[color:var(--color-ink)]/0 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
          <span className="absolute inset-x-0 bottom-6 mx-auto w-fit translate-y-3 rounded-full bg-[color:var(--color-cream)] px-5 py-2 text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)] opacity-0 shadow-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            Shop Now
          </span>
        </div>
      </TiltCard>
      <div className="mt-4">
        <h2 className="font-serif text-2xl text-[color:var(--color-ink)] sm:text-3xl">
          {product.name}
        </h2>
        <p className="mt-1 text-sm text-[color:var(--color-ink)]/70">
          From {formatMYR(product.priceMYR)}
        </p>
      </div>
    </Link>
  );
}
