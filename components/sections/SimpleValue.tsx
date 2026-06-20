import { FileCheck2, Lightbulb, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const icons = [FileCheck2, Lightbulb, ShieldCheck];

type ValueItem = {
  title: string;
  description: string;
};

export function SimpleValue() {
  const t = useTranslations("simpleValue");
  const items = t.raw("items") as ValueItem[];

  return (
    <Section id="why" className="!py-24 md:!py-36">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="mx-auto"
        />
      </Reveal>

      <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index];
          return (
            <StaggerItem key={item.title}>
              <article className="h-full rounded-[1.75rem] bg-[#f5f5f7] p-7 md:p-9">
                <span className="grid size-11 place-items-center rounded-full bg-white text-zen shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
