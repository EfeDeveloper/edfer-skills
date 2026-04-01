---
name: vue-project-scaffolder
description: >
  Scaffold a production-ready Vue 3 project with Vite, Tailwind CSS v4, and shadcn/vue in one command.
  Trigger: When user says "vue project", "create vue project", "new vue project", "scaffold vue", "setup vue", or provides a project name.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Vue Project Scaffolder

Scaffold a complete, production-ready Vue 3 project with Vite, Tailwind CSS v4, and shadcn/vue components configured correctly by default.

## When to Use This

When user says things like:
- "vue project"
- "create vue project"
- "new vue project"
- "scaffold vue"
- "setup vue"
- "vue project my-app"

## How It Works

This skill:
1. Creates a new Vue 3 + TypeScript project using Vite
2. Installs and configures Tailwind CSS v4 (with `@tailwindcss/vite` plugin)
3. Sets up shadcn/vue with initial components
4. Configures TypeScript paths (`@/*` alias)
5. Creates project structure with composables, stores, types folders
6. Generates a starter `App.vue` with working demo
7. Creates `README.md` with quick start guide

**Result**: User runs `{pm} run dev` immediately and sees a working app.

## Critical Patterns

### MUST DO
- **ASK user for package manager** — Never assume or default without asking
- **Adapt ALL commands** to the chosen package manager (pnpm, npm, yarn, or bun)
- **Verify package manager exists** on user's system before proceeding

### Technical
- **Tailwind v4** uses `@tailwindcss/vite` plugin (NOT v3 PostCSS config)
- **Zero manual configuration**: All files pre-configured, ready to edit
- **Official docs reference**: Follows shadcn-vue and Tailwind v4 docs exactly
- **NO `tailwind.config.js`** — v4 is plugin-based only
- **NO `postcss.config.js`** — Vite plugin handles everything

## Code Examples

