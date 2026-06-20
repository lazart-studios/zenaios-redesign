import { HeartPulse, Landmark, GraduationCap, ShieldCheck, Briefcase, Pill } from "lucide-react";
import type { Industry, IndustrySkeleton, Translator } from "./types";

/**
 * Industries ZenAiOS serves. Healthcare is the proven pillar; the rest signal
 * how far the same AI operating system reaches. Locale-invariant facts only —
 * names + taglines live under `industries.items.*` in the catalog. Keep this in
 * sync with the `industries.items` namespace in every messages/<locale>.json.
 */
export const industrySkeletons: IndustrySkeleton[] = [
  { slug: "healthcare", icon: HeartPulse, status: "live" },
  { slug: "publicAdministration", icon: Landmark, status: "live" },
  { slug: "education", icon: GraduationCap, status: "building" },
  { slug: "insurance", icon: ShieldCheck, status: "exploring" },
  { slug: "business", icon: Briefcase, status: "exploring" },
  { slug: "pharmacy", icon: Pill, status: "building" },
];

/** `t` must be scoped to the `industries.items` namespace. */
export function buildIndustries(t: Translator): Industry[] {
  return industrySkeletons.map((i) => ({
    ...i,
    name: t(`${i.slug}.name`),
    tagline: t(`${i.slug}.tagline`),
  }));
}
