import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
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
    page: "privacy",
    path: "/legal/privacy",
  });
}

// NOTE FOR CLIENT: template privacy policy — review with legal counsel and
// confirm the controlling legal entity, DPO contact and CNAS/GDPR specifics
// before launch.
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const legal = await getTranslations("legal");
  const t = await getTranslations("legal.privacy");
  const common = await getTranslations("common");
  const domain = siteConfig.url.replace("https://", "");
  const rights = t.raw("rights") as string[];

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
          <p>
            {t("intro", {
              name: siteConfig.name,
              domain,
              location: siteConfig.contact.location,
            })}
          </p>

          <h2>{t("h1")}</h2>
          <p>{t("p1a")}</p>
          <p>{t("p1b")}</p>

          <h2>{t("h2")}</h2>
          <p>{t("p2a", { name: siteConfig.name })}</p>
          <p>{t.rich("p2b", { strong: (chunks) => <strong>{chunks}</strong> })}</p>

          <h2>{t("h3")}</h2>
          <p>{t("p3")}</p>

          <h2>{t("h4")}</h2>
          <p>{t("p4")}</p>

          <h2>{t("h5")}</h2>
          <p>{t("p5")}</p>
          <ul>
            {rights.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <h2>{t("h6")}</h2>
          <p>
            {t.rich("p6", {
              email: () => (
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              ),
              phone: () => (
                <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
              ),
            })}
          </p>

          <h2>{t("h7")}</h2>
          <p>{t("p7")}</p>
        </Prose>
      </Section>
    </>
  );
}
