"use client";

import BatikSwatch from "@/components/BatikSwatch";
import TiltCard from "@/components/TiltCard";
import {
  patternColorways,
  patternLabels,
  patternMeanings,
  type BatikPattern,
} from "@/lib/products";

export default function DesignPicker({
  designs,
  value,
  onChange,
}: {
  designs: BatikPattern[];
  value: BatikPattern | null;
  onChange: (pattern: BatikPattern) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {designs.map((pattern) => {
        const selected = value === pattern;
        return (
          <button
            key={pattern}
            type="button"
            onClick={() => onChange(pattern)}
            aria-pressed={selected}
            className="text-left"
          >
            <TiltCard
              className={`overflow-hidden rounded-sm border transition-colors ${
                selected
                  ? "border-[color:var(--color-terracotta)]"
                  : "border-[color:var(--color-line)] hover:border-[color:var(--color-terracotta)]/50"
              }`}
            >
              <div className="relative aspect-square w-full active:scale-95 transition-transform">
                <BatikSwatch
                  pattern={pattern}
                  colorway={patternColorways[pattern]}
                  className="h-full w-full"
                />
                {selected && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-[color:var(--color-ink)]/20"
                    aria-hidden
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-cream)] text-[color:var(--color-terracotta)] shadow-md">
                      ✓
                    </span>
                  </div>
                )}
              </div>
            </TiltCard>
            <p className="mt-2 text-sm font-medium text-[color:var(--color-ink)]">
              {patternLabels[pattern]}
            </p>
            <p className="text-xs leading-snug text-[color:var(--color-ink)]/60">
              {patternMeanings[pattern]}
            </p>
          </button>
        );
      })}
    </div>
  );
}
