import type { ReactNode } from "react";
import { Hero } from "@/components/hero/Hero";
import { FeaturedWork } from "@/components/work/FeaturedWork";
import { AdditionalWork } from "@/components/work/AdditionalWork";
import { Dashboards } from "@/components/dashboards/Dashboards";
import { Experience } from "@/components/experience/Experience";
import { Skills } from "@/components/skills/Skills";
import { Background } from "@/components/background/Background";
import { Contact } from "@/components/contact/Contact";
import { SectionHeading } from "@/components/ui/Primitives";
import { featuredProjects } from "@/data/projects";
import { SITE_URL, profile } from "@/data/profile";
import { cx } from "@/lib/utils";

function Band({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cx("scroll-mt-24 py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">{children}</div>
    </section>
  );
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "New York City", addressRegion: "NY" },
  sameAs: [profile.github, profile.linkedin],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Stevens Institute of Technology" },
    { "@type": "CollegeOrUniversity", name: "MIT World Peace University" },
  ],
  knowsAbout: ["LLM evaluation", "Retrieval-augmented generation", "Model Context Protocol", "Data engineering"],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <Hero />

      <Band id="work">
        <SectionHeading
          index="01 / Selected work"
          title="Four systems, taken far enough to argue with"
          note="Each one started from a problem I could state before writing code. The case studies carry the decisions, the thresholds, and the parts I would not yet defend in a review."
        />
        <FeaturedWork />
      </Band>

      <Band id="dashboards">
        <SectionHeading
          index="02 / Dashboards"
          title="Four views of the energy transition"
          note="Where the world's electricity comes from, country by country: solar, hydro and wind set against nuclear, geothermal and biofuel, and how that mix has shifted year over year."
        />
        <Dashboards />
      </Band>

      <Band id="more-work" className="bg-shell/45 border-hair border-y">
        <SectionHeading
          index="03 / Additional work"
          title="Also on the bench"
          note="Smaller builds, coursework that outgrew its assignment, and one hackathon weekend."
        />
        <AdditionalWork />
      </Band>

      <Band id="experience">
        <SectionHeading
          index="04 / Experience"
          title="Where the work has happened"
          note="Five roles across data tooling, backend data services and operational reporting."
        />
        <Experience />
      </Band>

      <Band id="capabilities" className="dot-paper">
        <SectionHeading
          index="05 / Capabilities"
          title="What I reach for"
          note="Grouped by what it is for, rather than by how long the list can be made to look."
        />
        <Skills />
      </Band>

      <Band id="background">
        <SectionHeading index="06 / Background" title="Degrees, a paper, and the rest" />
        <Background />
      </Band>

      <Band id="contact" className="border-hair border-t">
        <Contact />
      </Band>

      {/* Preloaded by the crawler, not shown: keeps project URLs discoverable without JS */}
      <nav aria-label="Case studies" className="sr-only">
        {featuredProjects.map((project) => (
          <a key={project.slug} href={`/work/${project.slug}/`}>
            {project.title}
          </a>
        ))}
      </nav>
    </>
  );
}
