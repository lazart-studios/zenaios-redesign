import { useTranslations } from "next-intl";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div className="container-z relative flex flex-col items-center text-center">
        <p className="text-gradient text-[7rem] font-bold leading-none md:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-md text-muted">{t("description")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="lg">
            <Home className="size-4" />
            {t("backHome")}
          </Button>
          <Button href="/platform" variant="secondary" size="lg" withArrow>
            {t("explore")}
          </Button>
        </div>
        <Link
          href="/contact"
          className="group mt-8 inline-flex items-center gap-1.5 text-sm text-faint transition-colors hover:text-zen"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          {t("contact")}
        </Link>
      </div>
    </section>
  );
}
