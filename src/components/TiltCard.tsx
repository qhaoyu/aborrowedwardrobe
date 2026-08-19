"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

// Tilts its content toward the cursor (perspective + rotateX/rotateY).
// Uses quickSetter + a manual lerp on gsap's ticker rather than quickTo:
// GSAP treats rotateX/rotateY as "special" transform properties that
// aren't eligible for quickTo's internal reset, so quickTo silently
// no-ops on them (logs "not eligible for reset" and drops the rotation).
// Skipped for reduced-motion and touch-only pointers.
export default function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }

    const setRotateX = gsap.quickSetter(node, "rotateX", "deg");
    const setRotateY = gsap.quickSetter(node, "rotateY", "deg");
    const setLift = gsap.quickSetter(node, "y", "px");

    let targetRX = 0;
    let targetRY = 0;
    let targetY = 0;
    let currentRX = 0;
    let currentRY = 0;
    let currentY = 0;

    const handleMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetRY = px * 14;
      targetRX = py * -14;
      targetY = -6;
    };

    const handleLeave = () => {
      targetRX = 0;
      targetRY = 0;
      targetY = 0;
    };

    const onTick = () => {
      currentRX += (targetRX - currentRX) * 0.12;
      currentRY += (targetRY - currentRY) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setRotateX(currentRX);
      setRotateY(currentRY);
      setLift(currentY);
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);
    gsap.ticker.add(onTick);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      gsap.ticker.remove(onTick);
    };
  }, []);

  return (
    <div style={{ perspective: "800px" }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </div>
  );
}
