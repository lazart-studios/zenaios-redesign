import { HeartPulse, Landmark, Cpu } from "lucide-react";
import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "medical",
    name: "Medical",
    label: "Category A — Medical",
    tagline: "The flagship.",
    description:
      "Clinical solutions, hospital modules and medical education — the heart of the offering, grouped along the real clinical workflow from front desk to boardroom.",
    accent: "zen",
    icon: HeartPulse,
  },
  {
    slug: "administrative",
    name: "Administrative",
    label: "Category B — Administrative",
    tagline: "Civic & back-office.",
    description:
      "Civic management, administrative processes and RAG-based compliance — already live in a public institution.",
    accent: "zen",
    icon: Landmark,
  },
  {
    slug: "ai-infrastructure",
    name: "AI Infrastructure",
    label: "Category C — General",
    tagline: "The sovereign layer.",
    description:
      "AI tooling, local models and RAG infrastructure — the offline-capable technical foundation the whole platform is built on.",
    accent: "violet",
    icon: Cpu,
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
