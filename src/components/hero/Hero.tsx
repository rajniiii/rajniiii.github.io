"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { HeroSchematic } from "./HeroSchematic";
import { profile } from "@/data/profile";
import { prefersReducedMotion, useIsoLayoutEffect } from "@/lib/motion";
import { ArcMotif, CrossMotif, OrbitMotif, StarMotif, WaveMotif } from "@/components/ui/Motifs";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    let safety = 0;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from("[data-hero='eyebrow']", { autoAlpha: 0, y: 10, duration: 0.45 })
        .from("[data-hero='line']", { autoAlpha: 0, y: 24, duration: 0.6, stagger: 0.07 }, "-=0.25")
        .from("[data-hero='underline']", { scaleX: 0, transformOrigin: "left center", duration: 0.5 }, "-=0.3")
        .from("[data-hero='copy']", { autoAlpha: 0, y: 14, duration: 0.5 }, "-=0.35")
        .from("[data-hero='actions'] > *", { autoAlpha: 0, y: 12, duration: 0.4, stagger: 0.05 }, "-=0.3")
        .from("[data-hero='panel']", { autoAlpha: 0, y: 26, duration: 0.7 }, "-=0.75")
        .from("[data-hero='card']", { autoAlpha: 0, y: 18, scale: 0.98, duration: 0.55 }, "-=0.4");

      // If the frame loop never ticks (throttled tab, odd runtime), do not leave
      // the hero hidden — jump it to its finished state instead.
      safety = window.setTimeout(() => {
        if (timeline.progress() < 1) timeline.progress(1);
      }, 2600);
    }, el);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pt-40 md:pb-24">
      {/* Decorative ground: a soft pastel wash and a fading engineering grid */}
      <div aria-hidden="true" className="hero-wash pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="grid-paper pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] opacity-70"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent)" }}
      />

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div data-hero="eyebrow" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="bg-forest motif-pulse inline-block h-1.5 w-1.5 rounded-full" aria-hidden="true" />
                {profile.availability}
              </span>
            </div>

            <h1 className="display-xl mt-7 max-w-[20ch]">
              <span data-hero="line" className="block">
                {profile.headline.lead}
              </span>
              <span data-hero="line" className="relative inline-block">
                <em className="text-plum italic">{profile.headline.emphasis}</em>
                <span data-hero="underline" className="absolute -bottom-2 left-0 block w-full">
                  <WaveMotif width={180} className="text-plum/55 w-full" />
                </span>
              </span>{" "}
              <span data-hero="line" className="block">
                {profile.headline.trail}
              </span>
            </h1>

            <p data-hero="copy" className="lede mt-9 max-w-[54ch]">
              {profile.supporting}
            </p>

            <div data-hero="actions" className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href="#work"
                className="bg-ink text-ivory hover:bg-plum rounded-full px-6 py-3 font-mono text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
              >
                Selected work
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="border-hair-strong text-ink hover:border-plum hover:text-plum rounded-full border px-6 py-3 font-mono text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
              >
                Résumé ↗
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-slate hover:text-ink font-mono text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-slate hover:text-ink font-mono text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>

            <p className="text-slate-soft mt-8 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em]">
              {profile.authorization}
              <span className="block">{profile.relocation}</span>
            </p>
          </div>

          <div data-hero="panel" className="relative md:col-span-5">
            <StarMotif className="motif-drift absolute -top-6 -left-4 z-10 hidden md:block" size={26} />
            <OrbitMotif className="motif-spin text-marine/30 absolute -right-8 -bottom-10 hidden lg:block" size={132} />
            <CrossMotif className="text-clay/50 absolute top-1/3 -left-7 hidden lg:block" />

            <div className="relative">
              {/* Offset pastel block behind the portrait */}
              <div
                aria-hidden="true"
                className="bg-sage/70 absolute -top-3 -left-3 h-full w-full rounded-t-[999px] rounded-b-xl"
                style={{ transform: "rotate(-2.2deg)" }}
              />
              <div className="border-hair bg-paper relative overflow-hidden rounded-t-[999px] rounded-b-xl border">
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  width={1170}
                  height={656}
                  priority
                  sizes="(max-width: 768px) 80vw, 34vw"
                  className="aspect-4/5 h-auto w-full object-cover"
                />
              </div>
            </div>

            <div
              data-hero="card"
              className="shell-panel relative mt-[-12%] ml-auto w-[min(100%,400px)] rounded-xl p-4 sm:p-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="eyebrow">fig. 00</span>
                <ArcMotif className="text-plum/40" size={54} />
              </div>
              <HeroSchematic className="mt-1 h-auto w-full" />
              <p className="text-slate mt-2 text-[0.8125rem] leading-snug">
                The shape of most things here: evidence in, a scored judgment out, and a record of why.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
