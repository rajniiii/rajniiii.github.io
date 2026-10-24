import Link from "next/link";
import type { FeaturedProject } from "@/data/types";
import { featuredProjects } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { ActionLink, Figure, RichText, Tag } from "@/components/ui/Primitives";
import { StarMotif } from "@/components/ui/Motifs";
import { Reveal } from "@/components/motion/Reveal";
import { TiltPanel } from "@/components/motion/TiltPanel";
import { accentRule, accentText, cx, tintSurface } from "@/lib/utils";

type Layout = "split-right" | "stacked" | "split-left" | "compact";

const layouts: readonly Layout[] = ["split-right", "stacked", "split-left", "compact"];

function Bullets({ items, project }: { items: readonly string[]; project: FeaturedProject }) {
  return (
    <ul className="mt-6 space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3.5">
          <span
            aria-hidden="true"
            className={cx("mt-2.5 h-1 w-3.5 shrink-0 rounded-full", accentRule[project.accent], "opacity-55")}
          />
          <span className="text-slate text-[0.9375rem] leading-relaxed">
            <RichText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Header({ project }: { project: FeaturedProject }) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className={cx(
          "font-display pointer-events-none absolute -top-14 -left-2 text-[5.5rem] leading-none opacity-[0.11] select-none sm:text-[7.5rem]",
          accentText[project.accent],
        )}
      >
        {project.index}
      </span>
      <div className="relative flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className={cx("font-mono text-[0.6875rem] tracking-[0.15em] uppercase", accentText[project.accent])}>
          {project.category}
        </span>
        <span className="text-slate-soft font-mono text-[0.6875rem] tracking-[0.1em]">{project.year}</span>
      </div>
      <h3 className="display-md relative mt-2.5">
        <Link href={`/work/${project.slug}/`} className="hover:text-plum transition-colors duration-300">
          {project.title}
        </Link>
      </h3>
    </div>
  );
}

function Meta({ project }: { project: FeaturedProject }) {
  return (
    <>
      <div className="mt-7 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
        <Link
          href={`/work/${project.slug}/`}
          className="group text-ink hover:text-plum inline-flex items-center gap-2 font-mono text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-300"
        >
          Case study
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
          >
            →
          </span>
        </Link>
        {project.links.map((link) => (
          <ActionLink key={link.href} href={link.href} kind={link.kind}>
            {link.label}
          </ActionLink>
        ))}
      </div>
    </>
  );
}

function VisualBlock({ project }: { project: FeaturedProject }) {
  return (
    <TiltPanel>
      <div className={cx("rounded-2xl p-3 sm:p-4", tintSurface[project.tint])}>
        <Figure caption={project.figure}>
          <ProjectVisual visual={project.visual} />
        </Figure>
      </div>
    </TiltPanel>
  );
}

function ProjectBlock({ project, layout }: { project: FeaturedProject; layout: Layout }) {
  if (layout === "stacked") {
    return (
      <Reveal className="rule-hair grid gap-10 pt-12 md:grid-cols-12 md:gap-x-10 md:pt-14">
        <div className="md:col-span-5">
          <Header project={project} />
          <p className="text-slate mt-6 text-[0.9375rem] leading-relaxed md:text-base">
            <RichText text={project.problem} />
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Bullets items={project.built} project={project} />
          <Meta project={project} />
        </div>
        <div className="md:col-span-12">
          <VisualBlock project={project} />
        </div>
      </Reveal>
    );
  }

  if (layout === "split-left") {
    return (
      <Reveal className="rule-hair grid items-center gap-10 pt-12 md:grid-cols-12 md:gap-x-12 md:pt-14">
        <div className="md:col-span-6 md:order-1">
          <VisualBlock project={project} />
        </div>
        <div className="md:col-span-6 md:order-2">
          <Header project={project} />
          <p className="text-slate mt-6 max-w-[54ch] text-[0.9375rem] leading-relaxed md:text-base">
            <RichText text={project.problem} />
          </p>
          <Bullets items={project.built} project={project} />
          <Meta project={project} />
        </div>
      </Reveal>
    );
  }

  if (layout === "compact") {
    return (
      <Reveal className="rule-hair grid gap-10 pt-12 md:grid-cols-12 md:gap-x-12 md:pt-14">
        <div className="md:col-span-7">
          <Header project={project} />
          <p className="text-slate mt-6 max-w-[56ch] text-[0.9375rem] leading-relaxed md:text-base">
            <RichText text={project.problem} />
          </p>
          <Bullets items={project.built} project={project} />
          <Meta project={project} />
        </div>
        <div className="md:col-span-5 md:pt-14">
          <VisualBlock project={project} />
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className="rule-hair grid gap-10 pt-12 md:grid-cols-12 md:gap-x-12 md:pt-14">
      <div className="md:col-span-5">
        <Header project={project} />
        <p className="text-slate mt-6 text-[0.9375rem] leading-relaxed md:text-base">
            <RichText text={project.problem} />
          </p>
        <Bullets items={project.built} project={project} />
        <Meta project={project} />
      </div>
      <div className="relative md:col-span-6 md:col-start-7">
        <StarMotif className="motif-drift absolute -top-7 -right-2 hidden md:block" size={20} />
        <VisualBlock project={project} />
      </div>
    </Reveal>
  );
}

export function FeaturedWork() {
  return (
    <div className="mt-14 space-y-16 md:space-y-24">
      {featuredProjects.map((project, index) => (
        <ProjectBlock key={project.slug} project={project} layout={layouts[index % layouts.length] ?? "split-right"} />
      ))}
    </div>
  );
}
