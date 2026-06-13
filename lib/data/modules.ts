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
import type { ModuleItem } from "./types";

/**
 * The real platform: 17 modules across three categories.
 * "summary" stays close to the handover brief; problem/how/roadmap are
 * tightened product copy (forward-looking items are clearly roadmap).
 */
export const modules: ModuleItem[] = [
  // ── Category A — Medical ──────────────────────────────────────────────
  {
    slug: "zenaios-hospital",
    name: "ZenAiOS Hospital — SJUO",
    short: "Hospital OS",
    category: "medical",
    status: "active",
    version: "v2.4",
    stage: "integrated",
    icon: Hospital,
    accent: "zen",
    deployment: "sjuo-oradea",
    summary:
      "Integrated hospital management deployed at Spitalul Județean de Urgență Oradea — beds, FOCG with ICD-10 & DRG coding, AI epicrisis and the ZenA assistant in one system.",
    problem:
      "Hospital data lives in disconnected systems, so clinicians re-key information and management never has a live picture. ZenAiOS Hospital unifies the clinical record, coding and operations on one AI-native platform.",
    how: [
      "Electronic FOCG (observation chart) with ICD-10 & DRG coding",
      "AI-assisted epicrisis and discharge documents",
      "Real-time bed and department management",
      "ZenA assistant embedded for staff, with voice support",
    ],
    roadmap: [
      "Wider department coverage",
      "Deeper CNAS / DSP reporting automation",
      "Expanded multilingual clinical documentation",
    ],
  },
  {
    slug: "patient",
    name: "Patient Module",
    short: "Patient",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "front-desk",
    icon: UserRound,
    accent: "sky",
    summary:
      "Online appointments, result access, AI communication, symptom monitoring and personalised guidance for patients.",
    problem:
      "Patients struggle to reach the right service and to understand their next step. The Patient Module gives them a guided, multilingual front door to care.",
    how: [
      "Book and manage appointments online",
      "Secure access to results and records",
      "AI symptom monitoring and personalised guidance",
      "Conversational support across five languages",
    ],
    roadmap: ["Care-plan reminders", "Home-monitoring & wearable integrations"],
  },
  {
    slug: "doctor",
    name: "Doctor Module",
    short: "Doctor",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "diagnosis",
    icon: Stethoscope,
    accent: "zen",
    summary:
      "AI decision support for diagnosis and treatment, automatic epicrisis and document generation, and workflow optimisation for physicians.",
    problem:
      "Doctors lose hours to documentation and context-switching. The Doctor Module brings decision support and auto-generated notes into the clinical flow, not on top of it.",
    how: [
      "Context-aware differential and treatment suggestions",
      "Automatic epicrisis & clinical document generation",
      "Evidence-aware guidance at the point of care",
      "Workflow optimisation across the shift",
    ],
    roadmap: ["Specialty-specific guideline packs", "Deeper EHR write-back"],
  },
  {
    slug: "nursing",
    name: "Nursing Module",
    short: "Nursing",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "care",
    icon: HeartPulse,
    accent: "sky",
    summary:
      "Treatment administration, vital-sign monitoring, procedural checklists and care-team communication for nursing staff.",
    problem:
      "Care delivery depends on accurate, timely coordination. The Nursing Module keeps administration, vitals and checklists in one place and the whole care team in sync.",
    how: [
      "Treatment administration tracking",
      "Vital-sign monitoring and trends",
      "Procedural checklists",
      "Care-team communication",
    ],
    roadmap: ["Shift handover summaries", "Device-data ingestion"],
  },
  {
    slug: "emergency-triage",
    name: "Emergency Triage",
    short: "Triage",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "triage",
    icon: Siren,
    accent: "warning",
    summary:
      "Manchester protocol combined with AI to classify patients into five severity levels, auto-prioritise the queue and alert doctors.",
    problem:
      "In a busy emergency department, prioritisation has to be fast and defensible. Triage pairs the Manchester standard with AI to keep the queue ordered by real severity.",
    how: [
      "Manchester + AI classification into 5 severity levels",
      "Automatic prioritisation of the queue",
      "Doctor alerts for high-acuity cases",
    ],
    roadmap: ["Vitals-driven re-triage", "Capacity-aware routing"],
  },
  {
    slug: "laboratory",
    name: "Laboratory Module",
    short: "Lab",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "laboratory",
    icon: FlaskConical,
    accent: "sky",
    summary:
      "Sampling, processing and AI interpretation with pathological-value highlighting and automatic FOCG integration.",
    problem:
      "Lab results need to reach the right chart, flagged and in context. The Laboratory Module connects the bench to the observation chart automatically.",
    how: [
      "Sampling and processing workflow",
      "AI interpretation with pathological-value highlighting",
      "Automatic FOCG integration",
    ],
    roadmap: ["Analyzer integrations", "Reference-range personalisation"],
  },
  {
    slug: "labiq",
    name: "LabIQ",
    short: "LabIQ",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "laboratory",
    icon: ScanSearch,
    accent: "zen",
    summary:
      "AI analysis of lab reports from PDF or image uploads, with plain-language explanations and follow-up guidance.",
    problem:
      "A lab report is hard to read for most people. LabIQ turns an uploaded PDF or photo into a plain-language explanation and clear next steps.",
    how: [
      "Upload a lab report as PDF or image",
      "AI extraction and analysis of values",
      "Plain-language explanation and follow-up guidance",
    ],
    roadmap: ["Trend tracking across reports", "Clinician share links"],
  },
  {
    slug: "hospital-manager",
    name: "Hospital Manager",
    short: "Manager",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "management",
    icon: LayoutDashboard,
    accent: "zen",
    summary:
      "Executive dashboards, AI predictive analytics, CNAS / DSP interoperability and an AI avatar for real-time decisions.",
    problem:
      "Management decisions are only as good as the data behind them. Hospital Manager turns live operational data into forecasts and answers leadership can act on.",
    how: [
      "Executive dashboards across the hospital",
      "AI predictive analytics for demand and staffing",
      "CNAS / DSP interoperability",
      "AI avatar for real-time decision support",
    ],
    roadmap: ["Scenario planning", "Benchmark reporting"],
  },
  {
    slug: "manager-mobile",
    name: "Manager Mobile Dashboard",
    short: "Mobile",
    category: "medical",
    status: "module",
    version: "v2.0",
    stage: "management",
    icon: Smartphone,
    accent: "sky",
    summary:
      "Mobile oversight of departments, staffing, alerts and finance, with a manager AI assistant in your pocket.",
    problem:
      "Leadership is rarely at a desk. The Manager Mobile Dashboard puts the operational picture and an AI assistant on the phone, designed mobile-first.",
    how: [
      "Departments, staffing and finance at a glance",
      "Push alerts for what needs attention",
      "Manager AI assistant on mobile",
    ],
    roadmap: ["Offline snapshots", "Approvals on the go"],
  },
  {
    slug: "risk-assessment",
    name: "Risk Assessment",
    short: "Risk",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "diagnosis",
    icon: ShieldAlert,
    accent: "warning",
    summary:
      "An AI risk workspace with probability bands, time windows and an overall risk tier.",
    problem:
      "Risk is a moving target. This workspace makes probability, timing and overall tier explicit, so clinical decisions are grounded and reviewable.",
    how: [
      "Probability bands per risk factor",
      "Time-window estimates",
      "An overall, explainable risk tier",
    ],
    roadmap: ["Cohort comparisons", "Guideline-linked rationales"],
  },
  {
    slug: "data-collection",
    name: "Hospital Data Collection",
    short: "Data",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "front-desk",
    icon: Database,
    accent: "sky",
    summary:
      "Admissions, master data, bed maps, insurance, pharmacy and reporting in one structured workspace.",
    problem:
      "Clean structured data is the foundation everything else runs on. This module captures it once, at the source, and keeps it consistent across the hospital.",
    how: [
      "Admissions and master data",
      "Bed maps and capacity",
      "Insurance, pharmacy and reporting",
    ],
    roadmap: ["Configurable reporting templates", "Data-quality checks"],
  },
  {
    slug: "quiz",
    name: "QUIZ Module",
    short: "CME",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "education",
    icon: GraduationCap,
    accent: "success",
    summary:
      "Accredited CME for doctors and residents: AI-generated adaptive clinical cases, competency evaluation and certified CME hours.",
    problem:
      "Continuing education competes with clinical time. The QUIZ Module makes CME adaptive and case-based, so learning fits real schedules and counts.",
    how: [
      "AI-generated adaptive clinical cases",
      "Competency evaluation",
      "Accredited CME hours",
    ],
    roadmap: ["Specialty tracks", "Team leaderboards"],
  },
  {
    slug: "analytics",
    name: "Analytics Dashboard",
    short: "Analytics",
    category: "medical",
    status: "module",
    version: "v1.0",
    stage: "management",
    icon: BarChart3,
    accent: "zen",
    summary:
      "A standalone dashboard for the chat-widget analytics system, powered by live telemetry.",
    problem:
      "If the assistant is the front door, its analytics are the floor plan. This dashboard makes conversation telemetry legible and actionable.",
    how: [
      "Live telemetry from the chat widget",
      "Usage, topics and resolution metrics",
      "Standalone, embeddable dashboard",
    ],
    roadmap: ["Custom funnels", "Alerting on anomalies"],
  },

  // ── Category B — Administrative ───────────────────────────────────────
  {
    slug: "citizen",
    name: "Citizen Module — Oradea City Hall",
    short: "Citizen",
    category: "administrative",
    status: "active",
    version: "v1.1",
    stage: "front-desk",
    icon: Landmark,
    accent: "zen",
    deployment: "oradea-city-hall",
    summary:
      "AI-generated reports, online services, an interactive neighbourhood map and the ZenA civic assistant — live at Oradea City Hall.",
    problem:
      "Citizens need a single, clear way to reach public services. The Citizen Module is the civic front door — services, maps and a multilingual assistant in one place.",
    how: [
      "AI-generated reports and requests",
      "Online municipal services",
      "Interactive neighbourhood map",
      "ZenA civic assistant",
    ],
    roadmap: ["More service categories", "Cross-department routing"],
  },
  {
    slug: "administrative-module",
    name: "Administrative Module",
    short: "Admin",
    category: "administrative",
    status: "module",
    version: "v1.0",
    stage: "infrastructure",
    icon: ScrollText,
    accent: "zen",
    summary:
      "RAG for non-clinical processes: legal compliance, CNAS accounting, medication management and AI hospital inventory.",
    problem:
      "Back-office processes are document-heavy and rule-bound. The Administrative Module applies retrieval-augmented AI to compliance, accounting and inventory.",
    how: [
      "RAG over legal & compliance documents",
      "CNAS accounting support",
      "Medication management",
      "AI hospital inventory",
    ],
    roadmap: ["Procurement workflows", "Audit trails"],
  },

  // ── Category C — AI Infrastructure ────────────────────────────────────
  {
    slug: "zen-rag",
    name: "ZEN_RAG / Git_RAG_Zena",
    short: "ZEN_RAG",
    category: "ai-infrastructure",
    status: "dev",
    version: "Beta",
    stage: "infrastructure",
    icon: Lock,
    accent: "violet",
    summary:
      "A 100% offline, local RAG for medical and legislative documents — no cloud, built on llama.cpp + FAISS. The backbone of every data-sovereignty conversation.",
    problem:
      "Clinical and legal data can't always leave the building. ZEN_RAG runs entirely on-premise, so sensitive documents stay sovereign while still being searchable by AI.",
    how: [
      "100% offline, local retrieval-augmented generation",
      "No cloud dependency — runs on-premise",
      "Built on llama.cpp + FAISS",
      "Tuned for medical & legislative corpora",
    ],
    roadmap: ["Broader model support", "Hardened on-prem deployment tooling"],
  },
  {
    slug: "llm-compare",
    name: "Zen_LLM_Compare",
    short: "LLM Compare",
    category: "ai-infrastructure",
    status: "dev",
    version: "v0.8",
    stage: "infrastructure",
    icon: GitCompareArrows,
    accent: "violet",
    summary:
      "A side-by-side comparator for 6+ local and cloud LLMs — same prompt, parallel responses and a latency benchmark.",
    problem:
      "Choosing the right model is an engineering decision, not a guess. LLM Compare runs one prompt across many models at once and measures the trade-offs.",
    how: [
      "Same prompt sent to 6+ models in parallel",
      "Side-by-side response comparison",
      "Latency benchmarking",
    ],
    roadmap: ["Quality scoring", "Cost-per-task estimates"],
  },
];

export const moduleCount = modules.length;

export function getModule(slug: string) {
  return modules.find((m) => m.slug === slug);
}

export function modulesByCategory(category: string) {
  return modules.filter((m) => m.category === category);
}

export function countByCategory(category: string) {
  return modulesByCategory(category).length;
}
