import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { CTASection } from "@/components/sections/CTASection";
import { buildIndustries } from "@/lib/data/industries";
import { metaFromCatalog } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaFromCatalog({
    locale: locale as Locale,
    page: "industries",
    path: "/industries",
  });
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("industries");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const industries = buildIndustries(await getTranslations("industries.items"));

  const [lead, ...rest] = industries;
  const LeadIcon = lead.icon;

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        crumbs={[{ label: common("home"), href: "/" }, { label: nav("industries") }]}
        title={
          <>
            {t("titleLead")} <span className="text-gradient">{t("titleAccent")}</span>
          </>
        }
        description={t("description")}
      />

      <Section className="!pt-0">
        {/* Lead pillar — healthcare, the proven deployment */}
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[1.75rem] border border-hairline bg-card p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex items-start gap-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-zen/12 text-zen ring-1 ring-zen/25">
                <LeadIcon className="size-7" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h2 className="text-2xl font-bold text-ink">{lead.name}</h2>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-success">
                    <span className="size-1.5 rounded-full bg-success" />
                    {t("status.live")}
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-muted">{lead.tagline}</p>
              </div>
            </div>
            <Link
              href="/platform"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-zen"
            >
              {t("explore")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* The wider lineup */}
        <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((industry) => (
            <StaggerItem key={industry.slug}>
              <IndustryCard industry={industry} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.05}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-faint">
            {t("note")}
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
