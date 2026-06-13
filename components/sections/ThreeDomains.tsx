import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DomainCard } from "@/components/cards/DomainCard";
import { categories } from "@/lib/data/categories";

export function ThreeDomains() {
  return (
    <Section id="domains">
      <Reveal>
        <SectionHeading
          eyebrow="One platform, three domains"
          title={
            <>
              Not three modules. <span className="text-gradient">Seventeen.</span>
            </>
          }
          description="ZenAiOS is an operating system, not a chatbot — organised into three domains that interoperate, share one assistant, and speak six languages."
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
