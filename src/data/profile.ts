export const SITE_URL = "https://rajniiii.github.io";

export const profile = {
  name: "Rajanee Shenkar",
  role: "Data Science & Analytics",
  location: "New York City, NY",
  email: "shenkarrajanee@gmail.com",
  linkedin: "https://www.linkedin.com/in/rajanee-shenkar-a1862626b/",
  github: "https://github.com/rajniiii",
  tableau: "https://public.tableau.com/app/profile/rajanee.shenkar3444/vizzes",
  /** Served from /public so the link never depends on Drive permissions. */
  resume: "/Rajanee_Shenkar_Resume.pdf",
  headline: {
    lead: "I build intelligent systems that turn",
    emphasis: "complex data",
    trail: "into decisions you can act on.",
  },
  supporting:
    "LLM evaluation, agent tooling, data pipelines, GTM intelligence. The common thread is engineering that ends in a decision someone actually has to make — and that can explain itself when they ask why.",
  availability: "Open to Data Science and Data Analyst roles",
  authorization: "OPT + STEM extension · 3 years · no sponsorship required",
  relocation: "Open to relocation · based in New York City",
  photo: {
    src: "/assets/profile/profile-winter.jpg",
    alt: "Rajanee Shenkar",
  },
  personal:
    "Away from the keyboard: sketching, yoga, long cycling routes, trail hikes, and slowly working through French.",
} as const;
