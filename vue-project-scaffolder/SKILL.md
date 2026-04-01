---
name: vue-project-scaffolder
description: >
  Automatically scaffold and validate a production-ready Vue 3 project with Vite, Tailwind CSS v4, and shadcn/vue integration.
license: Apache-2.0
metadata:
  author: EfeDeveloper
  version: "2.0"
  compliance: "Agent Skills v2"
---

# Vue Project Scaffolder

Guide the user through setting up a production-ready Vue 3 project with Vite, Tailwind CSS v4, and shadcn/vue. Validate configurations and dependencies as they progress.

## When to Use This

When user says things like:
- "vue project"
- "create vue project"
- "new vue project"
- "scaffold vue"
- "setup vue"
- "vue project my-app"

## How It Works

This skill **automatically creates and configures** a production-ready Vue 3 project:

1. **Creates Vite project** — Runs `{pm} create vite@latest {name} --template vue-ts`
2. **Installs dependencies** — Adds Tailwind v4, utilities, and all required packages
3. **Configures files** — Updates vite.config.ts, tsconfig.json, style.css, App.vue, etc.
4. **Validates dependencies** — Checks package.json has all minimum required packages
5. **Does NOT run dev server or init shadcn** — Project is fully configured, user decides next steps

**Result**: A fully set up, ready-to-develop Vue 3 + Tailwind v4 project. User can immediately run `{pm} run dev` or optionally add shadcn components.

## Critical Patterns

### MUST DO (Non-negotiable)
- **ASK user for project name** — Required for project creation
- **ASK user for package manager** — Never assume or default without asking
- **EXECUTE all commands automatically** — Don't just guide, actually run them
- **Verify package manager exists** on user's system before proceeding
- **Validate dependencies BEFORE saying "done"** — Check package.json against minimum requirements
- **DO NOT run `npm run dev`** — User runs the dev server themselves after validation

### Minimum Dependencies (Must Validate)
**dependencies:**
- vue >= 3.5.30
- tailwindcss >= 4.2.2
- @tailwindcss/vite >= 4.2.2
- clsx >= 2.1.1
- class-variance-authority >= 0.7.1
- tailwind-merge >= 3.5.0
- lucide-vue-next >= 1.0.0

**devDependencies:**
- typescript >= 5.9.3
- vite >= 8.0.1
- @vitejs/plugin-vue >= 6.0.5
- @vue/tsconfig >= 0.9.0
- @types/node >= 24.12.0
- tw-animate-css >= 1.4.0
- vite-plugin-vue-devtools >= 8.0.7
- vue-tsc >= 3.2.5

### Technical
- **Tailwind v4** uses `@tailwindcss/vite` plugin (NOT v3 PostCSS config)
- **Zero manual configuration**: All files pre-configured, ready to edit
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

3. **shadcn** (optional, for later)
   - Ask: "Do you want to add shadcn/vue components? (Optional, can add later)"
   - If yes: Document the init command for them to run after project setup
   - If no: Skip — user can add components anytime with `{pm} dlx shadcn-vue@latest init`

## Implementation Summary

**YOU (the agent) EXECUTE these steps. User does NOT run commands manually.**

Adapt ALL commands to the chosen package manager. Use the **Package Manager Equivalents** table below.

### Execution Steps (Agent Runs These)

1. Verify prerequisites (Node.js >= 20.19.0, package manager available)
2. **EXECUTE:** Create Vite project: `{pm} create vite@latest {project-name} --template vue-ts`
3. **EXECUTE:** Navigate: `cd {project-name}`
4. **EXECUTE:** Install dependencies: `{pm} add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next`
5. **EXECUTE:** Install dev dependencies: `{pm} add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vue-tsc`
6. **EXECUTE:** Copy and update files:
   - Copy [`assets/vite.config.ts`](assets/vite.config.ts) → `vite.config.ts`
   - Copy [`assets/tsconfig.json`](assets/tsconfig.json) → `tsconfig.json`
   - Copy [`assets/tsconfig.app.json`](assets/tsconfig.app.json) → `tsconfig.app.json`
   - Copy [`assets/style.css`](assets/style.css) → `src/style.css`
   - Copy [`assets/App.vue`](assets/App.vue) → `src/App.vue`
