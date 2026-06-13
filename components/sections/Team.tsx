import { Linkedin, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { team, visionQuote } from "@/lib/data/team";

export function Team() {
  return (
    <Section id="team">
      <Reveal>
        <SectionHeading
          eyebrow="The people behind it"
          title={
            <>
              A real team, <span className="text-gradient">building in the open</span>
            </>
          }
          description="Clinical, technical and commercial leadership — the same founders who designed the platform are the ones deploying it."
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        {/* Team grid */}
        <Stagger className="grid gap-5 sm:grid-cols-3">
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <div className="group flex h-full flex-col rounded-2xl border border-hairline bg-card/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:bg-card/70">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-zen/25 to-sky/10 text-lg font-bold text-sky ring-1 ring-zen/30 transition-transform duration-300 group-hover:scale-105">
                  {m.initials}
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{m.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-sky">
                  {m.role}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {m.bio}
                </p>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-faint transition-colors hover:text-sky"
                >
                  <Linkedin className="size-3.5" />
                  LinkedIn
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Vision quote */}
        <Reveal direction="left" delay={0.1}>
          <figure className="relative rounded-3xl border border-hairline bg-gradient-to-br from-card/70 to-card/20 p-7 md:p-9">
            <Quote
              className="size-9 text-zen/40"
              aria-hidden
              fill="currentColor"
            />
            <blockquote className="mt-4 text-balance text-lg font-medium leading-relaxed text-ink md:text-xl">
              {visionQuote.text}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-sky to-transparent" />
              <span>
                <span className="block text-sm font-semibold text-ink">
                  {visionQuote.attribution}
                </span>
                <span className="block text-xs text-faint">{visionQuote.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
