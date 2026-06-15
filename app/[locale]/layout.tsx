import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { Background } from "@/components/layout/Background";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { siteConfig } from "@/lib/data/site";
import { routing, isLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    authors: [{ name: siteConfig.name }],
    openGraph: {
      type: "website",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: t("titleDefault"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  // v3 doesn't auto-forward messages to the client provider — pass them explicitly.
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "meta" });

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: t("description"),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Oradea",
      addressCountry: "RO",
    },
    founder: [
      { "@type": "Person", name: "George Haber", jobTitle: "CEO" },
      { "@type": "Person", name: "Vlad Iliescu", jobTitle: "CTO" },
      { "@type": "Person", name: "Horea Timiș", jobTitle: "CMO" },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Background />
          <SmoothScroll />
          <Nav />
          <main className="relative">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
