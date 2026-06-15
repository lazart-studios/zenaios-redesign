import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { buildPlatformFacts, buildOutcomeProjections } from "@/lib/data/outcomes";

export function Outcomes() {
  const t = useTranslations("outcomes");
  const data = useTranslations("outcomesData");
  const platformFacts = buildPlatformFacts(data);
  const outcomeProjections = buildOutcomeProjections(data);
  return (
    <Section id="outcomes">
      <div className="rounded-3xl border border-hairline bg-card p-6 shadow-card md:p-12">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            className="mx-auto"
          />
        </Reveal>

        {/* Verifiable facts */}
        <Stagger className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {platformFacts.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p className="text-4xl font-bold text-gradient-blue md:text-5xl">
                <Counter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </p>
              <p className="mt-2 text-sm font-medium text-ink">{s.label}</p>
              {s.sub && <p className="text-xs text-faint">{s.sub}</p>}
            </StaggerItem>
          ))}
        </Stagger>

        <div className="my-10 h-px bg-hairline" />

        {/* Honest projections */}
        <Stagger className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {outcomeProjections.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p className="text-3xl font-bold text-ink md:text-4xl">
                <Counter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </p>
              <p className="mt-1.5 text-sm text-muted">{s.label}</p>
              <span className="mt-2 inline-block rounded-full bg-card-2 px-2 py-0.5 text-[10px] uppercase tracking-wider text-faint ring-1 ring-hairline">
                {s.sub}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-faint">
            <Info className="size-3.5" />
            {t("footnote")}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
