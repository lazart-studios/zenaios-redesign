import type { Translator } from "./types";

/**
 * Honesty rule (brief §08): every metric is either a verifiable fact about the
 * platform, or explicitly framed as a projection. No unsourced hard claims.
 *
 * Numbers, prefixes and suffixes are locale-invariant and live in the skeletons
 * below; `label` and `sub` come from `outcomesData.*` in the catalog.
 */

export interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub?: string;
}

type StatSkeleton = {
  key: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

/** Credible, verifiable facts — these lead the proof story. */
export const factSkeletons: StatSkeleton[] = [
  { key: "modules", value: 17 },
  { key: "domains", value: 3 },
  { key: "deployments", value: 2 },
  { key: "languages", value: 5 },
];

/**
 * Efficiency figures carried over from the old site, reframed as clearly
 * labelled projections (the brief flags the originals as unsourced).
 */
export const projectionSkeletons: StatSkeleton[] = [
  { key: "admin", value: 25, suffix: "%", prefix: "~" },
  { key: "errors", value: 21, suffix: "%", prefix: "~" },
  { key: "cost", value: 10, suffix: "%", prefix: "~" },
  { key: "rag", value: 100, suffix: "%" },
];

function buildStats(t: Translator, skeletons: StatSkeleton[], group: string): Stat[] {
  return skeletons.map((s) => ({
    value: s.value,
    decimals: s.decimals,
    prefix: s.prefix,
    suffix: s.suffix,
    label: t(`${group}.${s.key}.label`),
    sub: t(`${group}.${s.key}.sub`),
  }));
}

/** `t` must be scoped to the `outcomesData` namespace. */
export function buildPlatformFacts(t: Translator): Stat[] {
  return buildStats(t, factSkeletons, "facts");
}

/** `t` must be scoped to the `outcomesData` namespace. */
export function buildOutcomeProjections(t: Translator): Stat[] {
  return buildStats(t, projectionSkeletons, "projections");
}

/** `t` must be scoped to the `outcomesData` namespace. */
export function buildProofBadges(t: Translator): string[] {
  return t.raw("badges") as string[];
}
