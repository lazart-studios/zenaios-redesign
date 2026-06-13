import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Check, MapPin, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ModuleCard } from "@/components/cards/ModuleCard";
import { CTASection } from "@/components/sections/CTASection";
import { BrowserFrame } from "@/components/visuals/BrowserFrame";
import { DashboardMock } from "@/components/visuals/DashboardMock";
import { EpicrisisDoc } from "@/components/visuals/EpicrisisDoc";
import { RagSovereign } from "@/components/visuals/RagSovereign";
import { DecisionSupport } from "@/components/visuals/DecisionSupport";
import { TriageBoard } from "@/components/visuals/TriageBoard";
import { ZenAChat } from "@/components/visuals/ZenAChat";
import { moduleSkeletons, buildModule, buildModulesByCategory } from "@/lib/data/modules";
import { buildCategory } from "@/lib/data/categories";
import { buildDeployment } from "@/lib/data/deployments";
import { buildMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return moduleSkeletons.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const m = buildModule(await getTranslations({ locale, namespace: "modules.items" }), slug);
  if (!m) return {};
  return buildMeta({
    locale: locale as Locale,
    title: m.name,
    description: m.summary,
    path: `/modules/${m.slug}`,
  });
}

function ModuleVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "zenaios-hospital":
      return <EpicrisisDoc />;
    case "doctor":
    case "risk-assessment":
      return <DecisionSupport />;
    case "emergency-triage":
      return <TriageBoard />;
    case "hospital-manager":
    case "manager-mobile":
    case "analytics":
    case "data-collection":
      return (
        <BrowserFrame url="platform.zenaios.com" className="glow-zen">
          <DashboardMock />
        </BrowserFrame>
      );
    case "zen-rag":
    case "administrative-module":
    case "llm-compare":
      return <RagSovereign />;
    case "citizen":
    case "patient":
    case "labiq":
      return <ZenAChat />;
    default:
      return null;
  }
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const tModules = await getTranslations("modules.items");
  const m = buildModule(tModules, slug);
  if (!m) notFound();

  const t = await getTranslations("modulePage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const cat = buildCategory(await getTranslations("categories"), m.category);
  const deployment = m.deployment
    ? buildDeployment(await getTranslations("deploymentsData"), m.deployment)
    : undefined;
  const related = buildModulesByCategory(tModules, m.category)
    .filter((x) => x.slug !== m.slug)
    .slice(0, 3);
  const Icon = m.icon;
  const visual = <ModuleVisual slug={m.slug} />;

  return (
    <>
      <PageHeader
        eyebrow={cat?.label}
        crumbs={[
          { label: common("home"), href: "/" },
          { label: nav("platform"), href: "/platform" },
          { label: cat?.name ?? "", href: `/platform/${m.category}` },
          { label: m.short },
        ]}
        title={m.name}
        description={m.summary}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-sky ring-1 ring-zen/25">
            <Icon className="size-5" />
          </span>
          <StatusBadge status={m.status} />
          <span className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-muted">
            {m.version}
          </span>
        </div>
      </PageHeader>

      {/* Problem */}
      <Section className="!pb-0">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>{t("problemEyebrow")}</Eyebrow>
            <p className="mt-5 text-balance text-xl leading-relaxed text-ink/90 md:text-2xl">
              {m.problem}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* How it works (+ visual when available) */}
      <Section>
        <div
          className={
            visual
              ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              : "max-w-2xl"
          }
        >
          <Reveal direction={visual ? "right" : "up"}>
            <Eyebrow>{t("howEyebrow")}</Eyebrow>
            <ul className="mt-6 space-y-4">
              {m.how.map((h) => (
                <li key={h} className="flex items-start gap-3 text-ink/90">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky/15">
                    <Check className="size-3 text-sky" />
                  </span>
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {visual && (
            <Reveal direction="left" delay={0.1} className="relative">
              {visual}
            </Reveal>
          )}
        </div>
      </Section>

      {/* Roadmap */}
      <Section className="bg-white/[0.012]">
        <Reveal>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-violet" />
            <Eyebrow>{t("roadmapEyebrow")}</Eyebrow>
          </div>
          <p className="mt-4 max-w-xl text-muted">{t("roadmapIntro")}</p>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {m.roadmap.map((r, i) => (
            <StaggerItem key={r}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-dashed border-hairline-strong bg-card/30 p-5">
                <span className="font-mono text-sm text-violet">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-ink/90">{r}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Live deployment cross-link */}
      {deployment && (
        <Section className="!pt-0">
          <Reveal>
            <Link
              href="/deployments"
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-success/25 bg-success/[0.04] p-6 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-success/10 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-success">
                  <span className="size-1.5 rounded-full bg-success" />
                  {t("liveDeployment")}
                </span>
                <h3 className="mt-2 text-xl font-bold text-ink">{deployment.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="size-3.5" /> {deployment.location}
                </p>
              </div>
              <span className="relative inline-flex items-center gap-1.5 text-sm font-medium text-sky">
                {t("seeDeployment")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </Section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <Section className="!pt-0">
          <Reveal>
            <div className="flex items-baseline justify-between border-b border-hairline pb-4">
              <h2 className="text-xl font-bold text-ink">
                {t("moreIn", { category: cat?.name ?? "" })}
              </h2>
              <Link
                href={`/platform/${m.category}`}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-sky"
              >
                {t("viewAll")}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug}>
                <ModuleCard module={r} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <CTASection />
    </>
  );
}
