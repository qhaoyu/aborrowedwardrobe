import Link from "next/link";
import BatikSwatch from "@/components/BatikSwatch";
import TiltCard from "@/components/TiltCard";
import { formatMYR, patternLabels, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block h-full overflow-hidden rounded-sm border border-[color:var(--color-line)] bg-white/40 transition-shadow duration-500 ease-out hover:shadow-xl"
    >
      <TiltCard className="flex h-full flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <BatikSwatch
            pattern={product.pattern}
            colorway={product.colorway}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/70 via-[color:var(--color-ink)]/0 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
          <span className="absolute inset-x-0 bottom-4 mx-auto w-fit translate-y-3 rounded-full bg-[color:var(--color-cream)] px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)] opacity-0 shadow-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            View Piece
          </span>
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
      </TiltCard>
    </Link>
  );
}
