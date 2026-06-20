import { ArrowRight, Check, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { EpicrisisDoc } from "@/components/visuals/EpicrisisDoc";
import { buildDeployment } from "@/lib/data/deployments";

export function Flagship() {
  const t = useTranslations("flagship");
  const d = buildDeployment(useTranslations("deploymentsData"), "sjuo-oradea");
  if (!d) return null;

  return (
    <Section id="flagship">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#f5f5f7] p-7 md:p-12">
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{t("description")}</p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              <MapPin className="size-4 text-zen" /> {d.name} · {d.location}
            </p>

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
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-zen"
            >
              {t("link")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          {/* Visual */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative">
              <EpicrisisDoc />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
