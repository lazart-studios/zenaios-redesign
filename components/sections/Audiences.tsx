import Link from "next/link";
import { Building2, Stethoscope, TrendingUp, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const audiences = [
  {
    icon: Building2,
    role: "Hospital leadership",
    tag: "CMO · CIO · economic buyer",
    needs: "ROI, interoperability (CNAS/DSP), data sovereignty, a real track record.",
    show: ["Hospital Manager", "SJUO deployment", "Sovereign RAG"],
    links: [
      { label: "Hospital Manager", href: "/modules/hospital-manager" },
      { label: "Deployments", href: "/deployments" },
    ],
  },
  {
    icon: Stethoscope,
    role: "Clinicians",
    tag: "Doctors · nurses · residents",
    needs: "Less admin, accurate AI epicrisis, decision support that adds no friction, CME.",
    show: ["Doctor & Nursing", "Triage & Lab", "Accredited CME"],
    links: [
      { label: "Doctor module", href: "/modules/doctor" },
      { label: "CME / QUIZ", href: "/modules/quiz" },
    ],
  },
  {
    icon: TrendingUp,
    role: "Investors",
    tag: "& EU-funding evaluators",
    needs: "Traction, a credible team, breadth, technical moat and a clear vision.",
    show: ["2 live deployments", "17 modules", "In-house AI infra"],
    links: [
      { label: "The platform", href: "/platform" },
      { label: "Team & vision", href: "/about" },
    ],
  },
];

export function Audiences() {
  return (
    <Section id="audiences">
      <Reveal>
        <SectionHeading
          eyebrow="One site, three buyers"
          title={
            <>
              Find your <span className="text-gradient">“for me”</span> path
            </>
          }
          description="The same platform, framed for the person reading. Management, clinicians and investors each get a direct route to what matters to them."
        />
      </Reveal>

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {audiences.map((a) => {
          const Icon = a.icon;
          return (
            <StaggerItem key={a.role}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-hairline bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:bg-card/70">
                <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-sky ring-1 ring-zen/25 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{a.role}</h3>
                <p className="text-[11px] uppercase tracking-wider text-faint">
                  {a.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a.needs}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.show.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-muted ring-1 ring-hairline"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-6">
                  {a.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="group/link inline-flex items-center gap-1 text-sm font-medium text-sky"
                    >
                      {l.label}
                      <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
