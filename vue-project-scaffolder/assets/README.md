# {project-name}

A production-ready Vue 3 project with Vite, Tailwind CSS v4, and shadcn/vue.

## Quick Start

```bash
pnpm run dev
```

The app will be available at `http://localhost:5173`

## Stack

- **Vue 3** — Reactive framework
- **Vite** — Lightning-fast build tool
- **Tailwind CSS v4** — Utility-first CSS framework
- **shadcn/vue** — High-quality Vue components
- **TypeScript** — Type-safe development

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/vue components
│   └── sections/     # Your custom sections
├── composables/      # Vue composables
├── lib/
│   └── utils.ts      # Utility functions
├── types/            # TypeScript types
├── stores/           # State management (Pinia, if added)
├── App.vue           # Root component
├── main.ts           # Entry point
└── style.css         # Global styles
```

## Available Scripts

- `pnpm run dev` — Start development server
- `pnpm run build` — Build for production
- `pnpm run preview` — Preview production build locally

## Next Steps

- Add more shadcn components: `pnpm dlx shadcn-vue@latest add button input card`
- Add Pinia for state management: `pnpm add pinia`
- Add routing: `pnpm add vue-router`

## Resources

- [Vue 3 Documentation](https://vuejs.org)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [shadcn/vue Documentation](https://www.shadcn-vue.com)
