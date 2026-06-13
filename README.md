# ZenAiOS — Website Redesign

A complete redesign of [zenaios.com](https://www.zenaios.com) — the AI operating
system for modern hospitals. Built with Next.js, React and Framer Motion, with a
scroll-driven, motion-rich experience and a locked brand identity.

> **17 AI modules · 3 domains · 2 live deployments** — live at a county emergency
> hospital (SJUO Oradea) and a city hall (Primăria Oradea).

---

## Tech stack

| | |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router, React 19, fully static export-ready) |
| **Language** | TypeScript (strict) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme` tokens) |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://lenis.studio) inertial smooth scroll |
| **Icons** | [lucide-react](https://lucide.dev) |
| **Fonts** | [Geist](https://vercel.com/font) Sans & Mono |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (all routes prerender to static HTML)
npm run start    # serve the production build
npm run lint     # eslint
```

> Node 18.18+ (or 20+) is recommended.

## Project structure

```
app/                       App Router pages & routes
  page.tsx                 Home (the showpiece)
  platform/                Platform overview + /platform/[category]
  modules/[slug]/          Dynamic module detail (1 per module, SSG)
  deployments/             Live deployments
  about/                   Team + vision + principles
  demo/  contact/          Lead forms (client-side validation, visual stubs)
  legal/                   Privacy & Terms
  resources/               Resources hub
  opengraph-image.tsx      Generated social card
  sitemap.ts  robots.ts    SEO
components/
  brand/                   Logo + animated swirl motif (brand-locked)
  layout/                  Nav (mega-menu), Footer, Background
  sections/                Home & shared page sections
  visuals/                 Custom in-code product mockups (dashboard, epicrisis, triage, RAG…)
  cards/  ui/  motion/  forms/
lib/
  data/                    Single source of truth: modules, categories, deployments, team, site config
  seo.ts  utils.ts
```

## Design system

Brand colours are **locked** to the logo and must never be recoloured:

| Token | Hex | Use |
|---|---|---|
| Zen Blue | `#0076FD` | primary actions, brand |
| Sky | `#71BEFF` | accents, links |
| Deep Navy | `#031044` | wordmark |
| Abyss | `#02081C` | page background |

All design tokens live in [`app/globals.css`](app/globals.css) under `@theme`.
Colours, type, radii and motion are referenced through Tailwind utility classes
(`bg-zen`, `text-sky`, `border-hairline`, …).

## Content & honesty

All product copy lives in `lib/data/`, separated from presentation. Per the brief's
honesty rule, the site distinguishes **verifiable facts** (module count, live
deployments, languages) from **clearly-labelled projections** (efficiency figures),
which are never presented as measured outcomes.

## Accessibility & motion

- Semantic landmarks, keyboard-focusable controls, visible focus rings.
- Every animation honours `prefers-reduced-motion` (motion and smooth scroll disable).
- Targeting WCAG 2.1 AA.

## Internationalisation

The site ships in **English** with the i18n scaffolding and a language switcher in
place for **Română** (data and config are locale-aware; RO copy is the next step).

## Notes for launch

A few items are intentionally marked for the client to confirm before going live
(search the codebase for `NOTE FOR CLIENT`):

- The CEO vision quote (`lib/data/team.ts`) is placeholder copy.
- Team LinkedIn links point to name searches until exact profile URLs are supplied.
- Privacy & Terms are professional templates pending legal review.
- The demo/contact forms are visual stubs — wire them to a backend or email service.

---

© ZenAiOS · Oradea, România
