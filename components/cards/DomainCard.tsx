import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Category } from "@/lib/data/types";
import { buildModulesByCategory } from "@/lib/data/modules";
import { cn } from "@/lib/utils";

export function DomainCard({ category }: { category: Category }) {
  const t = useTranslations("common");
  const mods = buildModulesByCategory(useTranslations("modules.items"), category.slug);
  const Icon = category.icon;
  const isViolet = category.accent === "violet";
  const live = mods.filter((m) => m.status === "active").length;

  return (
    <Link
      href={`/platform/${category.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-card/40 p-6 transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-hairline-strong hover:bg-card/70 hover:shadow-soft"
      )}
    >
      {/* hover glow */}
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
          isViolet ? "bg-violet/25" : "bg-zen/25"
        )}
      />

      <div className="relative flex items-center justify-between">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110",
            isViolet
              ? "bg-violet/12 text-violet ring-violet/25"
              : "bg-zen/12 text-sky ring-zen/25"
          )}
        >
          <Icon className="size-6" />
        </span>
        <span className="text-right">
          <span className="block text-3xl font-bold text-ink">{mods.length}</span>
          <span className="text-[11px] uppercase tracking-wider text-faint">
            {t("modules")}
          </span>
        </span>
      </div>

      <p className="relative mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
        {category.label}
      </p>
      <h3 className="relative mt-1 text-xl font-bold text-ink">{category.name}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">
        {category.description}
      </p>

      {/* module chips */}
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {mods.slice(0, 4).map((m) => (
          <span
            key={m.slug}
            className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-muted ring-1 ring-hairline"
          >
            {m.short}
          </span>
        ))}
        {mods.length > 4 && (
          <span className="rounded-md px-2 py-1 text-[11px] text-faint">
            {t("moreCount", { count: mods.length - 4 })}
          </span>
        )}
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-hairline pt-4">
        {live > 0 ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-success">
            <span className="size-1.5 rounded-full bg-success" />
            {t("liveDeploymentCount", { count: live })}
          </span>
        ) : (
          <span className="text-xs text-faint">{t("builtOnPlatform")}</span>
        )}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-sky">
          {t("seeModules")}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
