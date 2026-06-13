import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { siteConfig } from "@/lib/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Use",
  description:
    "The terms governing your use of the ZenAiOS website and the information presented on it.",
  path: "/legal/terms",
});

// NOTE FOR CLIENT: template terms of use — review with legal counsel and confirm
// the controlling legal entity and governing-law jurisdiction before launch.
const LAST_UPDATED = "13 June 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
        title="Terms of Use"
        description={`Last updated ${LAST_UPDATED}`}
      />

      <Section>
        <Prose>
          <p>
            These Terms of Use govern your access to and use of the {siteConfig.name}{" "}
            website at {siteConfig.url.replace("https://", "")} (the
            &ldquo;Site&rdquo;). By using the Site, you agree to these terms.
          </p>

          <h2>1. The Site is informational</h2>
          <p>
            This Site presents information about the {siteConfig.name} platform and
            its modules. Content is provided for general information only and does not
            constitute medical, legal or professional advice. Product mock-ups and
            illustrations shown here are representative of the platform&apos;s
            capabilities.
          </p>

          <h2>2. Demonstration forms</h2>
          <p>
            The demo and contact forms on this Site are demonstrations. Unless
            explicitly stated otherwise, submissions are not transmitted, stored or
            acted upon. To contact us reliably, use the email or phone number on our{" "}
            <a href="/contact">contact page</a>.
          </p>

          <h2>3. Projections and figures</h2>
          <p>
            Any efficiency or outcome figures shown on this Site are clearly labelled
            as projections or illustrative targets. They are not guarantees and should
            not be relied upon as measured results. Verifiable facts about the platform
            (such as the number of modules and live deployments) are presented as such.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            The {siteConfig.name} name, logo, brand, text, graphics and software shown
            on this Site are owned by us or our licensors and are protected by
            applicable intellectual-property laws. You may not copy, reproduce or
            distribute them without our prior written permission.
          </p>

          <h2>5. Third-party links</h2>
          <p>
            The Site may link to third-party websites or services (for example the
            live platform environment). We are not responsible for the content or
            practices of those third parties.
          </p>

          <h2>6. Disclaimer & liability</h2>
          <p>
            The Site is provided &ldquo;as is&rdquo; without warranties of any kind, to
            the fullest extent permitted by law. We are not liable for any loss arising
            from your use of, or reliance on, the Site.
          </p>

          <h2>7. Governing law</h2>
          <p>
            These terms are governed by the laws of România, without regard to
            conflict-of-laws principles. Any disputes will be subject to the competent
            courts of România.
          </p>

          <h2>8. Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </Prose>
      </Section>
    </>
  );
}
