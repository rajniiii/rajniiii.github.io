import { certifications, degrees, publication } from "@/data/background";
import { profile } from "@/data/profile";
import { ActionLink } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { WaveMotif } from "@/components/ui/Motifs";

export function Background() {
  return (
    <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-x-12">
      <Reveal className="md:col-span-7">
        <span className="eyebrow">Education</span>
        <div className="divide-hair mt-4 divide-y">
          {degrees.map((degree) => (
            <div key={degree.school} className="py-5 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-ink text-[1.3125rem] leading-tight">{degree.degree}</h3>
                <span className="text-slate-soft font-mono text-[0.6875rem] tracking-[0.06em]">{degree.dates}</span>
              </div>
              <p className="text-slate mt-1.5 text-[0.9375rem]">
                {degree.school} · {degree.location}
              </p>
              <p className="text-slate-soft mt-2.5 font-mono text-[0.625rem] leading-relaxed tracking-[0.04em]">
                {degree.courses.join(" · ")}
              </p>
            </div>
          ))}
        </div>

        <span className="eyebrow mt-10 block">Certifications</span>
        <ul className="divide-hair mt-4 divide-y">
          {certifications.map((certification) => (
            <li key={certification.url} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
              <a
                href={certification.url}
                target="_blank"
                rel="noreferrer"
                className="prose-link text-[0.9375rem]"
              >
                {certification.name}
              </a>
              <span className="text-slate-soft font-mono text-[0.625rem] tracking-[0.06em] uppercase">
                {certification.issuer}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="md:col-span-5">
        <span className="eyebrow">Publication</span>
        <article className="border-hair bg-peach/35 mt-4 rounded-2xl border p-5 sm:p-6">
          <WaveMotif className="text-clay/40" width={120} />
          <h3 className="font-display text-ink mt-3 text-[1.25rem] leading-snug">{publication.title}</h3>
          <p className="text-slate mt-3 font-mono text-[0.6875rem] leading-relaxed tracking-[0.04em]">
            {publication.venue} · {publication.details}
          </p>
          <p className="text-slate mt-3.5 text-[0.875rem] leading-relaxed">{publication.abstract}</p>
          <div className="mt-5">
            <ActionLink href={publication.url} kind="paper">
              Read the paper
            </ActionLink>
          </div>
        </article>

        <p className="text-slate border-hair mt-8 border-t pt-6 text-[0.875rem] leading-relaxed">
          {profile.personal}
        </p>
      </Reveal>
    </div>
  );
}
