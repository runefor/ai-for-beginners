# AI for Beginners - Presentation Project

## Overview
Interactive presentation introducing AI concepts for beginners, built with Next.js and Reveal.js.

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Presentation**: Reveal.js
- **Import Alias**: `@/*` maps to `src/*`

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main presentation page
│   └── globals.css         # Global styles + Reveal.js overrides
├── components/
│   ├── ui/                 # shadcn/ui components (button, card, badge, tabs, separator)
│   ├── presentation/       # Reveal.js wrappers (RevealPresentation, Slide)
│   └── slides/             # Individual slide components (v0.dev generated)
└── lib/
    └── utils.ts            # shadcn/ui utility (cn function)
```

## v0.dev Integration Workflow
1. Design slide components in v0.dev
2. Copy generated code to `src/components/slides/` directory
3. Import and wrap with `<Slide>` component in `page.tsx`
4. Use `@/` import alias for all internal imports
5. Verify any shadcn/ui dependencies are installed

## Component Naming
- PascalCase for all component files (e.g., `TitleSlide.tsx`, `AgendaSlide.tsx`)
- Each slide component is a self-contained React component

## Reveal.js Slide Structure
- `<RevealPresentation>` wraps all slides (handles Reveal.js initialization)
- `<Slide>` wraps each individual slide as a `<section>` element
- Nested `<Slide>` components create vertical slide stacks
- Props: `dataBackground`, `dataBackgroundColor`, `dataTransition`

## Development Commands
```bash
npm run dev      # Start dev server (Turbopack) at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```
