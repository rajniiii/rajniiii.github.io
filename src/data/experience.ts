import type { Role } from "./types";

export const roles: readonly Role[] = [
  {
    company: "Easley-Dunn Productions",
    role: "Data Engineer and Analyst",
    level: "intern",
    dates: "Jun 2026 — Present",
    summary:
      "Building a node-based game-balance simulation tool so designers can model and test mechanics without reading the code that implements them.",
    bullets: [
      "Developing the simulation tool in Unity on the GraphView API, letting designers compose and run balance models as graphs.",
      "Shipping the analysis layer around it: automated graph validation, batch comparison across config sets, and CSV/JSON export so results can leave the tool for external analysis.",
    ],
    stack: ["Unity", "GraphView API", "Python", "React"],
    lead: true,
  },
  {
    company: "Stevens Institute of Technology",
    role: "Graduate Assistant — Office of the Provost",
    dates: "Oct 2024 — May 2026",
    summary: "Operational data and reporting for the Provost's office.",
    bullets: [
      "Maintained inventory systems and structured datasets with consistent validation and version control.",
      "Built Excel dashboards and reporting decks used for administrative decisions, and ran the scheduling and stakeholder communication around them.",
    ],
    stack: ["Excel", "Data management", "Reporting"],
  },
  {
    company: "DigitalDose",
    role: "Backend Developer — data focus",
    dates: "Aug 2023 — Jul 2024",
    summary: "APIs and data models behind CRM and school-management products.",
    bullets: [
      "Built REST APIs on Node.js and MongoDB, with JWT authentication and role-based access across app workflows.",
      "Integrated NLP-based support tooling and TensorFlow Lite inference into product features.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "TensorFlow Lite"],
  },
  {
    company: "Yibe",
    role: "Data Engineer",
    dates: "Jul 2022 — Dec 2022",
    summary: "Microservices and data plumbing for authentication and payments.",
    bullets: [
      "Delivered Node.js microservices for authentication and payment flows, backed by Firebase Authentication and Firestore.",
      "Automated ETL and test scripts in Python to make the data side reproducible.",
    ],
    stack: ["Node.js", "Firebase", "Firestore", "Python"],
  },
  {
    company: "Iraje Software",
    role: "Application Support Analyst",
    dates: "Dec 2021 — Mar 2022",
    summary: "Implementation and support for a privileged access management platform.",
    bullets: [
      "Supported deployment and maintenance of PAM access controls, and wrote optimised SQL for retrieval and reporting.",
      "Debugged production application issues and documented support and escalation workflows with cross-functional teams.",
    ],
    stack: ["SQL", "PAM", "Application support"],
  },
] as const;
