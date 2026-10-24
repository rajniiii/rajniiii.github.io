import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/projects";
import { SITE_URL } from "@/data/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...featuredProjects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}/`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
