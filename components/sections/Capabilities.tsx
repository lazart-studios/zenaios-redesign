import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { BrowserFrame } from "@/components/visuals/BrowserFrame";
import { DecisionSupport } from "@/components/visuals/DecisionSupport";
import { TriageBoard } from "@/components/visuals/TriageBoard";
import { DashboardMock } from "@/components/visuals/DashboardMock";
import { RagSovereign } from "@/components/visuals/RagSovereign";

export function Capabilities() {
  const t = useTranslations("capabilities");
  const f = useTranslations("capabilities.features");
  return (
    <Section id="capabilities" className="bg-white/[0.012]">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("titleLead")}{" "}
              <span className="text-gradient">{t("titleAccent")}</span>
            </>
          }
          description={t("description")}
          className="mx-auto"
        />
      </Reveal>

      <div className="mt-16 space-y-24 md:space-y-32">
        <FeatureRow
          eyebrow={f("doctor.eyebrow")}
          title={f("doctor.title")}
          description={f("doctor.description")}
          bullets={f.raw("doctor.bullets") as string[]}
          visual={<DecisionSupport />}
          link={{ href: "/modules/doctor", label: f("doctor.link") }}
        />

        <FeatureRow
          eyebrow={f("triage.eyebrow")}
          title={f("triage.title")}
          description={f("triage.description")}
          bullets={f.raw("triage.bullets") as string[]}
          visual={<TriageBoard />}
          reversed
          link={{ href: "/modules/emergency-triage", label: f("triage.link") }}
        />

        <FeatureRow
          eyebrow={f("management.eyebrow")}
          title={f("management.title")}
          description={f("management.description")}
          bullets={f.raw("management.bullets") as string[]}
          visual={
            <BrowserFrame url="platform.zenaios.com/manager" className="glow-zen">
              <DashboardMock />
            </BrowserFrame>
          }
          link={{ href: "/modules/hospital-manager", label: f("management.link") }}
        />

        <FeatureRow
          eyebrow={f("infrastructure.eyebrow")}
          title={f("infrastructure.title")}
          description={f("infrastructure.description")}
          bullets={f.raw("infrastructure.bullets") as string[]}
          visual={<RagSovereign />}
          reversed
          link={{
            href: "/platform/ai-infrastructure",
            label: f("infrastructure.link"),
          }}
        />
      </div>
    </Section>
  );
}