7. **VALIDATE:** Check `package.json` has all minimum required dependencies (see Critical Patterns)
8. **DO NOT EXECUTE:** 
   - Do NOT run `{pm} run dev` — user will do this themselves
   - Do NOT run `shadcn-vue init` — if user wants it, they'll add components later
9. **Report:** Show user where project is and how to run it (and optional shadcn next step)

**For detailed explanations**, see [`references/implementation-guide.md`](references/implementation-guide.md)

## Success Criteria

**BEFORE saying "done", validate EVERY item below:**

### File Structure
- ✅ `vite.config.ts` exists with `@tailwindcss/vite` plugin and `@/` alias
- ✅ `src/style.css` exists with `@import "tailwindcss"` and `@import "tw-animate-css"`
- ✅ Both `tsconfig.json` and `tsconfig.app.json` have path alias (`baseUrl` + `paths`)
- ✅ `src/App.vue` exists with gradient content

### Dependencies in package.json
**Check these MUST be in dependencies:**
- ✅ vue >= 3.5.30
- ✅ tailwindcss >= 4.2.2
- ✅ @tailwindcss/vite >= 4.2.2
- ✅ clsx >= 2.1.1
- ✅ class-variance-authority >= 0.7.1
- ✅ tailwind-merge >= 3.5.0
- ✅ lucide-vue-next >= 1.0.0

**Check these MUST be in devDependencies:**
- ✅ typescript >= 5.9.3
- ✅ vite >= 8.0.1
- ✅ @vitejs/plugin-vue >= 6.0.5
- ✅ @vue/tsconfig >= 0.9.0
- ✅ @types/node >= 24.12.0
- ✅ tw-animate-css >= 1.4.0
- ✅ vite-plugin-vue-devtools >= 8.0.7
- ✅ vue-tsc >= 3.2.5

### Critical (Should NOT exist)
- ✅ **NO** `tailwind.config.js` (v4 is plugin-based)
- ✅ **NO** `postcss.config.js` (Vite plugin handles it)

### Project Ready
- ✅ User can navigate to project folder
- ✅ User can run `{pm} run dev` to start development
- ✅ All files copied correctly from assets
- ✅ `node_modules/` has all packages installed

## Error Handling

**CRITICAL: Do NOT say "done" if any of these fail. Fix the issue first.**

### Step Failures
If any step fails:
1. Explain what went wrong clearly
2. Show the exact command that failed
3. Suggest fix or troubleshooting steps
4. Retry or ask user if they want to continue

### Dependency Validation Failure
**If `package.json` is missing ANY minimum dependency:**
1. ❌ DO NOT say "project is ready"
2. Check what's missing: `{pm} list`
3. Install missing packages: `{pm} add {missing-package}`
4. Re-validate package.json
5. Only say "done" when ALL dependencies are present

### Common Issues

| Problem | Solution |
|---------|----------|
| Package manager not found | Check if `which pnpm`, `which npm`, etc. work. Ask user to install. |
| Permission denied during creation | Try `sudo` or check folder permissions. |
| Vite creation hangs | Ctrl+C and retry with `--force` flag if needed. |
| Dependencies installation fails | Check internet connection, retry with `--legacy-peer-deps` if npm. |
| Missing minimum dependencies | Install manually: `{pm} add {package}@{version}` |
| `tailwind.config.js` accidentally created | Delete it. v4 uses plugin-based config. |
| Configuration file won't copy | Check file permissions and disk space. |

## Package Manager Equivalents

**NEVER hardcode commands!** Always check which PM the user chose and adapt accordingly.

| Action | pnpm | npm | yarn | bun |
|--------|------|-----|------|-----|
| Create project | `pnpm create vite@latest {name} --template vue-ts` | `npm create vite@latest {name} -- --template vue-ts` | `yarn create vite {name} --template vue-ts` | `bun create vite {name} --template vue-ts` |
| Add dependency | `pnpm add {pkg}` | `npm install {pkg}` | `yarn add {pkg}` | `bun add {pkg}` |
| Add dev dependency | `pnpm add -D {pkg}` | `npm install --save-dev {pkg}` | `yarn add -D {pkg}` | `bun add -D {pkg}` |
| Install Tailwind v4 | `pnpm add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next` | `npm install tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next` | `yarn add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next` | `bun add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next` |
| Install dev tools | `pnpm add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc` | `npm install -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc` | `yarn add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc` | `bun add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc` |
| Init shadcn | `pnpm dlx shadcn-vue@latest init` | `npx shadcn-vue@latest init` | `yarn dlx shadcn-vue@latest init` | `bun x shadcn-vue@latest init` |
| Add shadcn component | `pnpm dlx shadcn-vue@latest add button` | `npx shadcn-vue@latest add button` | `yarn dlx shadcn-vue@latest add button` | `bun x shadcn-vue@latest add button` |
| Run dev server | `pnpm run dev` | `npm run dev` | `yarn dev` | `bun run dev` |

