import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { buildIndustries } from "@/lib/data/industries";

/** Home teaser: healthcare-led, with the wider industry lineup as flat cards. */
export function Industries() {
  const t = useTranslations("industries");
  const industries = buildIndustries(useTranslations("industries.items"));
  return (
    <Section id="industries">
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("titleLead")}{" "}
              <span className="text-gradient">{t("titleAccent")}</span>
            </>
          }
          description={t("description")}
        />
      </Reveal>

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <StaggerItem key={industry.slug}>
            <IndustryCard industry={industry} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.05}>
        <Link
          href="/industries"
          className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-zen"
        >
          {t("seeAll")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </Section>
  );
}
