# Vue Project Scaffolder - Automation Scripts

This document describes the automated setup scripts that ensure complete, error-free Vue 3 + Tailwind v4 project configuration.

## Scripts Overview

### 1. `scripts/setup.js` — Automated Setup Orchestrator

**Purpose**: Single-command setup for entire project configuration

**What it does:**
1. Copies all configuration files from `assets/` to the project
2. Removes files that shouldn't exist in Tailwind v4 (tailwind.config.js, postcss.config.js)
3. Validates all dependencies against minimum required versions
4. Automatically upgrades outdated packages
5. Performs final verification checklist

**Cross-platform**: Works on macOS, Linux, and Windows
**Dependencies**: None (uses only Node.js built-in modules)

**Usage:**
```bash
node scripts/setup.js <project-dir> <package-manager>
```

**Parameters:**
- `<project-dir>` — Full path to the newly created Vue project
- `<package-manager>` — One of: `bun`, `npm`, `pnpm`, `yarn`

**Example:**
```bash
node scripts/setup.js /Users/edfer/Projects/my-vue-app bun
node scripts/setup.js ./calculadora-impresiones-3d npm
```

**Output Example:**
```
🚀 Vue Project Scaffolder - Setup
Project: /Users/edfer/Projects/my-vue-app
Package Manager: bun

📋 Step 1: Copying configuration files...
  ✅ vite.config.ts
  ✅ tsconfig.json
  ✅ tsconfig.app.json
  ✅ tsconfig.node.json
  ✅ style.css
  ✅ App.vue
  ✅ README.md
✅ Configuration files copied

🧹 Step 2: Cleaning up incompatible files...

📦 Step 3: Validating and upgrading dependencies...
📦 Validating Dependencies
🔍 Production Dependencies:
  ✅ vue (^3.5.31)
  ✅ tailwindcss (^4.2.2)
  ...

🔍 Step 4: Final verification...
  ✅ vite.config.ts
  ✅ tsconfig.json
  ✅ tsconfig.app.json
  ✅ src/style.css
  ✅ src/App.vue
  ✅ README.md
  ✅ No tailwind.config.js (correct for v4)

════════════════════════════════════════
✅ SETUP COMPLETE!
════════════════════════════════════════

📝 Next steps:
  1. cd /Users/edfer/Projects/my-vue-app
  2. bun run dev
  3. Open http://localhost:5173

📚 To add shadcn/vue components:
  bun dlx shadcn-vue@latest init
```

### 2. `scripts/validate-deps.js` — Dependency Validator

**Purpose**: Ensure all dependencies meet minimum version requirements

**What it does:**
1. Reads `package.json` from the project
2. Compares installed versions against minimum requirements
3. Reports missing dependencies (hard error, prevents setup)
4. Reports outdated dependencies (warning, can be auto-upgraded)
5. Automatically upgrades packages to minimum versions
6. Provides clear, colored output for each dependency

**Cross-platform**: Works on macOS, Linux, and Windows
**Dependencies**: None (uses only Node.js built-in modules)

**Usage:**
```bash
node scripts/validate-deps.js <project-dir> <package-manager>
```

**Parameters:**
- `<project-dir>` — Path to the Vue project
- `<package-manager>` — Package manager in use: `bun`, `npm`, `pnpm`, `yarn`

**Example:**
```bash
node scripts/validate-deps.js /Users/edfer/Projects/my-vue-app bun
```

**Output Example:**
```
📦 Validating Dependencies

🔍 Production Dependencies:
  ✅ vue (^3.5.31)
  ✅ tailwindcss (^4.2.2)
  ✅ @tailwindcss/vite (^4.2.2)
  ✅ clsx (^2.1.1)
  ✅ class-variance-authority (^0.7.1)
  ✅ tailwind-merge (^3.5.0)
  ✅ lucide-vue-next (^1.0.0)

🔍 Development Dependencies:
  ✅ typescript (^6.0.2)
  ✅ vite (^8.0.3)
  ✅ @vitejs/plugin-vue (^6.0.5)
  ✅ @vue/tsconfig (^0.9.1)
  ✅ @types/node (^25.5.0)
  ✅ tw-animate-css (^1.4.0)
  ✅ vite-plugin-vue-devtools (^8.1.1)
  ✅ vue-tsc (^3.2.6)

════════════════════════════════════════
✅ All dependencies validated and ready
════════════════════════════════════════
```

## Minimum Required Versions

### Production Dependencies
```json
{
  "vue": "3.5.30",
  "tailwindcss": "4.2.2",
  "@tailwindcss/vite": "4.2.2",
  "clsx": "2.1.1",
  "class-variance-authority": "0.7.1",
  "tailwind-merge": "3.5.0",
  "lucide-vue-next": "1.0.0"
}
```

### Development Dependencies
```json
{
  "typescript": "5.9.3",
  "vite": "8.0.1",
  "@vitejs/plugin-vue": "6.0.5",
  "@vue/tsconfig": "0.9.0",
  "@types/node": "24.12.0",
  "tw-animate-css": "1.4.0",
  "vite-plugin-vue-devtools": "8.0.7",
  "vue-tsc": "3.2.5"
}
```

## Integration with SKILL.md

The `SKILL.md` file instructs agents to:

1. Create the Vite project
2. Install dependencies
3. **Run `node scripts/setup.js`** — this orchestrates everything automatically
4. Report success to user

All manual steps (file copying, validation, upgrades) are eliminated.

## Error Handling

### Missing Dependencies
```
❌ Critical: Some required dependencies are missing!
Run the following commands to install them:
  bun add vue tailwindcss @tailwindcss/vite clsx ...
  bun add -D typescript vite @vitejs/plugin-vue ...
```

### Outdated Versions
```
⚠️  Found 2 package(s) to upgrade:

  Upgrading tailwindcss to 4.2.2...
  ✅ tailwindcss upgraded

  Upgrading vite to 8.0.1...
  ✅ vite upgraded
```

### File Copy Errors
```
❌ Error: Source file not found: /path/to/assets/vite.config.ts

setup.js will exit with error code 1.
```

## Technical Details

### Version Comparison Logic

- Parses semantic versioning (major.minor.patch)
- Strips leading symbols (^, ~, >, =)
- Compares numerically: v1.2.3 vs v1.2.4
- Rejects versions that don't meet minimum (exits with code 1)

### File Validation

- Checks that all required config files exist after copy
- Verifies that Tailwind v4 incompatible files are removed
- Uses colored output for easy scanning: ✅ success, ❌ error, ⚠️ warning

### Cross-Platform Support

- **macOS**: Works natively ✅
- **Linux**: Works natively ✅
- **Windows**: Works natively (no Git Bash or WSL needed) ✅
- Uses only Node.js built-in modules (fs, path, child_process)
- Package manager commands adapted for each: `bun`, `npm`, `pnpm`, `yarn`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `node: command not found` | Install Node.js 18+ from https://nodejs.org |
| `ENOENT: no such file or directory` | Verify project directory path is correct and exists |
| `package.json not found` | Make sure the Vite project was created successfully |
| `setup.js not found` | Run node with the correct path: `node scripts/setup.js` |
| `validate-deps.js not found` | Ensure you're running setup.js from the skill root directory |
| Dependencies won't upgrade | Check internet connection, try manual: `bun update {package}` |

## Future Enhancements

- [ ] Auto-create additional folders (components/, composables/, lib/, types/)
- [ ] Optional interactive mode to customize colors/theme
- [ ] Generate initial component templates
- [ ] Setup git hooks (husky, lint-staged)
- [ ] Auto-init shadcn/vue (with user consent)
