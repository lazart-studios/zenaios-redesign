import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

/**
 * Global 404 — rendered for paths that don't resolve to a locale segment, so it
 * lives outside the `[locale]` layout and must bring its own <html>/<body>.
 * English-only by design (the locale is unknown here).
 */
export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-abyss antialiased">
        <main className="relative grid min-h-dvh place-items-center px-6 text-center">
          <div className="mx-auto max-w-md">
            <p className="text-gradient text-[6rem] font-bold leading-none">404</p>
            <h1 className="mt-2 text-2xl font-semibold text-ink">
              This page took the day off
            </h1>
            <p className="mt-3 text-muted">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-abyss transition hover:bg-white/90"
            >
              Back home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
