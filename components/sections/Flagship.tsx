import { ArrowRight, Check, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/motion/Reveal";
import { EpicrisisDoc } from "@/components/visuals/EpicrisisDoc";
import { buildDeployment } from "@/lib/data/deployments";

export function Flagship() {
  const t = useTranslations("flagship");
  const d = buildDeployment(useTranslations("deploymentsData"), "sjuo-oradea");
  if (!d) return null;

  return (
    <Section id="flagship">
      <div className="relative overflow-hidden rounded-3xl border border-hairline bg-card/40 p-6 md:p-10">
        <div className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-zen/15 blur-[120px]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          {/* Copy */}
          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <div className="mt-4 flex items-center gap-3">
              <StatusBadge status="active" />
              <span className="inline-flex items-center gap-1 text-xs text-faint">
                <MapPin className="size-3.5" /> {d.location}
              </span>
            </div>
            <h2 className="mt-3 text-balance text-2xl font-bold sm:text-3xl">
              {d.name}
            </h2>
            <p className="mt-3 max-w-md text-muted">{t("description")}</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {d.live.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink/90">
                  <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-success/15">
                    <Check className="size-3 text-success" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={`/deployments`}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-sky"
            >
              {t("link")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          {/* Visual */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative">
              <EpicrisisDoc />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-hairline bg-white/[0.02] p-4">
                  <p className="text-2xl font-bold text-ink">v2.4</p>
                  <p className="text-xs text-faint">{t("statProduction")}</p>
                </div>
                <div className="rounded-xl border border-hairline bg-white/[0.02] p-4">
                  <p className="text-2xl font-bold text-ink">ICD-10 · DRG</p>
                  <p className="text-xs text-faint">{t("statCoding")}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
