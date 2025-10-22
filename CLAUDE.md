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

## Development Workflow

**IMPORTANT: Always create a new branch before making any big changes!**

```bash
# Create and switch to new feature branch
git checkout -b feature/your-feature-name

# Make code changes and STOP
# Let the user review the changes first
# NEVER commit or push without user approval

# After user reviews and approves, they will tell you to commit and push:
git add .
git commit -m "feat: your commit message"
git push -u origin feature/your-feature-name

# STOP HERE - Wait for user instruction
# The user will tell you when to:
# - Rebase feature branch to dev
# - Rebase dev to main
# - Delete feature branches
# NEVER do these operations automatically!
```

## Git Branch Management Rules

**NEVER do these operations without explicit user instruction:**

❌ **DO NOT** commit changes without user review and approval
❌ **DO NOT** push any branch without being asked
❌ **DO NOT** run `git add` without user approval
❌ **DO NOT** rebase feature branches to `dev` automatically
❌ **DO NOT** rebase `dev` to `main` automatically  
❌ **DO NOT** delete feature branches automatically (local or remote)

✅ **ONLY** create feature branches when working on features
✅ **ONLY** make code changes and show them to user for review
✅ **WAIT** for user to explicitly ask before committing, pushing, rebasing, or deleting

The user will tell you when they want to:
- Commit and push changes (after reviewing)
- Merge/rebase feature branch to dev
- Merge/rebase dev to main  
- Clean up feature branches

## Git Commit Guidelines

**NEVER include Claude/AI attribution in commit messages**

❌ Bad:

```
🤖 Generated with [Claude Code](https://claude.ai/code)
Co-Authored-By: Claude <noreply@anthropic.com>
```

✅ Good:

```
feat: implement user authentication system

- Add login/logout functionality
- Create protected routes
- Implement JWT token handling
```

## Important Development Reminders

- ALWAYS create a new branch before making any code changes or new features
- NEVER include Claude/AI attribution in commit messages
- NEVER commit or push changes without user review and approval
- NEVER run git add, git commit, or git push without being asked
- NEVER rebase branches or delete branches without explicit user instruction
- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (\*.md) or README files unless explicitly requested
- ALWAYS consider to make it reusable like a component or utils, don't repeat code or logic
- ALWAYS focus on server-side solution first don't fix the problem by just turn the component into client component
