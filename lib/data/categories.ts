import { HeartPulse, Landmark, Cpu } from "lucide-react";
import type { Category, CategorySkeleton, Translator } from "./types";

/** Locale-invariant category facts. Copy lives in `categories.*` in the catalog. */
export const categorySkeletons: CategorySkeleton[] = [
  { slug: "medical", accent: "zen", icon: HeartPulse },
  { slug: "administrative", accent: "zen", icon: Landmark },
  { slug: "ai-infrastructure", accent: "violet", icon: Cpu },
];

export const categorySlugs = categorySkeletons.map((c) => c.slug);

export function getCategorySkeleton(slug: string) {
  return categorySkeletons.find((c) => c.slug === slug);
}

/** `t` must be scoped to the `categories` namespace. */
export function buildCategories(t: Translator): Category[] {
  return categorySkeletons.map((c) => ({
    ...c,
    name: t(`${c.slug}.name`),
    label: t(`${c.slug}.label`),
    tagline: t(`${c.slug}.tagline`),
    description: t(`${c.slug}.description`),
  }));
}

export function buildCategory(t: Translator, slug: string): Category | undefined {
  const c = getCategorySkeleton(slug);
  if (!c) return undefined;
  return {
    ...c,
    name: t(`${c.slug}.name`),
    label: t(`${c.slug}.label`),
    tagline: t(`${c.slug}.tagline`),
    description: t(`${c.slug}.description`),
  };
}
