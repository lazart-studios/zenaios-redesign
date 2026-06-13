import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { siteConfig } from "@/lib/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How ZenAiOS handles personal data on this website and across the platform, including our data-sovereignty approach.",
  path: "/legal/privacy",
});

// NOTE FOR CLIENT: template privacy policy — review with legal counsel and
// confirm the controlling legal entity, DPO contact and CNAS/GDPR specifics
// before launch.
const LAST_UPDATED = "13 June 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        title="Privacy Policy"
        description={`Last updated ${LAST_UPDATED}`}
      />

      <Section>
        <Prose>
          <p>
            This Privacy Policy explains how {siteConfig.name} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;) handles personal data in connection with this website (
            {siteConfig.url.replace("https://", "")}) and our platform. We are based
            in {siteConfig.contact.location} and are committed to processing personal
            data in line with the EU General Data Protection Regulation (GDPR).
          </p>

          <h2>1. Data we collect on this website</h2>
          <p>
            This marketing website is intentionally minimal. The demo and contact
            forms are presented as a demonstration and do not transmit or store
            submissions. If and when these forms are connected to a backend, we will
            collect only the information you choose to provide — typically your name,
            work email, organisation and message — in order to respond to your
            enquiry.
          </p>
          <p>
            We may collect limited, aggregated technical information (such as basic
            analytics) to understand how the site is used. We do not sell personal
            data.
          </p>

          <h2>2. Data within the platform</h2>
          <p>
            The ZenAiOS platform processes data on behalf of the institutions that
            deploy it (for example hospitals and public authorities), who act as data
            controllers. In those settings, {siteConfig.name} acts as a data
            processor under a written agreement.
          </p>
          <p>
            <strong>Data sovereignty.</strong> Our infrastructure is designed so that
            sensitive clinical and administrative data can remain on-premise. Our
            retrieval-augmented AI (ZEN_RAG) can run 100% offline, meaning regulated
            data need not leave the institution&apos;s own environment.
          </p>

          <h2>3. Legal bases</h2>
          <p>
            Where we process personal data, we rely on one or more of the following
            legal bases: your consent, the performance of a contract, compliance with
            a legal obligation, or our legitimate interests in operating and improving
            our services.
          </p>

          <h2>4. Retention</h2>
          <p>
            We retain personal data only for as long as necessary for the purposes
            described here or as required by law. Enquiry data is kept for as long as
            needed to handle your request and a reasonable period thereafter.
          </p>

          <h2>5. Your rights</h2>
          <p>Subject to applicable law, you have the right to:</p>
          <ul>
            <li>access the personal data we hold about you;</li>
            <li>request correction or deletion of your data;</li>
            <li>object to or restrict certain processing;</li>
            <li>request portability of data you provided to us;</li>
            <li>lodge a complaint with your data protection authority.</li>
          </ul>

          <h2>6. Contact</h2>
          <p>
            For any privacy question or to exercise your rights, contact us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>{" "}
            or by phone at{" "}
            <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>.
          </p>

          <h2>7. Changes</h2>
          <p>
            We may update this policy from time to time. The &ldquo;last
            updated&rdquo; date above reflects the latest revision.
          </p>
        </Prose>
      </Section>
    </>
  );
}
