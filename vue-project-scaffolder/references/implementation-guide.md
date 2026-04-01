# Vue + Vite + Tailwind v4 — Complete Implementation Guide

This guide provides detailed step-by-step instructions for scaffolding a Vue 3 project with all the components correctly configured.

## Before Starting

**Ask the user:**
1. "Which package manager do you want to use: **pnpm**, **npm**, **yarn**, or **bun**?"
2. "What should your project be called?"
3. "Preferred color theme for shadcn? (default: Neutral)" — *optional, for later*

Then replace `{pm}` in all commands with their choice:
- **pnpm**: Use `pnpm`, `pnpm add`, `pnpm dlx`, `pnpm run dev`
- **npm**: Use `npm`, `npm install`, `npx`, `npm run dev`
- **yarn**: Use `yarn`, `yarn add`, `yarn dlx`, `yarn dev`
- **bun**: Use `bun`, `bun add`, `bun x`, `bun run dev`

## Prerequisites

- Node.js >= 20.19.0 or >= 22.12.0
- One of: pnpm, npm, yarn, or bun (user's choice)

---

## Step-by-Step Installation

### Step 1: Create Vite Project (Interactive)

Run the Vite scaffolder using the user's chosen package manager:

**pnpm:**
```bash
pnpm create vite@latest {project-name} --template vue-ts
```

**npm:**
```bash
npm create vite@latest {project-name} -- --template vue-ts
```

**yarn:**
```bash
yarn create vite {project-name} --template vue-ts
```

**bun:**
```bash
bun create vite {project-name} --template vue-ts
```

When prompted in the console:
- Select **Vue** from the framework list
- Select **TypeScript** from the variant options
- Wait for scaffolding to complete

Then navigate to the project:

```bash
cd {project-name}
```

**What was created:**
- `vite.config.ts` — Vite configuration (needs update)
- `src/main.ts` — Application entry point
- `src/App.vue` — Root component (needs update)
- `tsconfig.json` — TypeScript config (needs update)
- `tsconfig.app.json` — App TypeScript config (needs update)
- `tsconfig.node.json` — Node TypeScript config (keep as is)
- `src/style.css` — Global styles (needs update)
- `package.json` — Dependencies (will add more)

---

### Step 2: Install Dependencies

Install Tailwind v4, utilities, and supporting libraries:

**pnpm:**
```bash
pnpm add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next
pnpm add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc
```

**npm:**
```bash
npm install tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next
npm install -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc
```

**yarn:**
```bash
yarn add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next
yarn add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc
```

**bun:**
```bash
bun add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next
bun add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc
```

**Why these packages?**
- `tailwindcss` — Core Tailwind CSS v4
- `@tailwindcss/vite` — Vite plugin (v4 plugin-based approach)
- `clsx` — Conditional class names (utility for components)
- `class-variance-authority` — Variant management (used by shadcn)
- `tailwind-merge` — Merge Tailwind classes intelligently
- `lucide-vue-next` — Icon library (integrates with shadcn)
- `@types/node` — TypeScript types for Node APIs
- `tw-animate-css` — Advanced animations for Tailwind
- `typescript` — Type-safe development
- `vite` — Build tool and dev server
- `@vitejs/plugin-vue` — Vue support for Vite
- `@vue/tsconfig` — Vue TypeScript configuration
- `vite-plugin-vue-devtools` — Vue DevTools integration (browser extension)
- `vue-tsc` — TypeScript type checking for Vue

---

### Step 3: Update vite.config.ts

Replace the entire `vite.config.ts` with:

```typescript
import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Key points:**
- `vue()` plugin processes Vue files
- `tailwindcss()` plugin processes Tailwind imports (v4 plugin-based)
- `alias: '@'` allows imports like `import Foo from '@/components/Foo.vue'`
- `path.resolve(__dirname)` — More reliable than `fileURLToPath` for CommonJS-style syntax

---

### Step 4: Update src/style.css

Replace the entire content of `src/style.css` with:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**What's happening:**
- `@import "tailwindcss"` — Core Tailwind CSS v4
- `@import "tw-animate-css"` — Advanced animations
- `@custom-variant dark` — Dark mode support
- `@theme inline` — Define CSS variable mappings
- `:root` — Light mode colors in oklch format
- `.dark` — Dark mode overrides
- `@layer base` — Global element styles

---

### Step 5: Configure TypeScript Paths (tsconfig.json)

Update `tsconfig.json` to add path mapping:

```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Why?**
- `baseUrl: "."` — Resolve paths from project root
- `paths` — Enable `@/` alias for imports

---

### Step 6: Configure TypeScript Paths (tsconfig.app.json)

Update `tsconfig.app.json` to match:

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "types": ["vite/client"],

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

**Key additions:**
- `tsBuildInfoFile` — Incremental builds cache
- `types: ["vite/client"]` — Vite type definitions
- Strict linting rules enabled
- Same path mapping as root tsconfig

---

### Step 7: Update src/App.vue

Replace `src/App.vue` with:

```vue
<script setup lang="ts">

</script>

<template>
  <main class="relative place-items-center grid bg-slate-950 px-6 min-h-screen overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),transparent_35%),radial-gradient(circle_at_bottom,rgba(249,115,22,0.18),transparent_30%)]" />
    <div class="top-1/2 left-1/2 absolute bg-cyan-400/10 blur-3xl rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2" />

    <section class="relative flex flex-col items-center max-w-5xl text-center">
      <span class="bg-white/5 backdrop-blur-sm mb-5 px-4 py-1.5 border border-white/10 rounded-full font-semibold text-slate-300 text-xs uppercase tracking-[0.35em]">
        Vue + Tailwind v4
      </span>

      <h1 class="font-black text-white lg:text-[7rem] text-5xl sm:text-7xl md:text-8xl uppercase leading-none tracking-[0.16em]">
        <span class="block">Vue Project</span>
        <span class="block bg-clip-text bg-linear-to-r from-cyan-300 via-white to-amber-300 mt-2 text-transparent">
          Scaffolder
        </span>
      </h1>

      <div class="bg-linear-to-r from-transparent via-cyan-300 to-transparent opacity-80 mt-8 w-28 h-px" />
    </section>
  </main>
</template>
```

**Features:**
- Responsive design with Tailwind utilities
- Gradient backgrounds with radial gradients
- Modern typography with custom tracking
- Works on all screen sizes (mobile to desktop)

---

### Step 8: Update package.json (Optional)

Update the scripts section for a better development experience:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --build"
  }
}
```

---

### Step 9: (Optional) Initialize shadcn/vue

If you want to add high-quality pre-built components:

**pnpm:**
```bash
pnpm dlx shadcn-vue@latest init
```

**npm:**
```bash
npx shadcn-vue@latest init
```

**yarn:**
```bash
yarn dlx shadcn-vue@latest init
```

**bun:**
```bash
bun x shadcn-vue@latest init
```

When prompted:
- Accept default style: **new-york**
- Select base color: **neutral** (or your preference)
- Accept all other defaults by pressing Enter

This creates:
- `components.json` — shadcn configuration
- `src/components/ui/` — Directory for UI components

#### Adding Components
```bash
{pm} dlx shadcn-vue@latest add button card input
```

Then use in your Vue components:
```vue
<script setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button>Click Me</Button>
</template>
```

---

### Step 10: Start Development Server

Run the development server:

**pnpm:**
```bash
pnpm run dev
```

**npm:**
```bash
npm run dev
```

**yarn:**
```bash
yarn dev
```

**bun:**
```bash
bun run dev
```

You should see:
```
  VITE v8.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**You should see:**
