# CLAUDE.md

This is Roman Frolov's personal portfolio website.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Package Manager**: Bun
- **Icons**: Lucide React, Simple Icons

## Commands

```bash
bun install      # Install dependencies
bun run dev      # Start dev server (http://localhost:3000)
bun run build    # Production build
bun run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/
│   ├── layout/    # Layout components (Navbar)
│   ├── sections/  # Page sections (Hero, Skills, FeaturedProjects, Contact)
│   └── ui/        # Reusable UI components (Card, Container, SocialLink, TechIcon)
├── data/          # Static data (projects.ts, social-links.ts)
├── lib/           # Utilities (cn function for class merging)
└── types/         # TypeScript types (TProject, TSocialLink, TSkill)
```

## Code Conventions

- **Path aliases**: Use `@/*` for imports from `src/`
- **Class merging**: Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- **Types**: Prefix type names with `T` (e.g., `TProject`, `TSkill`)
- **Components**: One component per file, use named exports with barrel files (`index.ts`)
- **Styling**: Tailwind CSS with CSS variables for theming (light theme only)
- **Font**: JetBrains Mono (monospace throughout)
- **Comments**: Only for complex logic, not obvious code
- **Clickable elements**: Always include `cursor-pointer` and `hover:opacity-*` transitions

## CSS Variables (globals.css)

- `--background`: Page background
- `--foreground`: Primary text color
- `--muted`: Muted background color
- `--muted-foreground`: Secondary text color
