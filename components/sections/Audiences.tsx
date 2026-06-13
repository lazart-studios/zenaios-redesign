import { Building2, Stethoscope, TrendingUp, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Locale-invariant per-audience facts (icon + link targets). Text — role, tag,
 * needs, chips and link labels — comes from `audiences.items` in the catalog,
 * matched by index.
 */
const audienceSkeletons = [
  { icon: Building2, hrefs: ["/modules/hospital-manager", "/deployments"] },
  { icon: Stethoscope, hrefs: ["/modules/doctor", "/modules/quiz"] },
  { icon: TrendingUp, hrefs: ["/platform", "/about"] },
];

type AudienceItem = {
  role: string;
  tag: string;
  needs: string;
  show: string[];
  links: string[];
};

export function Audiences() {
  const t = useTranslations("audiences");
  const items = t.raw("items") as AudienceItem[];

  return (
    <Section id="audiences">
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("titleLead")}{" "}
              <span className="text-gradient">{t("titleAccent")}</span>{" "}
              {t("titleTrail")}
            </>
          }
          description={t("description")}
        />
      </Reveal>

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((a, i) => {
          const skeleton = audienceSkeletons[i];
          const Icon = skeleton.icon;
          return (
            <StaggerItem key={a.role}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-hairline bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:bg-card/70">
                <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-sky ring-1 ring-zen/25 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{a.role}</h3>
                <p className="text-[11px] uppercase tracking-wider text-faint">
                  {a.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a.needs}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.show.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-muted ring-1 ring-hairline"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-6">
                  {a.links.map((label, j) => (
                    <Link
                      key={skeleton.hrefs[j]}
                      href={skeleton.hrefs[j]}
                      className="group/link inline-flex items-center gap-1 text-sm font-medium text-sky"
                    >
                      {label}
                      <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
