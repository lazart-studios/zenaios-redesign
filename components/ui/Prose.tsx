import { cn } from "@/lib/utils";

/**
 * Lightweight prose wrapper for legal / long-form copy.
 * Styles children via arbitrary descendant selectors (no typography plugin).
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-5 text-[15px] leading-relaxed text-muted",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:scroll-mt-28 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink",
        "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-ink",
        "[&_p]:leading-relaxed",
        "[&_a]:font-medium [&_a]:text-sky hover:[&_a]:underline",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        "[&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:marker:text-faint",
        className
      )}
    >
      {children}
    </div>
  );
}
