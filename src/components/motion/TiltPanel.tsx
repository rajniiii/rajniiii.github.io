"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Very slight pointer-follow on project panels. Desktop pointers only: touch
 * devices and reduced-motion users get a static panel, and listeners are only
 * attached when the effect will actually run.
 */
export function TiltPanel({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !hasFinePointer()) return;

    const rotX = gsap.quickTo(el, "rotateX", { duration: 0.7, ease: "power3.out" });
    const rotY = gsap.quickTo(el, "rotateY", { duration: 0.7, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rotY(px * 4);
      rotX(-py * 3);
    };

    const onLeave = () => {
      rotX(0);
      rotY(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "rotateX,rotateY" });
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d", perspective: 1100 }}>
      {children}
    </div>
  );
}
