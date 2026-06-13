import Link from "next/link";
import { FileText, Newspaper, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Resources",
  description:
    "Case studies, documentation, clinical CME and press about ZenAiOS — the AI operating system for modern hospitals.",
  path: "/resources",
});

const resources = [
  {
    icon: FileText,
    title: "Case studies",
    body: "Deep dives into the SJUO Oradea and city-hall deployments — what was rolled out, and what changed.",
    status: "In preparation",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    body: "Technical and clinical documentation for the platform, modules and the sovereign RAG stack.",
    status: "In preparation",
  },
  {
    icon: GraduationCap,
    title: "Clinical & CME",
    body: "Accredited continuing education and adaptive clinical cases via the QUIZ module.",
    status: "Live module",
    href: "/modules/quiz",
  },
  {
    icon: Newspaper,
    title: "Press & updates",
    body: "Announcements, milestones and coverage as ZenAiOS expands to new institutions.",
    status: "In preparation",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
        title={
          <>
            Learn more, <span className="text-gradient">in depth.</span>
          </>
        }
        description="We're building out case studies, documentation and press. Here's what's coming — and what's already live today."
      />

      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {resources.map((r) => {
            const Icon = r.icon;
            const isLink = Boolean(r.href);
            const inner = (
              <div className="group flex h-full flex-col rounded-2xl border border-hairline bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:bg-card/70">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-sky ring-1 ring-zen/25 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={
                      isLink
                        ? "rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-success ring-1 ring-success/25"
                        : "rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-faint ring-1 ring-hairline"
                    }
                  >
                    {r.status}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {r.body}
                </p>
                {isLink && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sky">
                    Open module
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </div>
            );
            return (
              <StaggerItem key={r.title}>
                {isLink ? <Link href={r.href!}>{inner}</Link> : inner}
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal>
          <p className="mt-10 text-center text-sm text-faint">
            Looking for something specific?{" "}
            <Link href="/contact" className="font-medium text-sky hover:underline">
              Get in touch
            </Link>{" "}
            and we&apos;ll point you to it.
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
