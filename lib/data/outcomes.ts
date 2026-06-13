/**
 * Honesty rule (brief §08): every metric is either a verifiable fact about the
 * platform, or explicitly framed as a projection. No unsourced hard claims.
 */

export interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub?: string;
}

/** Credible, verifiable facts — these lead the proof story. */
export const platformFacts: Stat[] = [
  { value: 17, label: "AI modules", sub: "Across three domains" },
  { value: 3, label: "Product domains", sub: "Medical · Admin · AI infra" },
  { value: 2, label: "Live deployments", sub: "Hospital + city hall" },
  { value: 6, label: "Languages", sub: "RO · EN · HU · DE · FR · ID" },
];

/**
 * Efficiency figures carried over from the old site, reframed as clearly
 * labelled projections (the brief flags the originals as unsourced).
 */
export const outcomeProjections: Stat[] = [
  {
    value: 25,
    suffix: "%",
    prefix: "~",
    label: "Less time on admin tasks",
    sub: "Projection",
  },
  {
    value: 21,
    suffix: "%",
    prefix: "~",
    label: "Fewer diagnostic errors",
    sub: "Projection",
  },
  {
    value: 10,
    suffix: "%",
    prefix: "~",
    label: "Lower cost per visit",
    sub: "Projection",
  },
  {
    value: 100,
    suffix: "%",
    label: "Offline-capable RAG",
    sub: "Data stays on-premise",
  },
];

export const proofBadges = [
  "SJUO Oradea",
  "Oradea City Hall",
  "6 languages",
  "Sovereign offline RAG",
  "ICD-10 · DRG · FOCG",
  "Azure Speech voice",
];
