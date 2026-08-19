"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Wraps an image so it settles into place as you scroll past it — the
// "photo shifting" effect. The layer scales down from a *top-anchored*
// transform-origin, so the top edge of the image never moves and can
// never be cropped (unlike an oversized/centered layer translated with
// yPercent: that only has one exact translate value with zero top-crop
// and zero exposed gap, which leaves no room to actually animate).
// All the "give" for the effect comes from the bottom edge instead,
// which is a much safer place to lose a sliver of these portrait photos.
export default function ParallaxImage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const layer = layerRef.current;
    if (!wrapper || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      layer,
      { scale: 1.1 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <div ref={layerRef} className="absolute inset-0 origin-top">
        {children}
      </div>
    </div>
  );
}
