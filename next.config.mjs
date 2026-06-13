import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin tracing root to this project (silences the multi-lockfile warning).
  outputFileTracingRoot: import.meta.dirname,
  // 301-redirect every retired CureMed clinic-template route to the closest
  // new page so no link rots and SEO equity is preserved (brief §06).
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/old-home", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-doctors", destination: "/about", permanent: true },
      { source: "/careers", destination: "/about", permanent: true },
      { source: "/career", destination: "/about", permanent: true },
      { source: "/departments", destination: "/platform", permanent: true },
      { source: "/services", destination: "/platform", permanent: true },
      { source: "/faq", destination: "/platform", permanent: true },
      { source: "/pricing", destination: "/demo", permanent: true },
      { source: "/schedule", destination: "/demo", permanent: true },
      { source: "/make-an-appointment", destination: "/demo", permanent: true },
      { source: "/testimonials", destination: "/deployments", permanent: true },
      { source: "/insights", destination: "/resources", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/working-hours", destination: "/contact", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
