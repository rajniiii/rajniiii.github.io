import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-hair mt-24 border-t">
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-baseline justify-between gap-x-10 gap-y-5 px-5 py-9 sm:px-8">
        <div>
          <p className="font-display text-ink text-[1.0625rem] leading-none">{profile.name}</p>
          <p className="text-slate-soft mt-2 font-mono text-[0.625rem] tracking-[0.1em] uppercase">
            {profile.role} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "Work", href: "/#work" },
            { label: "Experience", href: "/#experience" },
            { label: "Contact", href: "/#contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate hover:text-ink font-mono text-[0.6875rem] tracking-[0.08em] uppercase transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-slate-soft font-mono text-[0.625rem] tracking-[0.06em]">
          Built with Next.js · typeset in Instrument Serif &amp; Manrope
        </p>
      </div>
    </footer>
  );
}
