import { useTranslations } from "next-intl";
import type { Industry, IndustryStatus } from "@/lib/data/types";
import { cn } from "@/lib/utils";

const statusText: Record<IndustryStatus, string> = {
  live: "text-success",
  building: "text-zen",
  exploring: "text-faint",
};

const statusDot: Record<IndustryStatus, string> = {
  live: "bg-success",
  building: "bg-zen",
  exploring: "bg-faint",
};

/** Uniform flat industry card — icon, status tag, name, one-line tagline. */
export function IndustryCard({ industry }: { industry: Industry }) {
  const t = useTranslations("industries");
  const Icon = industry.icon;
  return (
    <div className="flex h-full flex-col rounded-2xl border border-hairline bg-card p-6 transition-colors duration-200 hover:border-hairline-strong">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-zen/12 text-zen ring-1 ring-zen/25">
          <Icon className="size-5" />
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em]",
            statusText[industry.status]
          )}
        >
          <span className={cn("size-1.5 rounded-full", statusDot[industry.status])} />
          {t(`status.${industry.status}`)}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{industry.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {industry.tagline}
      </p>
    </div>
  );
}
