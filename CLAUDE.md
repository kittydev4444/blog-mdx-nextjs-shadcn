# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog project with MDX support, styled with shadcn/ui components and Tailwind CSS. The project uses TypeScript and is configured with Turbopack for faster builds.

## Development Commands

```bash
# Start development server with Turbopack
pnpm run dev

# Build for production with Turbopack
pnpm run build

# Start production server
pnpm start

# Run linting
pnpm run lint
```

## Architecture

- **Framework**: Next.js 15 App Router with TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **UI Components**: Located in `src/components/ui/` (shadcn/ui pattern)
- **Utilities**: `src/lib/utils.ts` contains the `cn()` function for className merging
- **Fonts**: Geist Sans and Geist Mono fonts configured in layout
- **Path Aliases**: `@/*` maps to `src/*`

## shadcn/ui Configuration

Components are configured with:

- Style: "new-york"
- Base color: zinc
- Icon library: lucide-react
- CSS variables enabled
- Aliases: `@/components/ui`, `@/lib/utils`, etc.

## Key Files

- `src/app/layout.tsx`: Root layout with font configuration
- `src/app/page.tsx`: Main page component
- `src/components/ui/`: shadcn/ui components
- `src/lib/utils.ts`: Utility functions including `cn()` for className merging
- `components.json`: shadcn/ui configuration
- `next.config.ts`: Next.js configuration (currently minimal)

## Build System

- Uses Turbopack for both development and production builds
- TypeScript with strict mode enabled
- ESLint for code linting
