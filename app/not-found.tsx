import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SwirlMotif } from "@/components/brand/SwirlMotif";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <SwirlMotif className="pointer-events-none absolute -right-32 top-1/4 size-[520px] opacity-25" />
      <div className="container-z relative flex flex-col items-center text-center">
        <p className="text-gradient text-[7rem] font-bold leading-none md:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
          This page took the day off
        </h1>
        <p className="mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back to something useful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="lg">
            <Home className="size-4" />
            Back home
          </Button>
          <Button href="/platform" variant="secondary" size="lg" withArrow>
            Explore the platform
          </Button>
        </div>
        <Link
          href="/contact"
          className="group mt-8 inline-flex items-center gap-1.5 text-sm text-faint transition-colors hover:text-sky"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          Or contact us if something&apos;s broken
        </Link>
      </div>
    </section>
  );
}
