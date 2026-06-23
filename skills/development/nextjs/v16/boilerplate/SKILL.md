---
name: nextjs-boilerplate
description: Scaffold a new Next.js 16+ project using the ViraStack production-ready boilerplate (virastack/nextjs-boilerplate). Use when starting a new Next.js project from scratch to avoid repetitive setup. Includes Tailwind CSS v4, TanStack Query 5, Zustand, Zod, next-intl, shadcn/ui, ESLint 9, Husky, Knip, and AI-ready architecture.
metadata:
  source: virastack/nextjs-boilerplate
  last_modified: 2026-06-23
---

# ViraStack Next.js Boilerplate

## When to Use

Use this skill when **starting a new Next.js 16+ project** to avoid repetitive setup. This boilerplate ships with a production-grade foundation out of the box.

## Included Stack

| Category | Library |
|----------|---------|
| Framework | Next.js 16 + React 19 + App Router |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme inline`) |
| UI Components | shadcn/ui (owned primitives in `components/ui/`) |
| Data Fetching | TanStack Query 5 |
| State | Zustand |
| Validation | Zod + `@t3-oss/env-nextjs` |
| i18n | next-intl |
| Theming | Next Themes (dark/light mode) |
| Icons | Lucide |
| Notifications | Sonner |
| Analytics | Google Analytics |
| Code Quality | ESLint 9, Prettier 3, Husky, lint-staged, Knip |
| AI-Ready | `llms.txt`, `llms-full.txt`, `.cursor/rules`, `AGENTS.md` |
| Bundle | Bundle Analyzer |
| Absolute Imports | `@` prefix |

## Project Bootstrap Workflow

```bash
# Clone the boilerplate (shallow clone for speed)
git clone --depth=1 https://github.com/virastack/nextjs-boilerplate my-project
cd my-project

# Install dependencies (always use pnpm)
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values:
# NEXT_PUBLIC_SITE_URL=https://localhost:3000
# NEXT_PUBLIC_API_URL=https://api.example.com
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Start development server
pnpm dev
```

## Post-Clone Checklist

- [ ] Update `src/env.ts` with required environment variable schema.
- [ ] Search for `FIXME:` tags in the project and fill them in.
- [ ] Configure Google Analytics GA4 ID in `.env`.
- [ ] Update `public/llms.txt` and `public/llms-full.txt` with project context.
- [ ] Set up auth layer (Clerk, Auth.js, or Sanctum — not included by design).
- [ ] Set up testing layer (Vitest + Testing Library, or Playwright — not included by design).
- [ ] Replace default branding/metadata in `src/app/layout.tsx`.
- [ ] Review `.cursor/rules` and `AGENTS.md` for AI governance alignment.
- [ ] Run `pnpm knip` to identify any unused exports.

## Directory Structure

```text
src/
├── app/                   # App Router: routes, layouts, pages, metadata
│   ├── (main)/            # Route group for main layout
│   └── api/               # Route handlers
├── components/
│   ├── ui/                # shadcn/ui base components (do not modify)
│   └── shared/            # Custom reusable components
├── features/              # Domain feature modules
│   └── [feature]/
│       ├── api/           # Fetching/mutation functions
│       ├── components/    # Feature UI
│       ├── hooks/         # TanStack Query hooks
│       ├── schemas/       # Zod schemas
│       ├── stores/        # Zustand stores
│       ├── types/         # Domain types
│       └── index.ts       # Public exports
├── lib/
│   └── utils.ts           # cn() helper + shared utilities
├── env.ts                 # @t3-oss/env-nextjs schema
└── i18n/                  # next-intl configuration
messages/                  # Locale JSON files (en.json, es.json, ...)
public/
├── llms.txt               # LLM context file (update for your project)
└── llms-full.txt          # Extended LLM context file
```

## Key Conventions

- **Always use `pnpm`** — never npm or yarn.
- Tailwind CSS v4 uses CSS-first configuration via `@theme inline` in `globals.css`, not `tailwind.config.ts`.
- shadcn/ui components live in `components/ui/` and should NOT be modified directly.
- Custom reusable components go in `components/shared/`.
- All environment variables are validated at build time via `src/env.ts`.
- Use `@t3-oss/env-nextjs` to add new env vars — never access `process.env` directly.

## Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input card dialog
```

## Dev Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint check
pnpm lint:fix     # Auto-fix lint issues
pnpm knip         # Detect unused exports/dependencies
pnpm analyze      # Bundle size analysis
pnpm commit       # Conventional commit CLI
```

## Auth Setup (Choose One — Not Included)

```bash
# Option A: Clerk
pnpm add @clerk/nextjs

# Option B: NextAuth v5 (Auth.js)
pnpm add next-auth@beta

# Option C: Sanctum session (Laravel backend)
# See: ../auth/SKILL.md
```

## Notes

- Lighthouse Score: 100 out of the box.
- SEO: Sitemap and robots.txt generated automatically.
- The boilerplate deliberately omits auth and testing to stay lightweight and flexible.
- Built on `@virastack/ai-rules` for AI-native architecture governance.
