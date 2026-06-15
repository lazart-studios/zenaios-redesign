import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileText, Newspaper, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { metaFromCatalog } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metaFromCatalog({ locale: locale as Locale, page: "resources", path: "/resources" });
}

/** Icons + the one live cross-link stay in code; titles/bodies come from the catalog. */
const resourceMeta: { icon: LucideIcon; href?: string }[] = [
  { icon: FileText },
  { icon: BookOpen },
  { icon: GraduationCap, href: "/modules/quiz" },
  { icon: Newspaper },
];

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("resourcesPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        crumbs={[{ label: common("home"), href: "/" }, { label: nav("resources") }]}
        title={
          <>
            {t("titleLead")} <span className="text-gradient">{t("titleAccent")}</span>
          </>
        }
        description={t("description")}
      />

      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {items.map((r, i) => {
            const meta = resourceMeta[i] ?? { icon: FileText };
            const Icon = meta.icon;
            const isLink = Boolean(meta.href);
            const inner = (
              <div className="group flex h-full flex-col rounded-2xl border border-hairline bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:bg-card/70">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-zen ring-1 ring-zen/25 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={
                      isLink
                        ? "rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-success ring-1 ring-success/25"
                        : "rounded-full bg-card-2 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-faint ring-1 ring-hairline"
                    }
                  >
                    {isLink ? t("statusLive") : t("statusInPrep")}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.body}</p>
                {isLink && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zen">
                    {t("openModule")}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </div>
            );
            return (
              <StaggerItem key={r.title}>
                {isLink ? <Link href={meta.href!}>{inner}</Link> : inner}
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal>
          <p className="mt-10 text-center text-sm text-faint">
            {t("lookingFor")}{" "}
            <Link href="/contact" className="font-medium text-zen hover:underline">
              {t("getInTouch")}
            </Link>{" "}
            {t("pointYou")}
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
