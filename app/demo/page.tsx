import { ArrowUpRight, Check, Clock, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/lib/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Request a demo",
  description:
    "Book a guided walkthrough of ZenAiOS — the AI epicrisis, triage, executive dashboards and sovereign RAG — mapped to your institution.",
  path: "/demo",
});

const expect = [
  "A 30-minute guided walkthrough, tailored to your role",
  "The AI epicrisis, triage and executive dashboards, live",
  "How sovereign offline RAG keeps your data on-premise",
  "A straight answer on what fits your institution — and what doesn't yet",
];

export default function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a demo"
        crumbs={[{ label: "Home", href: "/" }, { label: "Request a demo" }]}
        title={
          <>
            See it running in a <span className="text-gradient">real hospital</span>
          </>
        }
        description="Tell us a little about your institution and we'll set up a walkthrough focused on what matters to you."
      />

      <Section className="!pt-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Left — what to expect */}
          <div className="space-y-8">
            <Reveal>
              <h2 className="text-lg font-bold text-ink">What to expect</h2>
              <ul className="mt-5 space-y-3.5">
                {expect.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-sm text-ink/90">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky/15">
                      <Check className="size-3 text-sky" />
                    </span>
                    <span className="leading-relaxed">{e}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-hairline bg-card/40 p-4">
                <Clock className="size-5 shrink-0 text-sky" />
                <p className="text-sm text-muted">
                  We typically reply within{" "}
                  <span className="text-ink">one business day</span>.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-hairline bg-card/40 p-4">
                <ShieldCheck className="size-5 shrink-0 text-success" />
                <p className="text-sm text-muted">
                  No data leaves the building in a self-hosted deployment.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-hairline bg-gradient-to-br from-card/70 to-card/20 p-5">
                <p className="text-sm font-medium text-ink">
                  Prefer to look around first?
                </p>
                <p className="mt-1 text-sm text-muted">
                  The live platform is open to explore.
                </p>
                <a
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sky"
                >
                  Open {siteConfig.demoUrl.replace("https://", "")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal direction="left" delay={0.1}>
            <LeadForm kind="demo" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
