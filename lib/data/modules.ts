import {
  Hospital,
  UserRound,
  Stethoscope,
  HeartPulse,
  Siren,
  FlaskConical,
  ScanSearch,
  LayoutDashboard,
  Smartphone,
  ShieldAlert,
  Database,
  GraduationCap,
  BarChart3,
  Landmark,
  ScrollText,
  Lock,
  GitCompareArrows,
} from "lucide-react";
import type { ModuleItem, ModuleSkeleton, Translator } from "./types";

/**
 * The real platform: 17 modules across three categories. Locale-invariant facts
 * (slug, category, status, version, stage, icon, accent, deployment link) live
 * in the skeletons below; all prose (name/short/summary/problem/how/roadmap)
 * lives under `modules.items.<slug>.*` in the catalog.
 */
export const moduleSkeletons: ModuleSkeleton[] = [
  // ── Category A — Medical ──────────────────────────────────────────────
  {
    slug: "zenaios-hospital",
    category: "medical",
    status: "active",
    version: "v2.4",
    stage: "integrated",
    icon: Hospital,
    accent: "zen",
    deployment: "sjuo-oradea",
  },
  {
    slug: "patient",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "front-desk",
    icon: UserRound,
    accent: "sky",
  },
  {
    slug: "doctor",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "diagnosis",
    icon: Stethoscope,
    accent: "zen",
  },
  {
    slug: "nursing",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "care",
    icon: HeartPulse,
    accent: "sky",
  },
  {
    slug: "emergency-triage",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "triage",
    icon: Siren,
    accent: "warning",
  },
  {
    slug: "laboratory",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "laboratory",
    icon: FlaskConical,
    accent: "sky",
  },
  {
    slug: "labiq",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "laboratory",
    icon: ScanSearch,
    accent: "zen",
  },
  {
    slug: "hospital-manager",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "management",
    icon: LayoutDashboard,
    accent: "zen",
  },
  {
    slug: "manager-mobile",
    category: "medical",
    status: "module",
    version: "v2.0",
    stage: "management",
    icon: Smartphone,
    accent: "sky",
  },
  {
    slug: "risk-assessment",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "diagnosis",
    icon: ShieldAlert,
    accent: "warning",
  },
  {
    slug: "data-collection",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "front-desk",
    icon: Database,
    accent: "sky",
  },
  {
    slug: "quiz",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "education",
    icon: GraduationCap,
    accent: "success",
  },
  {
    slug: "analytics",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "management",
    icon: BarChart3,
    accent: "zen",
  },

  // ── Category B — Administrative ───────────────────────────────────────
  {
    slug: "citizen",
    category: "administrative",
    status: "active",
    version: "v1.1",
    stage: "front-desk",
    icon: Landmark,
    accent: "zen",
    deployment: "oradea-city-hall",
  },
  {
    slug: "administrative-module",
    category: "administrative",
    status: "module",
    version: "v1.0",
    stage: "infrastructure",
    icon: ScrollText,
    accent: "zen",
  },

  // ── Category C — AI Infrastructure ────────────────────────────────────
  {
    slug: "zen-rag",
    category: "ai-infrastructure",
    status: "dev",
    version: "Beta",
    stage: "infrastructure",
    icon: Lock,
    accent: "violet",
  },
  {
    slug: "llm-compare",
    category: "ai-infrastructure",
    status: "dev",
    version: "v0.8",
    stage: "infrastructure",
    icon: GitCompareArrows,
    accent: "violet",
  },
];

export const moduleCount = moduleSkeletons.length;

// ── Skeleton-only helpers (no locale needed — for counts and chips) ───────
export function getModuleSkeleton(slug: string) {
  return moduleSkeletons.find((m) => m.slug === slug);
}

export function modulesByCategory(category: string) {
  return moduleSkeletons.filter((m) => m.category === category);
}

export function countByCategory(category: string) {
  return modulesByCategory(category).length;
}

// ── Builders (merge skeleton with the active locale's copy) ───────────────
function build(t: Translator, skeleton: ModuleSkeleton): ModuleItem {
  return {
    ...skeleton,
    name: t(`${skeleton.slug}.name`),
    short: t(`${skeleton.slug}.short`),
    summary: t(`${skeleton.slug}.summary`),
    problem: t(`${skeleton.slug}.problem`),
    how: t.raw(`${skeleton.slug}.how`) as string[],
    roadmap: t.raw(`${skeleton.slug}.roadmap`) as string[],
  };
}

/** `t` must be scoped to the `modules.items` namespace. */
export function buildModules(t: Translator): ModuleItem[] {
  return moduleSkeletons.map((m) => build(t, m));
}

export function buildModule(t: Translator, slug: string): ModuleItem | undefined {
  const m = getModuleSkeleton(slug);
  if (!m) return undefined;
  return build(t, m);
}

export function buildModulesByCategory(t: Translator, category: string): ModuleItem[] {
  return modulesByCategory(category).map((m) => build(t, m));
}
