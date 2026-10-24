import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProjects, getProject } from "@/data/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { ActionLink, Eyebrow, Figure, RichText, Tag } from "@/components/ui/Primitives";
import { CrossMotif, StarMotif } from "@/components/ui/Motifs";
import { Reveal } from "@/components/motion/Reveal";
import { accentRule, accentText, cx, tintSurface } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Case study not found" };

  const description = `${project.oneLiner} — ${project.category}, built with ${project.stack.slice(0, 4).join(", ")}.`;

  return {
    title: `${project.title} — ${project.category}`,
    description,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}/`,
      title: `${project.title} — ${project.category}`,
      description,
    },
    twitter: { card: "summary_large_image", title: project.title, description },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const position = featuredProjects.findIndex((entry) => entry.slug === project.slug);
  const next = featuredProjects[(position + 1) % featuredProjects.length];

  return (
    <article className="pt-28 pb-16 md:pt-36">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <Link
          href="/#work"
          className="text-slate hover:text-ink inline-flex items-center gap-2 font-mono text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-300"
        >
          <span aria-hidden="true">←</span> All work
        </Link>

        <header className="mt-10 grid gap-8 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-7">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className={cx("font-mono text-[0.6875rem] tracking-[0.15em] uppercase", accentText[project.accent])}>
                {project.index} / {project.category}
              </span>
              <span className="text-slate-soft font-mono text-[0.6875rem] tracking-[0.1em]">{project.year}</span>
            </div>
            <h1 className="display-xl mt-4">{project.title}</h1>
            <p className="lede mt-6 max-w-[48ch]">{project.oneLiner}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              {project.links.map((link) => (
                <ActionLink key={link.href} href={link.href} kind={link.kind} variant="outline">
                  {link.label}
                </ActionLink>
              ))}
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Eyebrow>Stack</Eyebrow>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
            <StarMotif className="motif-drift mt-8 hidden md:block" size={22} />
          </aside>
        </header>

        <Reveal className={cx("mt-14 rounded-2xl p-3 sm:p-5 lg:mx-auto lg:max-w-[1000px]", tintSurface[project.tint])}>
          <Figure caption={project.figure}>
            <ProjectVisual visual={project.visual} />
          </Figure>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-x-12">
          <Reveal className="md:col-span-5">
            <h2 className="display-sm">The problem</h2>
            <p className="text-slate mt-5 text-[1rem] leading-relaxed">
              <RichText text={project.problem} />
            </p>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7">
            <h2 className="display-sm">What I built</h2>
            <ul className="mt-5 space-y-4">
              {project.built.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className={cx("mt-2.5 h-1 w-3.5 shrink-0 rounded-full opacity-55", accentRule[project.accent])}
                  />
                  <span className="text-slate text-[0.9375rem] leading-relaxed">
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-7">
            {project.detail.sections.map((section) => (
              <Reveal key={section.heading} className="rule-hair mt-10 pt-8 first:mt-0 first:border-t-0 first:pt-0">
                <h2 className="display-sm max-w-[26ch]">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-slate mt-5 max-w-[62ch] text-[0.9375rem] leading-relaxed md:text-base">
                    <RichText text={paragraph} />
                  </p>
                ))}
              </Reveal>
            ))}
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal className="border-hair bg-paper sticky top-28 rounded-2xl border p-5 sm:p-6">
              <Eyebrow>Decisions on record</Eyebrow>
              <dl className="divide-hair mt-4 divide-y">
                {project.detail.decisions.map((decision) => (
                  <div key={decision.label} className="py-3 first:pt-0 last:pb-0">
                    <dt className="text-slate-soft font-mono text-[0.625rem] tracking-[0.1em] uppercase">
                      {decision.label}
                    </dt>
                    <dd className="text-ink mt-1.5 font-mono text-[0.75rem] leading-relaxed">{decision.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>

        <Reveal className="border-hair bg-cream/35 mt-20 rounded-2xl border p-5 sm:p-8">
          <div className="flex items-center gap-3">
            <CrossMotif className="text-clay" />
            <h2 className="display-sm">What this does not claim</h2>
          </div>
          <ul className="mt-6 grid gap-5 md:grid-cols-3 md:gap-8">
            {project.detail.limits.map((limit) => (
              <li key={limit} className="text-slate text-[0.9375rem] leading-relaxed">
                <RichText text={limit} />
              </li>
            ))}
          </ul>
        </Reveal>

        {next ? (
          <nav className="border-hair mt-20 border-t pt-8" aria-label="Next case study">
            <Eyebrow>Next</Eyebrow>
            <Link href={`/work/${next.slug}/`} className="group mt-3 inline-flex items-baseline gap-4">
              <span className="display-md group-hover:text-plum transition-colors duration-300">{next.title}</span>
              <span
                aria-hidden="true"
                className="text-slate font-mono text-[0.875rem] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
            <p className="text-slate mt-2 max-w-[48ch] text-[0.9375rem]">{next.oneLiner}</p>
          </nav>
        ) : null}
      </div>
    </article>
  );
}
