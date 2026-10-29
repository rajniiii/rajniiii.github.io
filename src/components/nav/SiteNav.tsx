"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/data/profile";
import { cx } from "@/lib/utils";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Dashboards", href: "/#dashboards" },
  { label: "Experience", href: "/#experience" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Background", href: "/#background" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteNav() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 motion-reduce:transition-none",
        lifted ? "bg-ivory/85 border-hair border-b backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <Link href="/#top" className="group flex items-baseline gap-2.5" aria-label="Rajanee Shenkar — home">
          <span className="font-display text-ink text-[1.0625rem] leading-none">Rajanee Shenkar</span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-x-5 lg:flex xl:gap-x-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate hover:text-ink relative font-mono text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full motion-reduce:after:transition-none"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="border-hair-strong text-ink hover:border-plum hover:text-plum rounded-full border px-4 py-2 font-mono text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-300"
          >
            Résumé
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
          onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="border-hair-strong text-ink flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.1em] uppercase"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true" className="flex h-2.5 w-3.5 flex-col justify-between">
              <span className={cx("h-px w-full bg-current transition-transform duration-300", open && "translate-y-[5px] rotate-45")} />
              <span className={cx("h-px w-full bg-current transition-opacity duration-300", open && "opacity-0")} />
              <span className={cx("h-px w-full bg-current transition-transform duration-300", open && "-translate-y-[5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="bg-ivory/97 border-hair border-t backdrop-blur-md lg:hidden"
      >
        <nav aria-label="Sections" className="flex flex-col px-5 py-2 sm:px-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-hair text-ink border-b py-3.5 font-mono text-[0.8125rem] tracking-[0.08em] uppercase last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="text-plum py-3.5 font-mono text-[0.8125rem] tracking-[0.08em] uppercase"
          >
            Résumé ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
