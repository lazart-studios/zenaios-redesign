import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DomainCard } from "@/components/cards/DomainCard";
import { ModuleCard } from "@/components/cards/ModuleCard";
import { CTASection } from "@/components/sections/CTASection";
import { categories } from "@/lib/data/categories";
import { modulesByCategory, moduleCount } from "@/lib/data/modules";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "The Platform",
  description:
    "17 AI modules across three interoperating domains — medical, administrative and AI infrastructure. One assistant, five languages, live in real institutions.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="The platform"
        crumbs={[{ label: "Home", href: "/" }, { label: "Platform" }]}
        title={
          <>
            One operating system.{" "}
            <span className="text-gradient">{moduleCount} AI modules.</span>
          </>
        }
        description="ZenAiOS isn't a single tool bolted onto a hospital — it's a layered operating system. Three domains, one shared assistant, all speaking the same data."
      >
        <Stagger className="grid max-w-2xl grid-cols-3 gap-4">
          {[
            { v: moduleCount, l: "AI modules" },
            { v: 3, l: "Domains" },
            { v: 2, l: "Live deployments" },
          ].map((s) => (
            <StaggerItem key={s.l} className="rounded-2xl border border-hairline bg-card/40 p-4">
              <p className="text-3xl font-bold text-gradient-blue">{s.v}</p>
              <p className="mt-1 text-xs text-faint">{s.l}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </PageHeader>

      {/* Three domains */}
      <Section id="domains">
        <Reveal>
          <SectionHeading
            eyebrow="Three domains"
            title="Pick the layer you live in"
            description="Each domain is a coherent product in its own right — and they share one data model, one assistant and one design language."
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <DomainCard category={cat} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Every module, grouped */}
      <Section id="all-modules" className="bg-white/[0.012]">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Every module"
            title="The full catalogue"
            description="From the front desk to the boardroom — explore each module in detail."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 space-y-16">
          {categories.map((cat) => {
            const mods = modulesByCategory(cat.slug);
            return (
              <div key={cat.slug}>
                <Reveal>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline pb-4">
                    <h3 className="text-xl font-bold text-ink">
                      {cat.name}
                      <span className="ml-2 text-sm font-normal text-faint">
                        {cat.tagline}
                      </span>
                    </h3>
                    <span className="text-sm text-faint">{mods.length} modules</span>
                  </div>
                </Reveal>
                <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {mods.map((m) => (
                    <StaggerItem key={m.slug}>
                      <ModuleCard module={m} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            );
          })}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
