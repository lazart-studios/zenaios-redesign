import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DomainCard } from "@/components/cards/DomainCard";
import { ModuleCard } from "@/components/cards/ModuleCard";
import { CTASection } from "@/components/sections/CTASection";
import { buildCategories } from "@/lib/data/categories";
import { buildModulesByCategory, moduleCount } from "@/lib/data/modules";
import { metaFromCatalog } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaFromCatalog({ locale: locale as Locale, page: "platform", path: "/platform" });
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("platformPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const categories = buildCategories(await getTranslations("categories"));
  const tModules = await getTranslations("modules.items");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        crumbs={[{ label: common("home"), href: "/" }, { label: nav("platform") }]}
        title={
          <>
            {t("titleLead")}{" "}
            <span className="text-gradient">{t("titleAccent", { count: moduleCount })}</span>
          </>
        }
        description={t("description")}
      >
        <Stagger className="grid max-w-2xl grid-cols-3 gap-4">
          {[
            { v: moduleCount, l: t("statModules") },
            { v: 3, l: t("statDomains") },
            { v: 2, l: t("statDeployments") },
          ].map((s) => (
            <StaggerItem key={s.l} className="rounded-2xl border border-hairline bg-card/40 p-4">
              <p className="text-3xl font-bold text-gradient-blue">{s.v}</p>
              <p className="mt-1 text-xs text-faint">{s.l}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </PageHeader>

      {/* Three domains */}
      <Section id="domains">
        <Reveal>
          <SectionHeading
            eyebrow={t("domainsEyebrow")}
            title={t("domainsTitle")}
            description={t("domainsDescription")}
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

      {/* Every module, grouped */}
      <Section id="all-modules" className="bg-white/[0.012]">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={t("catalogueEyebrow")}
            title={t("catalogueTitle")}
            description={t("catalogueDescription")}
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 space-y-16">
          {categories.map((cat) => {
            const mods = buildModulesByCategory(tModules, cat.slug);
            return (
              <div key={cat.slug}>
                <Reveal>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline pb-4">
                    <h3 className="text-xl font-bold text-ink">
                      {cat.name}
                      <span className="ml-2 text-sm font-normal text-faint">
                        {cat.tagline}
                      </span>
                    </h3>
                    <span className="text-sm text-faint">
                      {t("modulesLabel", { count: mods.length })}
                    </span>
                  </div>
                </Reveal>
                <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {mods.map((m) => (
                    <StaggerItem key={m.slug}>
                      <ModuleCard module={m} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            );
          })}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
