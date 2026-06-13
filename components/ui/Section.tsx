import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className={cn("container-z", containerClassName)}>{children}</div>
    </section>
  );
}
