import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/lib/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Get in touch with the ZenAiOS team in Oradea, România — by phone, email or the form. We reply within one business day.",
  path: "/contact",
});

const details = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.contact.location,
    href: "https://www.openstreetmap.org/search?query=Oradea",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Let&apos;s <span className="text-gradient">talk.</span>
          </>
        }
        description="Questions about the platform, a deployment, or a partnership? Reach us directly — or send a message and we'll get back to you."
      />

      <Section className="!pt-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Left — details */}
          <div className="space-y-4">
            {details.map((d, i) => {
              const Icon = d.icon;
              const external = d.href.startsWith("http");
              return (
                <Reveal key={d.label} delay={i * 0.05}>
                  <a
                    href={d.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-hairline bg-card/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-hairline-strong hover:bg-card/70"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-zen/12 text-sky ring-1 ring-zen/25 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-wider text-faint">
                        {d.label}
                      </span>
                      <span className="block truncate text-sm font-medium text-ink">
                        {d.value}
                      </span>
                    </span>
                    {external && (
                      <ArrowUpRight className="ml-auto size-4 text-faint transition-colors group-hover:text-sky" />
                    )}
                  </a>
                </Reveal>
              );
            })}

            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-2xl border border-hairline bg-card/40">
                <div className="bg-grid relative h-40">
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-abyss/70 px-3 py-1.5 text-xs text-muted backdrop-blur">
                      <MapPin className="size-3.5 text-sky" />
                      {siteConfig.contact.location}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal direction="left" delay={0.1}>
            <LeadForm kind="contact" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
