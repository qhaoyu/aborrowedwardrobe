"use client";

import { useEffect, useMemo, useState } from "react";
import BatikSwatch from "@/components/BatikSwatch";
import TiltCard from "@/components/TiltCard";
import {
  patternLabels,
  patternMeanings,
  type BatikPattern,
  type Design,
} from "@/lib/products";

export default function DesignPicker({
  designs,
  value,
  onChange,
}: {
  designs: Design[];
  value: Design | null;
  onChange: (design: Design) => void;
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<BatikPattern | "all">("all");

  const motifs = useMemo(() => {
    const seen = new Set<BatikPattern>();
    const list: BatikPattern[] = [];
    for (const d of designs) {
      if (!seen.has(d.motif)) {
        seen.add(d.motif);
        list.push(d.motif);
      }
    }
    return list;
  }, [designs]);

  const visible = filter === "all" ? designs : designs.filter((d) => d.motif === filter);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-4 rounded-sm border border-[color:var(--color-line)] p-3 text-left transition-colors hover:border-[color:var(--color-terracotta)]"
      >
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm">
          {value ? (
            <BatikSwatch pattern={value.motif} colorway={value.colorway} className="h-full w-full" />
          ) : (
            <div className="h-full w-full bg-[color:var(--color-line)]" />
          )}
        </div>
        <div className="flex-1">
          {value ? (
            <>
              <p className="text-sm font-medium text-[color:var(--color-ink)]">
                {patternLabels[value.motif]} · {value.colorwayName}
              </p>
              <p className="text-xs text-[color:var(--color-ink)]/60">Tap to change</p>
            </>
          ) : (
            <p className="text-sm font-medium text-[color:var(--color-terracotta)]">
              Browse all {designs.length} motifs →
            </p>
          )}
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          <div
            className="absolute inset-0 bg-[color:var(--color-ink)]/60"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Choose your motif"
            className="relative flex max-h-[85vh] w-full flex-col rounded-t-sm bg-[color:var(--color-cream)] shadow-xl sm:max-w-3xl sm:rounded-sm"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--color-line)] px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-terracotta)]">
                  {designs.length} Motifs
                </p>
                <h2 className="font-serif text-xl text-[color:var(--color-ink)]">Choose Your Motif</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--color-ink)]/60 hover:bg-[color:var(--color-line)]"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-[color:var(--color-line)] px-5 py-3">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                  filter === "all"
                    ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)] text-[color:var(--color-cream)]"
                    : "border-[color:var(--color-line)] text-[color:var(--color-ink)]/70 hover:border-[color:var(--color-terracotta)]"
                }`}
              >
                All
              </button>
              {motifs.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setFilter(m)}
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                    filter === m
                      ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)] text-[color:var(--color-cream)]"
                      : "border-[color:var(--color-line)] text-[color:var(--color-ink)]/70 hover:border-[color:var(--color-terracotta)]"
                  }`}
                >
                  {patternLabels[m]}
                </button>
              ))}
            </div>

            <div className="grid grow grid-cols-2 gap-3 overflow-y-auto p-5 sm:grid-cols-3 md:grid-cols-4">
              {visible.map((design) => {
                const selected = value?.slug === design.slug;
                return (
                  <button
                    key={design.slug}
                    type="button"
                    onClick={() => {
                      onChange(design);
                      setOpen(false);
                    }}
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
                      <div className="relative aspect-square w-full">
                        <BatikSwatch
                          pattern={design.motif}
                          colorway={design.colorway}
                          className="h-full w-full"
                        />
                        {selected && (
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-[color:var(--color-ink)]/20"
                            aria-hidden
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--color-cream)] text-[color:var(--color-terracotta)] shadow-md">
                              ✓
                            </span>
                          </div>
                        )}
                      </div>
                    </TiltCard>
                    <p className="mt-1.5 text-xs font-medium text-[color:var(--color-ink)]">
                      {patternLabels[design.motif]} · {design.colorwayName}
                    </p>
                  </button>
                );
              })}
            </div>

            {value && (
              <p className="border-t border-[color:var(--color-line)] px-5 py-3 text-xs leading-snug text-[color:var(--color-ink)]/60">
                {patternLabels[value.motif]} — {patternMeanings[value.motif]}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
