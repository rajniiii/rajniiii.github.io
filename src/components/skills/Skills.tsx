import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/motion/Reveal";
import { cx, tintSolid } from "@/lib/utils";

export function Skills() {
  return (
    <Reveal stagger className="mt-12 grid gap-px md:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group) => (
        <div
          key={group.title}
          className="border-hair bg-paper/70 panel-lift hover:bg-paper relative border p-5 sm:p-6"
        >
          <span
            aria-hidden="true"
            className={cx("absolute top-0 left-0 h-full w-1", tintSolid[group.tint])}
          />
          <h3 className="font-display text-ink pl-3 text-[1.25rem] leading-none">{group.title}</h3>
          <p className="text-slate-soft mt-2 pl-3 font-mono text-[0.625rem] tracking-[0.08em] uppercase">
            {group.note}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5 pl-3">
            {group.items.map((item, index) => (
              <li key={item} className="text-slate text-[0.875rem] leading-snug">
                {item}
                {index < group.items.length - 1 ? (
                  <span aria-hidden="true" className="text-hair-strong ml-2">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Reveal>
  );
}
