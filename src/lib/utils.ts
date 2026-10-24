import type { Accent, Tint } from "@/data/types";

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Literal class maps — Tailwind only sees class names that appear verbatim in source. */
export const tintSurface: Record<Tint, string> = {
  lavender: "bg-lavender/60",
  powder: "bg-powder/60",
  sage: "bg-sage/60",
  peach: "bg-peach/55",
  cream: "bg-cream/45",
};

export const tintSolid: Record<Tint, string> = {
  lavender: "bg-lavender",
  powder: "bg-powder",
  sage: "bg-sage",
  peach: "bg-peach",
  cream: "bg-cream",
};

export const accentText: Record<Accent, string> = {
  plum: "text-plum",
  forest: "text-forest",
  clay: "text-clay",
  marine: "text-marine",
};

export const accentBorder: Record<Accent, string> = {
  plum: "border-plum/35",
  forest: "border-forest/35",
  clay: "border-clay/35",
  marine: "border-marine/35",
};

export const accentRule: Record<Accent, string> = {
  plum: "bg-plum",
  forest: "bg-forest",
  clay: "bg-clay",
  marine: "bg-marine",
};