**Vite config with Tailwind v4 (most critical):**
```typescript
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

**Style imports (only this, no PostCSS):**
```css
@import "tailwindcss";
```

## Information to Gather

**ALWAYS ask the user these questions before starting:**

1. **Project name** (required)
   - "What should the project folder be called?"
   - Example: "my-app", "portfolio", "dashboard"

2. **Package manager** (MUST ASK)
   - "Which package manager do you want to use: **pnpm**, **npm**, **yarn**, or **bun**?"
   - This is CRITICAL — all subsequent commands must be adapted to the chosen manager
   - If user doesn't specify: Check what's available on their system, suggest pnpm as default
   - DO NOT skip this question

3. **shadcn base color** (optional)
   - "What color theme for shadcn components? (Default: Neutral)"
   - Other options: Slate, Rose, Zinc, Stone, Violet
   - If user doesn't specify: Use "Neutral" (most flexible)

## Implementation Summary

**CRITICAL: Adapt ALL commands to the chosen package manager!**

Use the Package Manager Equivalents table below to swap commands. Example:
- If user chose **npm**: Use `npm create vite@latest` instead of `pnpm create vite@latest`
- If user chose **bun**: Use `bun create vite` instead of `pnpm create vite@latest`

Follow these steps in order. See **Package Manager Equivalents** table and **Detailed guide** below.

1. Create Vite project using correct PM
2. Navigate to project: `cd {project-name}`
3. Install Tailwind v4 using correct PM
4. Update `src/style.css` — use [`assets/style.css`](assets/style.css) as template
5. Update `vite.config.ts` — copy from [`assets/vite.config.ts`](assets/vite.config.ts)
6. Update `tsconfig.json` — copy from [`assets/tsconfig.json`](assets/tsconfig.json)
7. Update `tsconfig.app.json` — copy from [`assets/tsconfig.app.json`](assets/tsconfig.app.json)
8. Initialize shadcn using correct PM (interactive, press Enter for defaults)
9. Add components using correct PM
10. Update `App.vue` — use [`assets/App.vue`](assets/App.vue) as template
11. Start dev server using correct PM
12. Verify setup — see Success Criteria section

**For detailed explanations**, see [`references/implementation-guide.md`](references/implementation-guide.md)

## Success Criteria

After all steps complete, verify:

**File Structure:**
- ✅ `vite.config.ts` has `@tailwindcss/vite` plugin and `@/` alias
- ✅ `src/style.css` contains ONLY `@import "tailwindcss";`
- ✅ Both `tsconfig.json` and `tsconfig.app.json` have path alias (`baseUrl` + `paths`)
- ✅ `components.json` exists (created by shadcn init)
- ✅ `src/components/ui/` folder exists with installed components

**Dependencies:**
- ✅ `tailwindcss`, `@tailwindcss/vite` installed
- ✅ `shadcn-vue` set up via init

**Components:**
- ✅ Button, Card, Badge available in `src/components/ui/`
- ✅ Can import: `import { Button } from '@/components/ui/button'`

**Runtime:**
- ✅ Run `pnpm run dev` and see working app
- ✅ App.vue renders with Tailwind styles applied
- ✅ shadcn Button component visible and styled
- ✅ No console errors

**Critical Checks:**
- ✅ **NO** `tailwind.config.js` or `postcss.config.js` (v4 is plugin-based)
- ✅ TypeScript paths work (`@/*` alias resolves correctly)

## Error Handling

If any step fails:
1. Explain what went wrong clearly
2. Show the exact command that failed
3. Suggest fix
4. Ask if user wants to troubleshoot or skip that step

**Common Issues:**

| Problem | Cause | Fix |
|---------|-------|-----|
| `tailwind.config.js` created | Using Tailwind v3 approach | Delete it. v4 uses `@tailwindcss/vite` plugin only |
| Tailwind styles not applied | Missing `@import "tailwindcss"` in style.css | Verify `src/style.css` has ONLY that line |
| `@/*` alias not working | tsconfig paths not set | Check both `tsconfig.json` and `tsconfig.app.json` have `paths` |
| shadcn components not found | Init step skipped | Run `pnpm dlx shadcn-vue@latest init` |
| HMR not working | vite.config missing plugins | Verify both `vue()` and `tailwindcss()` plugins are in config

## Package Manager Equivalents

**NEVER hardcode commands!** Always check which PM the user chose and adapt accordingly.

| Action | pnpm | npm | yarn | bun |
|--------|------|-----|------|-----|
| Create project | `pnpm create vite@latest {name} --template vue-ts` | `npm create vite@latest {name} -- --template vue-ts` | `yarn create vite {name} --template vue-ts` | `bun create vite {name} --template vue-ts` |
| Add dependency | `pnpm add {pkg}` | `npm install {pkg}` | `yarn add {pkg}` | `bun add {pkg}` |
| Add dev dependency | `pnpm add -D {pkg}` | `npm install --save-dev {pkg}` | `yarn add -D {pkg}` | `bun add -D {pkg}` |
| Install Tailwind v4 | `pnpm add tailwindcss @tailwindcss/vite` | `npm install tailwindcss @tailwindcss/vite` | `yarn add tailwindcss @tailwindcss/vite` | `bun add tailwindcss @tailwindcss/vite` |
| Install @types/node | `pnpm add -D @types/node` | `npm install -D @types/node` | `yarn add -D @types/node` | `bun add -D @types/node` |
| Init shadcn | `pnpm dlx shadcn-vue@latest init` | `npx shadcn-vue@latest init` | `yarn dlx shadcn-vue@latest init` | `bun x shadcn-vue@latest init` |
| Add shadcn component | `pnpm dlx shadcn-vue@latest add button` | `npx shadcn-vue@latest add button` | `yarn dlx shadcn-vue@latest add button` | `bun x shadcn-vue@latest add button` |
| Run dev server | `pnpm run dev` | `npm run dev` | `yarn dev` | `bun run dev` |

## Commands (Quick Reference)

**Replace `{pm}` with the user's chosen package manager (pnpm, npm, yarn, bun)**

```bash
# 1. Create Vite project (interactive prompt)
{pm} create vite@latest {project-name} --template vue-ts
cd {project-name}

# 2. Install Tailwind v4 + types
{pm} add tailwindcss @tailwindcss/vite
{pm} add -D @types/node

# 3. Initialize shadcn/vue (interactive prompt)
{pm} dlx shadcn-vue@latest init

# 4. Add essential components
{pm} dlx shadcn-vue@latest add button card badge

# 5. Start development server
{pm} run dev
```

### Examples by Package Manager

**Using pnpm:**
```bash
pnpm create vite@latest my-app --template vue-ts
cd my-app
pnpm add tailwindcss @tailwindcss/vite && pnpm add -D @types/node
pnpm dlx shadcn-vue@latest init
pnpm dlx shadcn-vue@latest add button card badge
pnpm run dev
```

**Using npm:**
```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install tailwindcss @tailwindcss/vite && npm install -D @types/node
npx shadcn-vue@latest init
npx shadcn-vue@latest add button card badge
npm run dev
```

**Using yarn:**
```bash
yarn create vite my-app --template vue-ts
cd my-app
yarn add tailwindcss @tailwindcss/vite && yarn add -D @types/node
yarn dlx shadcn-vue@latest init
yarn dlx shadcn-vue@latest add button card badge
yarn dev
```

**Using bun:**
```bash
bun create vite my-app --template vue-ts
cd my-app
bun add tailwindcss @tailwindcss/vite && bun add -D @types/node
bun x shadcn-vue@latest init
bun x shadcn-vue@latest add button card badge
bun run dev
```

**Note:** The create project and shadcn init steps are interactive — follow the prompts in the console.

## Resources

### Templates (Copy & Use)
- **[assets/vite.config.ts](assets/vite.config.ts)** — Vite configuration with Tailwind v4 and Vue plugins
- **[assets/tsconfig.json](assets/tsconfig.json)** — Root TypeScript config with path aliases
- **[assets/tsconfig.app.json](assets/tsconfig.app.json)** — App TypeScript config with path aliases
- **[assets/style.css](assets/style.css)** — Minimal style.css with Tailwind import
- **[assets/App.vue](assets/App.vue)** — Demo App.vue with working shadcn Button
- **[assets/components.json](assets/components.json)** — shadcn configuration file
- **[assets/README.md](assets/README.md)** — Project README template

### Detailed Guide
- **[references/implementation-guide.md](references/implementation-guide.md)** — Complete step-by-step guide with explanations, troubleshooting, and next steps

### Official Documentation
- [shadcn/vue Installation](https://www.shadcn-vue.com/docs/installation/vite)
- [Tailwind CSS v4 with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Vite Documentation](https://vite.dev)
- [Vue 3 Guide](https://vuejs.org)