- ✅ Beautiful gradient background
- ✅ "Vue Project Scaffolder" heading with gradient text
- ✅ Responsive design (try resizing)
- ✅ No console errors
- ✅ HMR working (edit App.vue, see changes instantly)

---

## Verification Checklist

After all steps, verify:

**Files exist and correct:**
- ✅ `vite.config.ts` has `vue()` and `tailwindcss()` plugins
- ✅ `vite.config.ts` uses `path.resolve(__dirname, './src')` for alias
- ✅ `src/style.css` imports `@tailwindcss` and `@import "tw-animate-css"`
- ✅ `tsconfig.json` and `tsconfig.app.json` have path aliases (`@/*`)
- ✅ `src/App.vue` has responsive gradient design

**Dependencies installed:**
- ✅ `tailwindcss@4.2.2`
- ✅ `@tailwindcss/vite@4.2.2`
- ✅ `clsx`, `class-variance-authority`, `tailwind-merge`, `lucide-vue-next`
- ✅ `tw-animate-css`
- ✅ `@types/node`

**Runtime working:**
- ✅ `{pm} run dev` starts without errors
- ✅ App renders with gradient and styling
- ✅ Responsive on mobile, tablet, desktop
- ✅ No console errors or TypeScript issues
- ✅ HMR works (edit, save, see changes instantly)

**Critical (should NOT exist):**
- ✅ **NO** `tailwind.config.js` (v4 is plugin-based)
- ✅ **NO** `postcss.config.js` (Vite plugin handles it)

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Tailwind styles not applied | Missing `@import "tailwindcss"` | Verify `src/style.css` has both imports |
| `@/*` alias not working | tsconfig paths missing | Check BOTH `tsconfig.json` and `tsconfig.app.json` |
| HMR not working | Missing plugins in vite.config | Verify `vue()` and `tailwindcss()` plugins are present |
| Dark mode not working | Class not applied to html | Add `dark` class to `<html>` element |
| `tw-animate-css` not working | Import missing from style.css | Verify `@import "tw-animate-css"` is in `src/style.css` |
| Module not found errors | Dependencies not installed | Run `{pm} install` again |

---

## Next Steps

### Add State Management
```bash
{pm} add pinia
```

### Add Routing
```bash
{pm} add vue-router
```

### Add Testing
```bash
{pm} add -D vitest @vue/test-utils jsdom
```

### Add ESLint & Prettier
```bash
{pm} add -D eslint prettier eslint-plugin-vue
```

### Deploy to Vercel
```bash
# vercel.json
{
  "buildCommand": "{pm} run build",
  "outputDirectory": "dist"
}
```

---

## Resources

- [Vue 3 Documentation](https://vuejs.org)
- [Vite Guide](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation/using-vite)
- [shadcn/vue](https://www.shadcn-vue.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
