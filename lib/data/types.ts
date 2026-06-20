import type { LucideIcon } from "lucide-react";
import type { ModuleStatus } from "@/components/ui/StatusBadge";

export type CategorySlug = "medical" | "administrative" | "ai-infrastructure";

export type WorkflowStage =
  | "integrated"
  | "front-desk"
  | "triage"
  | "diagnosis"
  | "care"
  | "laboratory"
  | "management"
  | "education"
  | "infrastructure";

export type Accent = "zen" | "sky" | "success" | "violet" | "warning";

/**
 * Minimal translator shape shared by `useTranslations` (sync, server & client)
 * and the resolved value of `getTranslations` (async). Builders accept this so
 * the same data factories work in every rendering context.
 */
export interface Translator {
  (key: string, values?: Record<string, string | number | Date>): string;
  raw: (key: string) => unknown;
}

// ── Modules ─────────────────────────────────────────────────────────────
/** Locale-invariant module facts (icons, slugs, versions, accents). */
export interface ModuleSkeleton {
  slug: string;
  category: CategorySlug;
  status: ModuleStatus;
  version: string;
  stage: WorkflowStage;
  icon: LucideIcon;
  /** Subtle per-module accent — used sparingly, marketing stays core blue. */
  accent: Accent;
  /** Optional flag for flagship deployment cross-link. */
  deployment?: string;
}

/** A fully built module — skeleton merged with the active locale's copy. */
export interface ModuleItem extends ModuleSkeleton {
  name: string;
  /** Short label for compact cards / chips. */
  short: string;
  summary: string;
  problem: string;
  how: string[];
  roadmap: string[];
}

// ── Categories ──────────────────────────────────────────────────────────
export interface CategorySkeleton {
  slug: CategorySlug;
  accent: "zen" | "violet";
  icon: LucideIcon;
}

export interface Category extends CategorySkeleton {
  name: string;
  label: string;
  tagline: string;
  description: string;
}

// ── Deployments ─────────────────────────────────────────────────────────
export interface DeploymentSkeleton {
  slug: string;
  /** Proper noun — stays the same across locales. */
  name: string;
  /** Proper noun — stays the same across locales. */
  location: string;
  status: ModuleStatus;
  icon: LucideIcon;
}

export interface Deployment extends DeploymentSkeleton {
  institution: string;
  kind: string;
  summary: string;
  live: string[];
}

// ── Team ────────────────────────────────────────────────────────────────
export interface TeamSkeleton {
  /** Catalog key (george / vlad / horea). */
  key: string;
  /** Proper noun — stays the same across locales. */
  name: string;
  initials: string;
  /** Local headshot in /public/team. `null` → render the initials avatar. */
  photo: string | null;
  /** Profile URL. `null` → hide the LinkedIn link. */
  linkedin: string | null;
}

export interface TeamMember extends TeamSkeleton {
  role: string;
  bio: string;
}
