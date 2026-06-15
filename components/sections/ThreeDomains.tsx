import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DomainCard } from "@/components/cards/DomainCard";
import { buildCategories } from "@/lib/data/categories";

export function ThreeDomains() {
  const t = useTranslations("threeDomains");
  const categories = buildCategories(useTranslations("categories"));
  return (
    <Section id="domains">
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

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {categories.map((cat) => (
          <StaggerItem key={cat.slug}>
            <DomainCard category={cat} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
