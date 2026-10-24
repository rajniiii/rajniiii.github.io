export type Tint = "lavender" | "powder" | "sage" | "peach" | "cream";
export type Accent = "plum" | "forest" | "clay" | "marine";
export type VisualKey = "ragprobe" | "market-radar" | "playbook-forge" | "kaiko-mcp";
export type LinkKind = "repo" | "demo" | "video" | "paper" | "site";

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  readonly kind: LinkKind;
}

export interface DetailSection {
  readonly heading: string;
  readonly body: readonly string[];
}

export interface Decision {
  readonly label: string;
  readonly value: string;
}

export interface FeaturedProject {
  readonly slug: string;
  readonly index: string;
  readonly title: string;
  readonly category: string;
  readonly year: string;
  readonly tint: Tint;
  readonly accent: Accent;
  /** One-line positioning used in nav previews and metadata. */
  readonly oneLiner: string;
  /** Problem-first opening paragraph. */
  readonly problem: string;
  readonly built: readonly string[];
  readonly stack: readonly string[];
  readonly visual: VisualKey;
  readonly figure: string;
  readonly links: readonly ProjectLink[];
  readonly detail: {
    readonly sections: readonly DetailSection[];
    readonly decisions: readonly Decision[];
    readonly limits: readonly string[];
  };
}

export interface SideProject {
  readonly title: string;
  readonly category: string;
  readonly year: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly note?: string;
  readonly links: readonly ProjectLink[];
}

export interface Role {
  readonly company: string;
  readonly role: string;
  readonly dates: string;
  readonly location?: string;
  readonly summary: string;
  readonly bullets: readonly string[];
  readonly stack: readonly string[];
  readonly lead?: boolean;
}

export interface SkillGroup {
  readonly title: string;
  readonly note: string;
  readonly items: readonly string[];
  readonly tint: Tint;
}

export interface Degree {
  readonly school: string;
  readonly degree: string;
  readonly dates: string;
  readonly location: string;
  readonly courses: readonly string[];
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly url: string;
}

export interface Publication {
  readonly title: string;
  readonly authors: string;
  readonly venue: string;
  readonly details: string;
  readonly url: string;
  readonly abstract: string;
}
