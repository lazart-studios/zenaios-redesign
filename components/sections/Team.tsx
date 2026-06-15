import Image from "next/image";
import { Linkedin, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { buildTeam, buildVision } from "@/lib/data/team";

export function Team() {
  const t = useTranslations("team");
  const data = useTranslations("teamData");
  const team = buildTeam(data);
  const visionQuote = buildVision(data);
  return (
    <Section id="team">
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("titleLead")}{" "}
              <span className="text-gradient">{t("titleAccent")}</span>
            </>
          }
        />
      </Reveal>

      {/* Team grid — full width, 3 wide on desktop with large portrait cards */}
      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <StaggerItem key={m.name}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:shadow-card-hover">
              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src={m.photo}
                  alt={`${m.name} — ${m.role}`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                {/* Bottom fade so the name plate reads cleanly */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-card/95 via-card/30 to-transparent"
                  aria-hidden
                />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-ink">{m.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-zen">
                  {m.role}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {m.bio}
                </p>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-faint transition-colors hover:text-zen"
                >
                  <Linkedin className="size-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Vision quote — full-width banner below the team */}
      <Reveal delay={0.05}>
        <figure className="relative mt-8 overflow-hidden rounded-3xl border border-hairline bg-surface p-8 md:p-12">
          <Quote
            className="size-10 text-zen/40"
            aria-hidden
            fill="currentColor"
          />
          <blockquote className="mt-5 max-w-4xl text-balance text-xl font-medium leading-relaxed text-ink md:text-2xl">
            {visionQuote.text}
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="h-px w-8 bg-hairline-strong" />
            <span>
              <span className="block text-sm font-semibold text-ink">
                {visionQuote.attribution}
              </span>
              <span className="block text-xs text-faint">{visionQuote.role}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
