import type { ReactNode } from "react";
import BatikSwatch from "@/components/BatikSwatch";
import ScrollReveal from "@/components/ScrollReveal";
import type { BatikPattern } from "@/lib/products";

type StoryBlockProps = {
  eyebrow: string;
  heading: string;
  children: ReactNode;
  pattern: BatikPattern;
  colorway: [string, string];
  reverse?: boolean;
};

export default function StoryBlock({
  eyebrow,
  heading,
  children,
  pattern,
  colorway,
  reverse = false,
}: StoryBlockProps) {
  return (
    <section className="border-b border-[color:var(--color-line)]">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 md:items-center md:gap-14">
        <ScrollReveal className={reverse ? "md:order-2" : undefined}>
          <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-terracotta)]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-[color:var(--color-ink)] sm:text-4xl">
            {heading}
          </h2>
          <div className="mt-5 max-w-md space-y-4 leading-relaxed text-[color:var(--color-ink)]/75">
            {children}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120} className={reverse ? "md:order-1" : undefined}>
          <BatikSwatch
            pattern={pattern}
            colorway={colorway}
            className="aspect-[4/5] w-full rounded-sm shadow-md"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
