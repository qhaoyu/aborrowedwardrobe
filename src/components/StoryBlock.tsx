import Image from "next/image";
import type { ReactNode } from "react";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollReveal from "@/components/ScrollReveal";

type StoryBlockProps = {
  eyebrow: string;
  heading: string;
  children: ReactNode;
  photo: string;
  photoAlt: string;
  reverse?: boolean;
};

export default function StoryBlock({
  eyebrow,
  heading,
  children,
  photo,
  photoAlt,
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
          <ParallaxImage className="aspect-[4/5] w-full rounded-sm shadow-md">
            <Image
              src={photo}
              alt={photoAlt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </ParallaxImage>
        </ScrollReveal>
      </div>
    </section>
  );
}
