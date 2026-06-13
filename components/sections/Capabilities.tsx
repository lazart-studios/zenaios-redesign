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
  return (
    <Section id="capabilities" className="bg-white/[0.012]">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="What it actually does"
          title={
            <>
              Capabilities that earn{" "}
              <span className="text-gradient">clinical trust</span>
            </>
          }
          description="Four of the things ZenAiOS does every day — decision support, triage, prediction and sovereign AI."
          className="mx-auto"
        />
      </Reveal>

      <div className="mt-16 space-y-24 md:space-y-32">
        <FeatureRow
          eyebrow="Doctor module"
          title="Decision support that stays in the flow"
          description="Context-aware differential and treatment suggestions surface where the work happens — and auto-generate the epicrisis and documents, so doctors finish faster and get home on time."
          bullets={[
            "Differential & treatment suggestions",
            "Automatic epicrisis & clinical notes",
            "Evidence-aware, linked to guidelines",
          ]}
          visual={<DecisionSupport />}
          link={{ href: "/modules/doctor", label: "Explore the Doctor module" }}
        />

        <FeatureRow
          eyebrow="Emergency triage"
          title="Prioritised by real severity, not arrival order"
          description="The Manchester protocol paired with AI classifies every patient into five levels, keeps the queue ordered by acuity, and alerts the attending physician the moment a level-1 case arrives."
          bullets={[
            "Manchester + AI, 5 severity levels",
            "Automatic queue prioritisation",
            "Instant doctor alerts for high acuity",
          ]}
          visual={<TriageBoard />}
          reversed
          link={{ href: "/modules/emergency-triage", label: "Explore triage" }}
        />

        <FeatureRow
          eyebrow="Management"
          title="Dashboards that predict, not just report"
          description="Executive dashboards turn live operational data into forecasts — surges, staffing gaps, bottlenecks — with CNAS/DSP interoperability and an AI avatar for real-time decisions, on desktop and mobile."
          bullets={[
            "AI predictive analytics",
            "CNAS / DSP interoperability",
            "Desktop + Manager Mobile dashboard",
          ]}
          visual={
            <BrowserFrame url="platform.zenaios.com/manager" className="glow-zen">
              <DashboardMock />
            </BrowserFrame>
          }
          link={{ href: "/modules/hospital-manager", label: "Explore Hospital Manager" }}
        />

        <FeatureRow
          eyebrow="AI infrastructure"
          title="Sovereign AI — your data never leaves the building"
          description="ZEN_RAG runs a 100% offline, local retrieval-augmented system on llama.cpp + FAISS. No cloud, no data egress — the foundation of every data-sovereignty and GDPR conversation."
          bullets={[
            "100% offline, on-premise RAG",
            "llama.cpp + FAISS, 6+ models",
            "Tuned for medical & legislative corpora",
          ]}
          visual={<RagSovereign />}
          reversed
          link={{
            href: "/platform/ai-infrastructure",
            label: "See the AI infrastructure",
          }}
        />
      </div>
    </Section>
  );
}
