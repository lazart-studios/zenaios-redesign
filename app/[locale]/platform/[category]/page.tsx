import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ModuleCard } from "@/components/cards/ModuleCard";
import { CTASection } from "@/components/sections/CTASection";
import { categorySlugs, buildCategory } from "@/lib/data/categories";
import { buildModulesByCategory } from "@/lib/data/modules";
import { buildMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = buildCategory(await getTranslations({ locale, namespace: "categories" }), category);
  if (!cat) return {};
  return buildMeta({
    locale: locale as Locale,
    title: cat.name,
    description: cat.description,
    path: `/platform/${cat.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale as Locale);

  const cat = buildCategory(await getTranslations("categories"), category);
  if (!cat) notFound();

  const t = await getTranslations("categoryPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const mods = buildModulesByCategory(await getTranslations("modules.items"), cat.slug);
  const live = mods.filter((m) => m.status === "active").length;
  const isViolet = cat.accent === "violet";
  const highlights = t.raw(`highlights.${cat.slug}`) as string[];

  return (
    <>
      <PageHeader
        eyebrow={cat.label}
        crumbs={[
          { label: common("home"), href: "/" },
          { label: nav("platform"), href: "/platform" },
          { label: cat.name },
        ]}
        title={
          <>
            {cat.name}.{" "}
            <span className={isViolet ? "text-violet" : "text-gradient"}>
              {cat.tagline}
            </span>
          </>
        }
        description={cat.description}
      >
        <ul className="grid max-w-2xl gap-2.5">
          {highlights?.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-ink/90">
              <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-sky/15">
                <Check className="size-3 text-sky" />
              </span>
              {h}
            </li>
          ))}
        </ul>
      </PageHeader>

      <Section>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline pb-4">
            <h2 className="text-xl font-bold text-ink">
              {t("moduleCountTitle", { count: mods.length })}
            </h2>
            {live > 0 && (
              <span className="inline-flex items-center gap-1.5 text-sm text-success">
                <span className="size-1.5 rounded-full bg-success" />
                {t("liveCount", { count: live })}
              </span>
            )}
          </div>
        </Reveal>

        <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mods.map((m) => (
            <StaggerItem key={m.slug}>
              <ModuleCard module={m} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <Link
            href="/platform"
            className="group mt-12 inline-flex items-center gap-2 text-sm font-medium text-sky"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            {t("allDomains")}
          </Link>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
