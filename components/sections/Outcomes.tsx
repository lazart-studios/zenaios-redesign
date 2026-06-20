import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { buildPlatformFacts } from "@/lib/data/outcomes";

export function Outcomes() {
  const t = useTranslations("outcomes");
  const facts = buildPlatformFacts(useTranslations("outcomesData"));

  return (
    <Section id="outcomes" className="!pt-0">
      <div className="overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-white md:px-12 md:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-sky">{t("eyebrow")}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-white/70 md:text-lg">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {facts.map((fact) => (
            <StaggerItem key={fact.label} className="text-center">
              <p className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                <Counter
                  value={fact.value}
                  prefix={fact.prefix}
                  suffix={fact.suffix}
                  decimals={fact.decimals}
                />
              </p>
              <p className="mt-2 text-sm font-medium text-white">{fact.label}</p>
              {fact.sub && <p className="mt-1 text-xs text-white/55">{fact.sub}</p>}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
