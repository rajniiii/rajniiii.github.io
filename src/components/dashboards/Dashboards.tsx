import { dashboards, tableauProfile } from "@/data/dashboards";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Reveal";

/** Small energy-mix motif — decorative, in the palette, not a data claim. */
function MixMotif() {
  const bars = [
    { height: 46, fill: "var(--color-forest)" },
    { height: 68, fill: "var(--color-marine)" },
    { height: 30, fill: "var(--color-clay)" },
    { height: 56, fill: "var(--color-plum)" },
    { height: 22, fill: "var(--color-slate-soft)" },
  ];

  return (
    <svg viewBox="0 0 132 80" className="h-auto w-[132px]" aria-hidden="true">
      <line x1="0" y1="74.5" x2="132" y2="74.5" stroke="var(--color-hair-strong)" strokeWidth="1" />
      {bars.map((bar, index) => (
        <rect
          key={bar.fill}
          x={index * 27 + 4}
          y={74 - bar.height}
          width="14"
          height={bar.height}
          rx="3"
          fill={bar.fill}
          opacity="0.75"
        />
      ))}
    </svg>
  );
}

export function Dashboards() {
  return (
    <Reveal className="border-hair bg-sage/45 relative mt-12 overflow-hidden rounded-2xl border p-5 sm:p-8">
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-4">
          <Eyebrow>Tableau Public · 4 dashboards</Eyebrow>
          <p className="text-slate mt-5 text-[0.9375rem] leading-relaxed">
            Built in Tableau as story points and dashboards, each one filterable by country, energy source and
            chart view, so a single view answers more than one question.
          </p>

          <div className="mt-7">
            <MixMotif />
          </div>

          <a
            href={tableauProfile}
            target="_blank"
            rel="noreferrer"
            className="bg-ink text-ivory hover:bg-forest mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
          >
            View on Tableau Public
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <ul className="divide-hair divide-y md:col-span-7 md:col-start-6">
          {dashboards.map((dashboard) => (
            <li key={dashboard.href}>
              <a
                href={dashboard.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-5 py-4 first:pt-0 last:pb-0"
              >
                <span>
                  <span className="font-display text-ink group-hover:text-forest block text-[1.25rem] leading-tight transition-colors duration-300">
                    {dashboard.title}
                  </span>
                  <span className="text-slate mt-1.5 block max-w-[52ch] text-[0.875rem] leading-relaxed">
                    {dashboard.focus}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-slate-soft group-hover:text-forest mt-1 font-mono text-[0.875rem] transition-all duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
