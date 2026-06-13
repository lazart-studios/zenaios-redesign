import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { EpicrisisDoc } from "@/components/visuals/EpicrisisDoc";
import { ZenAChat } from "@/components/visuals/ZenAChat";
import { deployments } from "@/lib/data/deployments";
import { modules } from "@/lib/data/modules";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Deployments",
  description:
    "ZenAiOS is live in the field — a county emergency hospital (SJUO Oradea) and a city hall (Primăria Oradea). Real institutions, real workflows.",
  path: "/deployments",
});

const visuals: Record<string, React.ReactNode> = {
  "sjuo-oradea": <EpicrisisDoc />,
  "oradea-city-hall": <ZenAChat />,
};

export default function DeploymentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="In the field"
        crumbs={[{ label: "Home", href: "/" }, { label: "Deployments" }]}
        title={
          <>
            Live, not <span className="text-gradient">in a slide deck.</span>
          </>
        }
        description="The strongest thing we can show isn't a number — it's software running in real institutions, used by real staff, every day."
      />

      <Section>
        <div className="space-y-24 md:space-y-32">
          {deployments.map((d, i) => {
            const Icon = d.icon;
            const reversed = i % 2 === 1;
            const relatedModule = modules.find((m) => m.deployment === d.slug);
            return (
              <div
                key={d.slug}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Copy */}
                <Reveal
                  direction={reversed ? "left" : "right"}
                  className={reversed ? "lg:order-2" : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-sky ring-1 ring-zen/25">
                      <Icon className="size-5" />
                    </span>
                    <StatusBadge status={d.status} />
                  </div>
                  <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                    {d.kind}
                  </p>
                  <h2 className="mt-1 text-balance text-2xl font-bold sm:text-3xl">
                    {d.name}
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="size-3.5" /> {d.institution} · {d.location}
                  </p>
                  <p className="mt-4 max-w-md text-muted">{d.summary}</p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {d.live.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-ink/90"
                      >
                        <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-success/15">
                          <Check className="size-3 text-success" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {relatedModule && (
                    <Link
                      href={`/modules/${relatedModule.slug}`}
                      className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-sky"
                    >
                      Explore the {relatedModule.short} module
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </Reveal>

                {/* Visual */}
                <Reveal
                  direction={reversed ? "right" : "left"}
                  delay={0.1}
                  className={reversed ? "lg:order-1" : undefined}
                >
                  {visuals[d.slug]}
                </Reveal>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Honesty note */}
      <Section className="!pt-0">
        <Reveal>
          <div className="rounded-3xl border border-hairline bg-card/40 p-6 md:p-10">
            <Eyebrow>A note on proof</Eyebrow>
            <p className="mt-4 max-w-3xl text-balance text-lg leading-relaxed text-ink/90">
              We lead with deployments rather than headline statistics. Efficiency
              figures elsewhere on this site are clearly labelled as projections —
              what you see here is simply what&apos;s running today.
            </p>
          </div>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Your institution next?"
        title="Let's talk about your deployment"
        description="Tell us about your hospital or institution and we'll map ZenAiOS to your workflows."
      />
    </>
  );
}
