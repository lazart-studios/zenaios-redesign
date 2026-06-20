import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { buildProofBadges } from "@/lib/data/outcomes";

export function ProofStrip() {
  const t = useTranslations("proof");
  const badges = buildProofBadges(useTranslations("outcomesData")).slice(0, 4);

  return (
    <section className="border-y border-black/[0.06] bg-[#f5f5f7] py-12">
      <div className="container-z">
        <p className="text-center text-sm font-medium text-muted">{t("heading")}</p>
        <div className="mx-auto mt-7 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge} className="flex items-center justify-center gap-2 text-center text-sm font-medium text-ink">
              <CheckCircle2 className="size-4 shrink-0 text-zen" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
