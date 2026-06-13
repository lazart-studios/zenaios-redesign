import { ArrowUpRight, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SwirlMotif } from "@/components/brand/SwirlMotif";
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
        <div className="relative overflow-hidden rounded-[2rem] border border-hairline-strong bg-gradient-to-br from-card/80 via-surface/60 to-abyss px-6 py-14 text-center md:px-12 md:py-20">
          {/* Ambient glow + motif */}
          <div className="pointer-events-none absolute -right-20 -top-24 size-[26rem] rounded-full bg-zen/15 blur-[130px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-sky/10 blur-[120px]" />
          <SwirlMotif className="pointer-events-none absolute -right-10 top-1/2 size-72 -translate-y-1/2 opacity-25 md:size-96" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-sky">
              <span className="size-1.5 animate-pulse rounded-full bg-success" />
              {t(`${variant}.eyebrow`)}
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
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
