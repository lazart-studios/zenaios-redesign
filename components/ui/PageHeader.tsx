import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Shared hero/header for inner pages: breadcrumbs + eyebrow + title +
 * description on a clean, flat surface.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36",
        className
      )}
    >
      <div
        className={cn(
          "container-z relative",
          align === "center" && "flex flex-col items-center text-center"
        )}
      >
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1.5 text-xs text-faint"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3 text-faint/60" />}
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-zen">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-muted">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <Reveal>
          {eyebrow && (
            <span className="inline-flex items-center text-sm font-semibold text-zen">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-[4rem]">
            {title}
          </h1>
          {description && (
            <div
              className={cn(
                "mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted",
                align === "center" && "mx-auto"
              )}
            >
              {description}
            </div>
          )}
        </Reveal>

        {children && <div className="relative mt-8">{children}</div>}
      </div>
    </header>
  );
}
