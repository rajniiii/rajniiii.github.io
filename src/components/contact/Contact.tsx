import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/Reveal";
import { ArcMotif, OrbitMotif } from "@/components/ui/Motifs";
import { Parallax } from "@/components/motion/Parallax";

export function Contact() {
  return (
    <Reveal className="relative overflow-hidden">
      <Parallax className="pointer-events-none absolute -top-16 -right-16 hidden lg:block" distance={40}>
        <OrbitMotif className="motif-spin text-plum/20" size={168} />
      </Parallax>

      <div className="grid gap-10 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-7">
          <h2 className="display-lg max-w-[20ch]">
            If you are building something that has to be <em className="text-plum italic">right</em>, not just
            impressive — let&rsquo;s talk.
          </h2>
          <p className="lede mt-6 max-w-[48ch]">
            I am looking for AI and data engineering work where the output changes a decision. Happy to walk through
            any of the projects above, including the parts that are still assumptions.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="font-display text-ink hover:text-plum mt-9 inline-block text-[clamp(1.5rem,3.4vw,2.25rem)] leading-none break-all transition-colors duration-300"
          >
            {profile.email}
          </a>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <ArcMotif className="text-sage" size={76} />
          <dl className="divide-hair mt-5 divide-y">
            <div className="py-3.5 first:pt-0">
              <dt className="eyebrow">Based in</dt>
              <dd className="text-ink mt-1.5 text-[0.9375rem]">
                {profile.location}
                <span className="text-slate"> · open to relocation</span>
              </dd>
            </div>
            <div className="py-3.5">
              <dt className="eyebrow">Status</dt>
              <dd className="text-ink mt-1.5 text-[0.9375rem]">{profile.availability}</dd>
            </div>
            <div className="py-3.5">
              <dt className="eyebrow">Work authorization</dt>
              <dd className="text-ink mt-1.5 text-[0.9375rem]">{profile.authorization}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="bg-ink text-ivory hover:bg-plum rounded-full px-5 py-2.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
            >
              Résumé ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border-hair-strong text-ink hover:border-plum hover:text-plum rounded-full border px-5 py-2.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="border-hair-strong text-ink hover:border-plum hover:text-plum rounded-full border px-5 py-2.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href={profile.tableau}
              target="_blank"
              rel="noreferrer"
              className="border-hair-strong text-ink hover:border-plum hover:text-plum rounded-full border px-5 py-2.5 font-mono text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
            >
              Tableau
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
