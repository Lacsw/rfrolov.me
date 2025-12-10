# rfrolov.me

Personal website built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Bun

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # React components
│   ├── ui/        # Reusable UI primitives
│   └── sections/  # Page sections (Hero, About, Projects)
├── data/          # Static data (projects, social links)
├── lib/           # Utility functions
└── types/         # TypeScript type definitions
```

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
