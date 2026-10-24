"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Animate direct children in sequence instead of the wrapper as one block. */
  stagger?: boolean;
  delay?: number;
  as?: ElementType;
}

/**
 * Scroll-triggered entrance. Content is rendered visible in the HTML; GSAP only
 * takes over once it has confirmed motion is welcome, so a failed script or a
 * reduced-motion preference leaves a fully readable page.
 */
export function Reveal({ children, className, stagger = false, delay = 0, as }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Wrapper = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      if (stagger && (targets as Element[]).length === 0) return;

      gsap.from(targets, {
        y: 24,
        autoAlpha: 0,
        duration: 0.85,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, delay]);

  return (
    <Wrapper ref={ref} className={className}>
      {children}
    </Wrapper>
  );
}
