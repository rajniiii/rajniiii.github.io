import { roles } from "@/data/experience";
import { Tag } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cx } from "@/lib/utils";

export function Experience() {
  const [lead, ...rest] = roles;

  return (
    <div className="mt-12">
      {lead ? (
        <Reveal className="border-hair bg-lavender/30 rounded-2xl border p-5 sm:p-8">
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <span className="eyebrow">current</span>
              <h3 className="display-sm mt-2.5">{lead.role}</h3>
              <p className="text-ink mt-1.5 text-[0.9375rem]">{lead.company}</p>
              <p className="text-slate-soft mt-2 font-mono text-[0.6875rem] tracking-[0.06em]">{lead.dates}</p>
            </div>
            <div className="md:col-span-8">
              <p className="text-ink text-[1.0625rem] leading-relaxed">{lead.summary}</p>
              <ul className="mt-5 space-y-3">
                {lead.bullets.map((bullet) => (
                  <li key={bullet} className="text-slate flex gap-3.5 text-[0.9375rem] leading-relaxed">
                    <span aria-hidden="true" className="bg-plum/50 mt-2.5 h-1 w-3.5 shrink-0 rounded-full" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {lead.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ) : null}

      <Reveal stagger className="divide-hair mt-4 divide-y">
        {rest.map((role) => (
          <article key={role.company} className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="font-display text-ink text-[1.25rem] leading-tight">{role.role}</h3>
              <p className="text-slate mt-1 text-[0.875rem]">{role.company}</p>
            </div>
            <p className="text-slate-soft font-mono text-[0.6875rem] tracking-[0.06em] md:col-span-2 md:pt-1.5">
              {role.dates}
            </p>
            <div className={cx("md:col-span-6")}>
              <p className="text-slate text-[0.9375rem] leading-relaxed">{role.summary}</p>
              <ul className="mt-2.5 space-y-1.5">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="text-slate-soft flex gap-2.5 text-[0.875rem] leading-relaxed">
                    <span aria-hidden="true" className="bg-hair-strong mt-2.5 h-1 w-2.5 shrink-0 rounded-full" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="text-slate-soft mt-3 font-mono text-[0.625rem] tracking-[0.04em]">
                {role.stack.join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </Reveal>
    </div>
  );
}
