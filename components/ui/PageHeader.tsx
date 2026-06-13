import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SwirlMotif } from "@/components/brand/SwirlMotif";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Shared hero/header for inner pages: breadcrumbs + eyebrow + title +
 * description, with the brand swirl bleeding in from the right.
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
        "relative overflow-hidden border-b border-hairline pt-32 pb-14 md:pt-40 md:pb-20",
        className
      )}
    >
      <SwirlMotif className="pointer-events-none absolute -right-32 -top-20 size-[440px] opacity-25 md:opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-zen/10 blur-[120px]" />

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
                  <Link href={c.href} className="transition-colors hover:text-sky">
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
            <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-sky">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-sky" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.05] sm:text-5xl md:text-[3.5rem]">
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
