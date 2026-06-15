import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { EpicrisisDoc } from "@/components/visuals/EpicrisisDoc";
import { ZenAChat } from "@/components/visuals/ZenAChat";
import { buildDeployments } from "@/lib/data/deployments";
import { moduleSkeletons, buildModule } from "@/lib/data/modules";
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
    page: "deployments",
    path: "/deployments",
  });
}

const visuals: Record<string, React.ReactNode> = {
  "sjuo-oradea": <EpicrisisDoc />,
  "oradea-city-hall": <ZenAChat />,
};

export default async function DeploymentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("deploymentsPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const deployments = buildDeployments(await getTranslations("deploymentsData"));
  const tModules = await getTranslations("modules.items");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        crumbs={[{ label: common("home"), href: "/" }, { label: nav("deployments") }]}
        title={
          <>
            {t("titleLead")} <span className="text-gradient">{t("titleAccent")}</span>
          </>
        }
        description={t("description")}
      />

      <Section>
        <div className="space-y-24 md:space-y-32">
          {deployments.map((d, i) => {
            const Icon = d.icon;
            const reversed = i % 2 === 1;
            const relatedSkeleton = moduleSkeletons.find(
              (m) => m.deployment === d.slug,
            );
            const relatedModule = relatedSkeleton
              ? buildModule(tModules, relatedSkeleton.slug)
              : undefined;
            return (
              <div
                key={d.slug}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Copy */}
                <Reveal
                  direction={reversed ? "left" : "right"}
                  className={reversed ? "lg:order-2" : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-zen ring-1 ring-zen/25">
                      <Icon className="size-5" />
                    </span>
                    <StatusBadge status={d.status} />
                  </div>
                  <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                    {d.kind}
                  </p>
                  <h2 className="mt-1 text-balance text-2xl font-bold sm:text-3xl">
                    {d.name}
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="size-3.5" /> {d.institution} · {d.location}
                  </p>
                  <p className="mt-4 max-w-md text-muted">{d.summary}</p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {d.live.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-ink/90"
                      >
                        <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-success/15">
                          <Check className="size-3 text-success" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {relatedModule && (
                    <Link
                      href={`/modules/${relatedModule.slug}`}
                      className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-zen"
                    >
                      {t("exploreModule", { module: relatedModule.short })}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </Reveal>

                {/* Visual */}
                <Reveal
                  direction={reversed ? "right" : "left"}
                  delay={0.1}
                  className={reversed ? "lg:order-1" : undefined}
                >
                  {visuals[d.slug]}
                </Reveal>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Honesty note */}
      <Section className="!pt-0">
        <Reveal>
          <div className="rounded-3xl border border-hairline bg-card p-6 shadow-card md:p-10">
            <Eyebrow>{t("noteEyebrow")}</Eyebrow>
            <p className="mt-4 max-w-3xl text-balance text-lg leading-relaxed text-ink/90">
              {t("noteBody")}
            </p>
          </div>
        </Reveal>
      </Section>

      <CTASection variant="deployments" />
    </>
  );
}
