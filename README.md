# MDX Blog with Next.js and shadcn/ui

A modern blog built with Next.js 15, MDX support, and shadcn/ui components. Features beautiful typography, syntax highlighting, and file tree visualization.

## Tech Stack

- **Framework**: Next.js 15 with App Router and TypeScript
- **Build Tool**: Turbopack for faster development and builds
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Content**: MDX for rich blog posts with React components
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono

## Features

- 🚀 Fast development with Turbopack
- 📝 MDX support with custom components
- 🎨 Beautiful UI with shadcn/ui components
- 🌳 File tree visualization for code examples
- 💻 Syntax highlighting with CodeBlock component
- 📱 Responsive design
- 🎯 TypeScript for type safety

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

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

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with fonts
│   └── page.tsx        # Homepage
├── components/
│   ├── ui/             # shadcn/ui components
│   └── mdx-components.tsx  # Custom MDX components
└── lib/
    ├── utils.ts        # Utility functions (cn, etc.)
    └── mdx.ts          # MDX processing utilities

content/                # Blog posts in MDX format
└── [year]/
    └── *.mdx
```

## Writing Blog Posts

Create MDX files in the `content/` directory. The blog supports:

- **Code blocks** with syntax highlighting
- **File trees** for directory structures
- **Custom React components** within markdown
- **Front matter** for post metadata

Example MDX file:

```mdx
---
title: "My Blog Post"
date: "2024-01-01"
---

# Hello World

Here's some code:

\`\`\`javascript
console.log("Hello, world!");
\`\`\`

And a file tree:

\`\`\`tree
src/
├── components/
│ └── ui/
└── lib/
\`\`\`
```

## Customization

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

### Styling

The project uses Tailwind CSS v4 with CSS variables for theming. Modify `src/app/globals.css` for global styles.

### MDX Components

Customize MDX rendering by editing `src/components/mdx-components.tsx`.
