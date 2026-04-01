# Vue + Vite + Tailwind v4 + shadcn/vue — Complete Implementation Guide

This guide provides detailed step-by-step instructions for scaffolding a Vue 3 project with all the components correctly configured.

## Before Starting

**Ask the user:**
1. "Which package manager do you want to use: **pnpm**, **npm**, **yarn**, or **bun**?"
2. "What should your project be called?"
3. "Preferred color theme for shadcn? (default: Neutral)"

Then replace `{pm}` in all commands with their choice:
- **pnpm**: Use `pnpm`, `pnpm add`, `pnpm dlx`, `pnpm run dev`
- **npm**: Use `npm`, `npm install`, `npx`, `npm run dev`
- **yarn**: Use `yarn`, `yarn add`, `yarn dlx`, `yarn dev`
- **bun**: Use `bun`, `bun add`, `bun x`, `bun run dev`

## Prerequisites

- Node.js >= 20.19.0 or >= 22.12.0
- One of: pnpm, npm, yarn, or bun (user's choice)

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
- `src/style.css` — Global styles (needs update)
- `package.json` — Dependencies (will add more)

### Step 2: Install Tailwind CSS v4

Install Tailwind and the Vite plugin using the user's chosen package manager:

**pnpm:**
```bash
pnpm add tailwindcss @tailwindcss/vite
pnpm add -D @types/node
```

**npm:**
```bash
npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
```

**yarn:**
```bash
yarn add tailwindcss @tailwindcss/vite
yarn add -D @types/node
```

**bun:**
```bash
bun add tailwindcss @tailwindcss/vite
bun add -D @types/node
```

**Why `@tailwindcss/vite`?**
- Tailwind v4 uses a **plugin-based** approach
- No `tailwind.config.js` needed
- No `postcss.config.js` needed
- Everything is configured via the Vite plugin

### Step 3: Update src/style.css

Replace the entire content of `src/style.css` with:

```css
@import "tailwindcss";
```

That's it. No PostCSS config, no theme config. The Vite plugin handles everything.

### Step 4: Configure vite.config.ts

Update `vite.config.ts` to include both Vue and Tailwind plugins:

```typescript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

**Key points:**
- `vue()` plugin processes Vue files
- `tailwindcss()` plugin processes Tailwind imports
- `alias` sets up `@` as a shortcut to `./src`
- Use `fileURLToPath` + `import.meta.url` (more reliable than `__dirname`)

### Step 5: Configure TypeScript Paths (tsconfig.json)

Update `tsconfig.json` to add path mapping for the `@/*` alias:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

This enables:
- TypeScript to resolve `@/components/ui/button` correctly
- IDE autocomplete and type checking through the alias

### Step 6: Configure TypeScript Paths (tsconfig.app.json)

Update `tsconfig.app.json` to include the same path mapping:

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Both files need the paths because they serve different purposes:
- `tsconfig.json` — Root config that references others
- `tsconfig.app.json` — App-specific config with the actual rules

### Step 7: Initialize shadcn/vue (Interactive)

Run the shadcn initialization using the user's chosen package manager:

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

Follow the prompts in the console:

| Prompt | Recommended Response |
|--------|----------------------|
| Style | Press Enter (default: "new-york") |
| TypeScript | Press Enter (default: yes) |
| Base Color | Press Enter (default: "neutral") or choose another |
| CSS Variables | Press Enter (default: yes) |
| Other prompts | Press Enter to accept defaults |

**What gets created:**
- `components.json` — shadcn configuration
- `src/components/ui/` — Directory for UI components
- `src/lib/utils.ts` — Utility functions for components

### Step 8: Add Essential Components

Install the most commonly used shadcn components using the user's chosen package manager:

**pnpm:**
```bash
pnpm dlx shadcn-vue@latest add button card badge
```

**npm:**
```bash
npx shadcn-vue@latest add button card badge
```

**yarn:**
```bash
yarn dlx shadcn-vue@latest add button card badge
```

**bun:**
```bash
bun x shadcn-vue@latest add button card badge
```

This creates:
- `src/components/ui/button/` — Button component
- `src/components/ui/card/` — Card component
- `src/components/ui/badge/` — Badge component

Each can be imported like:
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
```

### Step 9: Update App.vue

Replace `src/App.vue` with a working example:

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="min-h-screen bg-background">
    <main class="container mx-auto py-8 px-4">
      <h1 class="text-4xl font-bold mb-4">Welcome to Vue 3 + Vite</h1>
      <p class="text-muted-foreground mb-6">
        Vue 3 + Vite + Tailwind CSS v4 + shadcn/vue
      </p>
      <Button>Get Started</Button>
    </main>
  </div>
</template>
```

**What's happening:**
- `<div class="min-h-screen bg-background">` — Full-height container with Tailwind classes
- `<h1 class="text-4xl font-bold mb-4">` — Tailwind typography
- `<Button>` — shadcn component with theme integration
- `text-muted-foreground` — Tailwind color from shadcn's CSS variables

### Step 10: Create Folder Structure (Optional)

For better organization, create these folders:

```bash
mkdir -p src/{composables,stores,types,lib,__tests__}
```

**Folder purposes:**
- `components/ui/` — shadcn components (auto-created)
- `components/sections/` — Your custom components
- `composables/` — Vue composables (reusable logic)
- `stores/` — Pinia stores (if using state management)
- `types/` — TypeScript type definitions
- `lib/` — Utility functions
- `__tests__/` — Unit tests

### Step 11: Start Development Server

Run the dev server using the user's chosen package manager:

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
  VITE v{version}  ready in {ms} ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Open `http://localhost:5173/` in your browser.

**You should see:**
- ✅ "Welcome to Vue 3 + Vite" heading in Tailwind styles
- ✅ A styled Button component
- ✅ No console errors
- ✅ HMR (Hot Module Replacement) working — edit App.vue and see changes instantly

## Verification Checklist

After all steps, verify:

**Files exist:**
- ✅ `vite.config.ts` with `@tailwindcss/vite` plugin
- ✅ `src/style.css` with only `@import "tailwindcss";`
- ✅ `tsconfig.json` and `tsconfig.app.json` with path aliases
- ✅ `components.json` from shadcn init
- ✅ `src/components/ui/` folder with Button, Card, Badge

**No unwanted files:**
- ✅ NO `tailwind.config.js` (that's Tailwind v3)
- ✅ NO `postcss.config.js` (Vite plugin handles it)
- ✅ NO old CSS reset files

**Dependencies installed:**
- ✅ `tailwindcss@4.x.x`
- ✅ `@tailwindcss/vite@4.x.x`
- ✅ `vue@3.x.x`
- ✅ `shadcn-vue` (in components.json)

**Runtime working:**
- ✅ `pnpm run dev` starts without errors
- ✅ App renders with Tailwind styles
- ✅ Button component is visible and styled
- ✅ HMR works (edit, save, see changes instantly)
- ✅ TypeScript paths work (no "@/components" resolution errors)

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| "Module not found: @/components/ui/button" | TypeScript paths not configured | Check both `tsconfig.json` and `tsconfig.app.json` have `paths` |
| Tailwind styles not applied | Missing or wrong `@import "tailwindcss"` | Verify `src/style.css` has ONLY that line |
| `tailwind.config.js` created | Vite config missing `@tailwindcss/vite` | Delete the file, use plugin in vite.config.ts instead |
| HMR not working | Plugin order wrong | Ensure `vue()` and `tailwindcss()` are in the right order in plugins array |
| shadcn components not found | `shadcn-vue init` not run | Run `pnpm dlx shadcn-vue@latest init` |
| "Cannot find module @vitejs/plugin-vue" | Missing dependency | Run `pnpm add -D @vitejs/plugin-vue` |

## Next Steps

After setup:

### Add More Components
```bash
pnpm dlx shadcn-vue@latest add input form dialog
```

### Add State Management (Pinia)
```bash
pnpm add pinia
```

### Add Routing (Vue Router)
```bash
pnpm add vue-router
```

### Add Testing
```bash
pnpm add -D vitest @vue/test-utils
```

### Add Linting
```bash
pnpm add -D eslint @vue/eslint-config-typescript
```

## References

- [shadcn/vue Installation Guide](https://www.shadcn-vue.com/docs/installation/vite)
- [Tailwind CSS v4 Vite Setup](https://tailwindcss.com/docs/installation/using-vite)
- [Vite Documentation](https://vite.dev)
- [Vue 3 Guide](https://vuejs.org)
