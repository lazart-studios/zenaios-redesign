import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck, Stethoscope, Languages, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Team } from "@/components/sections/Team";
import { CTASection } from "@/components/sections/CTASection";
import { metaFromCatalog } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaFromCatalog({ locale: locale as Locale, page: "about", path: "/about" });
}

/** Icons stay in code; the four principle titles + bodies come from the catalog. */
const principleIcons: LucideIcon[] = [Stethoscope, ShieldCheck, Languages, Building2];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("aboutPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const principles = t.raw("principles") as { title: string; body: string }[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        crumbs={[{ label: common("home"), href: "/" }, { label: nav("about") }]}
        title={
          <>
            {t("titleLead")} <span className="text-gradient">{t("titleAccent")}</span>
          </>
        }
        description={t("description")}
      />

      {/* Mission */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow={t("missionEyebrow")} title={t("missionTitle")} />
          </Reveal>
          <Reveal direction="left" delay={0.1} className="space-y-4 text-muted">
            <p>{t("missionP1")}</p>
            <p>{t("missionP2")}</p>
            <p className="text-ink/90">{t("missionP3")}</p>
          </Reveal>
        </div>
      </Section>

      {/* Principles */}
      <Section className="bg-surface">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={t("principlesEyebrow")}
            title={t("principlesTitle")}
            className="mx-auto"
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => {
            const Icon = principleIcons[i] ?? Stethoscope;
            return (
              <StaggerItem key={p.title}>
                <div className="group flex h-full flex-col rounded-2xl border border-hairline bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:bg-card/70">
                  <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-zen ring-1 ring-zen/25 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Team + vision */}
      <Team />

      <CTASection variant="about" />
    </>
  );
}