## Commands (Agent Executes These)

**AGENT: Replace `{pm}` with the user's chosen package manager and EXECUTE each command**

### 1. Create Project
```bash
{pm} create vite@latest {project-name} --template vue-ts
cd {project-name}
```

### 2. Install Dependencies
```bash
{pm} add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next
{pm} add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc
```

### 3. Update Configuration Files (Copy from assets)
```bash
# Copy these files from the skill assets:
# assets/vite.config.ts        → {project-name}/vite.config.ts
# assets/tsconfig.json         → {project-name}/tsconfig.json
# assets/tsconfig.app.json     → {project-name}/tsconfig.app.json
# assets/style.css             → {project-name}/src/style.css
# assets/App.vue               → {project-name}/src/App.vue
```

### 4. Validate Dependencies
```bash
# Read package.json and verify all minimum dependencies are present
# See "Success Criteria" section above for required versions
```

### 5. STOP HERE - Do NOT Run Dev Server
**DO NOT execute `npm run dev` or equivalent**

The user will run it themselves:
```bash
cd {project-name}
{pm} run dev
```

### Examples by Package Manager

**Using pnpm:**
```bash
pnpm create vite@latest my-app --template vue-ts
cd my-app
pnpm add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next
pnpm add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc
# Copy config files from assets
pnpm run dev
```

**Using npm:**
```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next
npm install -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc
# Copy config files from assets
npm run dev
```

**Using yarn:**
```bash
yarn create vite my-app --template vue-ts
cd my-app
yarn add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next
yarn add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc
# Copy config files from assets
yarn dev
```

**Using bun:**
```bash
bun create vite my-app --template vue-ts
cd my-app
bun add tailwindcss @tailwindcss/vite clsx class-variance-authority tailwind-merge lucide-vue-next
bun add -D @types/node tw-animate-css typescript vite @vitejs/plugin-vue @vue/tsconfig vite-plugin-vue-devtools vue-tsc
# Copy config files from assets
bun run dev
```

**Note:** The create project step is interactive — follow the prompts in the console.

---

## Final Report (What to Tell User)

After completing all steps and validating dependencies, provide this summary:

```
✅ PROJECT CREATED AND CONFIGURED

Project Name: {project-name}
Location: {project-path}
Package Manager: {pm}

📦 Dependencies Installed:
- Vue 3 (3.5.30+)
- Vite (8.0.1+)
- Tailwind CSS v4 (4.2.2+) with @tailwindcss/vite plugin
- TypeScript (5.9.3+)
- All utilities: clsx, tailwind-merge, lucide-vue-next, tw-animate-css

🎨 Configuration:
- vite.config.ts ✅
- tsconfig.json with @ alias ✅
- tsconfig.app.json with strict rules ✅
- src/style.css with Tailwind imports ✅
- src/App.vue with demo component ✅

⚡ Next Steps:
1. Open your terminal
2. Navigate to the project: cd {project-name}
3. Start development server: {pm} run dev
4. Open http://localhost:5173 in your browser

📚 Optional Next Steps:
- **Add shadcn components:** `{pm} dlx shadcn-vue@latest init` (then add individual components)
- **Add state management:** `{pm} add pinia`
- **Add routing:** `{pm} add vue-router`

**IMPORTANT:**
- ✅ All minimum dependencies are validated and installed
- ✅ Project is ready to develop immediately
- ✅ Tailwind v4 is already configured (NO extra config needed)
- ❌ Do NOT run `{pm} run dev` — user will do this themselves
- ℹ️ Point user to the README.md in the project for detailed next steps

---

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
