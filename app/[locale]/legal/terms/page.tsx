import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/data/site";
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
    page: "terms",
    path: "/legal/terms",
  });
}

// NOTE FOR CLIENT: template terms of use — review with legal counsel and confirm
// the controlling legal entity and governing-law jurisdiction before launch.
export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const legal = await getTranslations("legal");
  const t = await getTranslations("legal.terms");
  const common = await getTranslations("common");
  const domain = siteConfig.url.replace("https://", "");

  return (
    <>
      <PageHeader
        eyebrow={legal("eyebrow")}
        crumbs={[{ label: common("home"), href: "/" }, { label: t("title") }]}
        title={t("title")}
        description={legal("lastUpdated", { date: legal("lastUpdatedDate") })}
      />

      <Section>
        <Prose>
          <p>{t("intro", { name: siteConfig.name, domain })}</p>

          <h2>{t("h1")}</h2>
          <p>{t("p1", { name: siteConfig.name })}</p>

          <h2>{t("h2")}</h2>
          <p>
            {t.rich("p2", {
              contact: (chunks) => <Link href="/contact">{chunks}</Link>,
            })}
          </p>

          <h2>{t("h3")}</h2>
          <p>{t("p3")}</p>

          <h2>{t("h4")}</h2>
          <p>{t("p4", { name: siteConfig.name })}</p>

          <h2>{t("h5")}</h2>
          <p>{t("p5")}</p>

          <h2>{t("h6")}</h2>
          <p>{t("p6")}</p>

          <h2>{t("h7")}</h2>
          <p>{t("p7")}</p>

          <h2>{t("h8")}</h2>
          <p>
            {t.rich("p8", {
              email: () => (
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              ),
            })}
          </p>
        </Prose>
      </Section>
    </>
  );
}
