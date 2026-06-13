import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ModuleItem } from "@/lib/data/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const accentMap: Record<ModuleItem["accent"], string> = {
  zen: "bg-zen/12 text-sky ring-zen/25 group-hover:bg-zen/20",
  sky: "bg-sky/12 text-sky ring-sky/25 group-hover:bg-sky/20",
  success: "bg-success/12 text-success ring-success/25 group-hover:bg-success/20",
  violet: "bg-violet/12 text-violet ring-violet/25 group-hover:bg-violet/20",
  warning: "bg-warning/12 text-warning ring-warning/25 group-hover:bg-warning/20",
};

const glowMap: Record<ModuleItem["accent"], string> = {
  zen: "bg-zen/20",
  sky: "bg-sky/20",
  success: "bg-success/20",
  violet: "bg-violet/25",
  warning: "bg-warning/20",
};

export function ModuleCard({ module: m }: { module: ModuleItem }) {
  const t = useTranslations("common");
  const Icon = m.icon;
  return (
    <Link
      href={`/modules/${m.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-card/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong hover:bg-card/70 hover:shadow-soft"
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 size-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
          glowMap[m.accent]
        )}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-xl ring-1 transition-all duration-300 group-hover:scale-105",
            accentMap[m.accent]
          )}
        >
          <Icon className="size-5" />
        </span>
        <StatusBadge status={m.status} />
      </div>

      <h3 className="relative mt-4 text-base font-bold text-ink">{m.name}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">
        {m.summary}
      </p>

      <div className="relative mt-4 flex items-center justify-between border-t border-hairline pt-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
          {m.version}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-sky">
          {t("details")}
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
