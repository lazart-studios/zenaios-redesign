import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Check, Clock, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/lib/data/site";
import { metaFromCatalog } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaFromCatalog({ locale: locale as Locale, page: "demo", path: "/demo" });
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("demoPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const expect = t.raw("expect") as string[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        crumbs={[{ label: common("home"), href: "/" }, { label: nav("requestDemo") }]}
        title={
          <>
            {t("titleLead")} <span className="text-gradient">{t("titleAccent")}</span>
          </>
        }
        description={t("description")}
      />

      <Section className="!pt-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Left — what to expect */}
          <div className="space-y-8">
            <Reveal>
              <h2 className="text-lg font-bold text-ink">{t("expectTitle")}</h2>
              <ul className="mt-5 space-y-3.5">
                {expect.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-sm text-ink/90">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-zen/10">
                      <Check className="size-3 text-zen" />
                    </span>
                    <span className="leading-relaxed">{e}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-hairline bg-card p-4">
                <Clock className="size-5 shrink-0 text-zen" />
                <p className="text-sm text-muted">
                  {t.rich("replyNote", {
                    b: (chunks) => <span className="text-ink">{chunks}</span>,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-hairline bg-card p-4">
                <ShieldCheck className="size-5 shrink-0 text-success" />
                <p className="text-sm text-muted">{t("sovereignNote")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-hairline bg-surface p-5">
                <p className="text-sm font-medium text-ink">{t("lookAroundTitle")}</p>
                <p className="mt-1 text-sm text-muted">{t("lookAroundBody")}</p>
                <a
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-zen"
                >
                  {t("open", { url: siteConfig.demoUrl.replace("https://", "") })}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal direction="left" delay={0.1}>
            <LeadForm kind="demo" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
