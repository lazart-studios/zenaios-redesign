import { Hospital, Landmark } from "lucide-react";
import type { Deployment, DeploymentSkeleton, Translator } from "./types";

/**
 * Locale-invariant deployment facts. Institution names that are proper nouns
 * (the hospital and city hall) stay fixed; the rest of the copy lives under
 * `deploymentsData.*` in the catalog.
 */
export const deploymentSkeletons: DeploymentSkeleton[] = [
  {
    slug: "sjuo-oradea",
    name: "Spitalul Județean de Urgență Oradea",
    location: "Oradea, România",
    status: "active",
    icon: Hospital,
  },
  {
    slug: "oradea-city-hall",
    name: "Primăria Oradea",
    location: "Oradea, România",
    status: "active",
    icon: Landmark,
  },
];

export function getDeploymentSkeleton(slug: string) {
  return deploymentSkeletons.find((d) => d.slug === slug);
}

/** `t` must be scoped to the `deploymentsData` namespace. */
export function buildDeployments(t: Translator): Deployment[] {
  return deploymentSkeletons.map((d) => ({
    ...d,
    institution: t(`${d.slug}.institution`),
    kind: t(`${d.slug}.kind`),
    summary: t(`${d.slug}.summary`),
    live: t.raw(`${d.slug}.live`) as string[],
  }));
}

export function buildDeployment(t: Translator, slug: string): Deployment | undefined {
  const d = getDeploymentSkeleton(slug);
  if (!d) return undefined;
  return {
    ...d,
    institution: t(`${d.slug}.institution`),
    kind: t(`${d.slug}.kind`),
    summary: t(`${d.slug}.summary`),
    live: t.raw(`${d.slug}.live`) as string[],
  };
}
