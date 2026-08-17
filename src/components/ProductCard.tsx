import Link from "next/link";
import BatikSwatch from "@/components/BatikSwatch";
import { formatMYR, patternLabels, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-[color:var(--color-line)] bg-white/40 transition-shadow hover:shadow-lg"
    >
      <div className="aspect-square w-full overflow-hidden">
        <BatikSwatch
          pattern={product.pattern}
          colorway={product.colorway}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-terracotta)]">
          {patternLabels[product.pattern]} Motif
        </p>
        <h3 className="font-serif text-lg text-[color:var(--color-ink)]">
          {product.name}
        </h3>
        <p className="mt-auto pt-2 text-sm text-[color:var(--color-ink)]/70">
          {formatMYR(product.priceMYR)}
        </p>
      </div>
    </Link>
  );
}
