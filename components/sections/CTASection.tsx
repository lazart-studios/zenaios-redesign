import { ArrowUpRight, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function CTASection({
  variant = "default",
  primaryHref = "/demo",
  className,
}: {
  /** Selects the copy block under the `cta` namespace. */
  variant?: "default" | "about" | "deployments";
  primaryHref?: string;
  className?: string;
}) {
  const t = useTranslations("cta");
  return (
    <section className={cn("container-z py-20 md:py-28", className)}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-[#f5f5f7] px-6 py-14 text-center md:px-12 md:py-20">
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-faint">
              <span className="size-1.5 rounded-full bg-success" />
              {t(`${variant}.eyebrow`)}
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {t(`${variant}.title`)}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-muted md:text-lg">
              {t(`${variant}.description`)}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={primaryHref} size="lg" withArrow>
                {t("requestDemo")}
              </Button>
              <Button href={siteConfig.demoUrl} variant="secondary" size="lg">
                {t("openLive")}
                <ArrowUpRight className="size-4" />
              </Button>
            </div>

            <a
              href={siteConfig.contact.phoneHref}
              className="mt-7 inline-flex items-center gap-2 text-sm text-faint transition-colors hover:text-ink"
            >
              <Phone className="size-3.5" />
              {t("callUs", { phone: siteConfig.contact.phone })}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
