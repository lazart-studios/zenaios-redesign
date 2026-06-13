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

export interface ModuleItem {
  slug: string;
  name: string;
  /** Short label for compact cards / chips. */
  short: string;
  category: CategorySlug;
  status: ModuleStatus;
  version: string;
  stage: WorkflowStage;
  icon: LucideIcon;
  /** Subtle per-module accent — used sparingly, marketing stays core blue. */
  accent: "zen" | "sky" | "success" | "violet" | "warning";
  /** "What it does" — close to the brief. */
  summary: string;
  /** "What problem it solves". */
  problem: string;
  /** "How it works" bullets. */
  how: string[];
  /** Forward-looking roadmap items. */
  roadmap: string[];
  /** Optional flag for flagship deployment cross-link. */
  deployment?: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  label: string;
  tagline: string;
  description: string;
  accent: "zen" | "violet";
  icon: LucideIcon;
}

export interface Deployment {
  slug: string;
  name: string;
  institution: string;
  kind: string;
  location: string;
  status: ModuleStatus;
  summary: string;
  live: string[];
  icon: LucideIcon;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  linkedin: string;
}
