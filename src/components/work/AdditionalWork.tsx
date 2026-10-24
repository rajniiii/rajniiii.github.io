import { sideProjects } from "@/data/projects";
import { ActionLink } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Reveal";

export function AdditionalWork() {
  return (
    <Reveal stagger className="divide-hair border-hair mt-12 grid divide-y border-t md:grid-cols-2 md:gap-x-12">
      {sideProjects.map((project) => (
        <article key={project.title} className="group py-7 md:py-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="display-sm">{project.title}</h3>
            <span className="text-slate-soft font-mono text-[0.625rem] tracking-[0.12em] uppercase">
              {project.category}
            </span>
          </div>

          <p className="text-slate mt-3 max-w-[58ch] text-[0.875rem] leading-relaxed">{project.description}</p>

          {project.note ? (
            <p className="text-slate-soft mt-2 font-mono text-[0.625rem] tracking-[0.06em]">{project.note}</p>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-slate-soft font-mono text-[0.625rem] tracking-[0.04em]">
              {project.stack.join(" · ")}
            </span>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-x-6 gap-y-2">
            {project.links.map((link) => (
              <ActionLink key={link.href} href={link.href} kind={link.kind}>
                {link.label}
              </ActionLink>
            ))}
          </div>
        </article>
      ))}
    </Reveal>
  );
}
