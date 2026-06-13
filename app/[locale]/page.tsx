import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/data/site";
import { routing, type Locale } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { ThreeDomains } from "@/components/sections/ThreeDomains";
import { Audiences } from "@/components/sections/Audiences";
import { Flagship } from "@/components/sections/Flagship";
import { Capabilities } from "@/components/sections/Capabilities";
import { Outcomes } from "@/components/sections/Outcomes";
import { Team } from "@/components/sections/Team";
import { CTASection } from "@/components/sections/CTASection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteConfig.url}${localizedPath(l, "/")}`]),
  );
  return {
    alternates: {
      canonical: `${siteConfig.url}${localizedPath(locale, "/")}`,
      languages,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <>
      <Hero />
      <ProofStrip />
      <ThreeDomains />
      <Audiences />
      <Flagship />
      <Capabilities />
      <Outcomes />
      <Team />
      <CTASection />
    </>
  );
}
