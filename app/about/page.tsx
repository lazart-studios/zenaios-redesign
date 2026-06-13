import { ShieldCheck, Stethoscope, Languages, Building2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Team } from "@/components/sections/Team";
import { CTASection } from "@/components/sections/CTASection";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "ZenAiOS is built by a clinical, technical and commercial team in Oradea, România — an AI operating system grounded in real hospital practice and data sovereignty.",
  path: "/about",
});

const principles = [
  {
    icon: Stethoscope,
    title: "Clinically grounded",
    body: "Every module is shaped with a Chief Medical Officer and tested against real clinical workflows — not built in a vacuum.",
  },
  {
    icon: ShieldCheck,
    title: "Sovereign by design",
    body: "Sensitive data can stay on-premise. Our offline RAG means hospitals keep control of their own information.",
  },
  {
    icon: Languages,
    title: "Multilingual & accessible",
    body: "Six languages and an assistant that meets patients and staff where they are — care shouldn't depend on jargon.",
  },
  {
    icon: Building2,
    title: "Proven in the field",
    body: "Live in a county emergency hospital and a city hall. We'd rather show real deployments than promise big numbers.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About ZenAiOS"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            Making healthcare <span className="text-gradient">run.</span>
          </>
        }
        description="Hospitals are some of the most complex organisations on earth. We're building the AI operating system that ties their fragmented systems into one — from the front desk to the boardroom."
      />

      {/* Mission */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why we exist"
              title="One platform instead of twenty disconnected tools"
            />
          </Reveal>
          <Reveal direction="left" delay={0.1} className="space-y-4 text-muted">
            <p>
              Clinicians lose hours every day to documentation and to systems that
              don&apos;t talk to each other. Management can&apos;t see what&apos;s
              happening in real time. Patients struggle to find the right service.
            </p>
            <p>
              ZenAiOS replaces that fragmentation with a single, AI-native operating
              system: 17 modules across clinical care, hospital management and public
              administration, sharing one data model and one assistant.
            </p>
            <p className="text-ink/90">
              It&apos;s already live — in a county emergency hospital and at a city
              hall — and built by people who deploy it themselves.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Principles */}
      <Section className="bg-white/[0.012]">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="What we believe"
            title="Four principles we don't compromise on"
            className="mx-auto"
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title}>
                <div className="group flex h-full flex-col rounded-2xl border border-hairline bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:bg-card/70">
                  <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-sky ring-1 ring-zen/25 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Team + vision */}
      <Team />

      <CTASection
        eyebrow="Work with us"
        title="Building the future of hospital AI"
        description="Whether you're an institution, a clinician or an investor — we'd love to show you what ZenAiOS can do."
      />
    </>
  );
}
