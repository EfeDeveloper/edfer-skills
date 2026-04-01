# {project-name}

A modern, production-ready Vue 3 application built with **Vite**, **Tailwind CSS v4**, and **TypeScript**.

> Optimized for performance, scalability, and developer experience.

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.19.0 or >= 22.12.0
- Package manager: pnpm, npm, yarn, or bun

### Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| **Vue 3** | Reactive, progressive framework |
| **Vite** | Lightning-fast build tool & dev server |
| **Tailwind CSS v4** | Utility-first CSS framework (plugin-based) |
| **TypeScript** | Type-safe development |
| **tw-animate-css** | Advanced Tailwind animations |
| **clsx** | Conditional class names |
| **tailwind-merge** | Intelligent Tailwind class merging |
| **lucide-vue-next** | Icon library |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/vue components (if installed)
│   └── sections/        # Custom section components
├── composables/         # Vue composition functions
├── lib/
│   └── utils.ts         # Utility helpers
├── types/               # TypeScript definitions
├── App.vue              # Root component
├── main.ts              # Application entry point
└── style.css            # Global styles with Tailwind
```

### Key Files
- **vite.config.ts** — Vite configuration with Tailwind v4 plugin
- **tsconfig.json** — TypeScript configuration
- **tsconfig.app.json** — App-specific TypeScript rules

---

## 📋 Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Replace `npm` with your package manager: `pnpm`, `yarn`, or `bun`.

---

## 🎨 Styling with Tailwind CSS v4

This project uses **Tailwind CSS v4** with the Vite plugin (`@tailwindcss/vite`).

### Key Features
- **Plugin-based** — No `tailwind.config.js` or `postcss.config.js` needed
- **CSS Variables** — Theme colors available as CSS variables
- **Dark Mode** — Built-in dark mode support
- **Animations** — `tw-animate-css` included for advanced animations

### Using Tailwind Classes
```vue
<template>
  <div class="min-h-screen bg-background text-foreground">
    <h1 class="text-4xl font-bold mb-4">Hello World</h1>
  </div>
</template>
```

### Using Theme CSS Variables
```vue
<style scoped>
.custom-box {
  background: var(--background);
  color: var(--foreground);
  border-color: var(--border);
}
</style>
```

### Available Color Variables
```css
--background     /* Page background */
--foreground     /* Text color */
--primary        /* Primary action color */
--secondary      /* Secondary color */
--accent         /* Accent color */
--card           /* Card background */
--border         /* Border color */
--input          /* Input field color */
--ring           /* Focus ring color */
--destructive    /* Destructive action color */
```

---

## 🧩 Adding Components with shadcn/vue

To add pre-built, unstyled components:

### Initialize shadcn/vue (first time only)
```bash
npm dlx shadcn-vue@latest init
```

### Add Components
```bash
# Add individual components
npm dlx shadcn-vue@latest add button card input dialog
```

### Use in Your Vue Components
```vue
<script setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button>Click me</Button>
</template>
```

---

## 🚀 Next Steps

### Add State Management
```bash
npm install pinia
```
[Pinia Documentation](https://pinia.vuejs.org)

### Add Routing
```bash
npm install vue-router
```
[Vue Router Documentation](https://router.vuejs.org)

### Add Testing
```bash
npm install -D vitest @vue/test-utils jsdom
```
[Vitest Documentation](https://vitest.dev)

### Deploy to Production
- **Vercel** — Auto-deploy on git push
- **Netlify** — Connect repository, set build command to `npm run build`
- **GitHub Pages** — Configure `vite.config.ts` with `base: '/repo-name/'`

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Tailwind styles not applying | Verify `src/style.css` imports `@tailwindcss` |
| `@/*` alias not resolving | Check `tsconfig.json` and `vite.config.ts` have the alias configured |
| Dark mode not working | Add `dark` class to `<html>` element in `index.html` |
| HMR not working | Ensure Vite plugins (`vue()` and `tailwindcss()`) are in `vite.config.ts` |
| Module not found errors | Run `npm install` again to install all dependencies |

---

## 📚 Resources

### Official Documentation
- [Vue 3 Guide](https://vuejs.org)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/vue](https://www.shadcn-vue.com)

---

**Built with ❤️ using Vue 3, Vite, and Tailwind CSS v4**
