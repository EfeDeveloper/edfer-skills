# Available AI Agent Skills

This file catalogs all available AI agent skills in this repository. Use these skills with Claude Code, Cursor, Windsurf, and other AI agents.

## Skills Registry

| Skill Name | Description | Version | Installation |
|------------|-------------|---------|---------------|
| **vue-project-scaffolder** | Scaffold production-ready Vue 3 projects with Vite, Tailwind CSS v4, and shadcn/vue. Automatically configures everything, validates dependencies. | 1.0 | `npx skills add https://github.com/EfeDeveloper/edfer-skills --skill vue-project-scaffolder` |

[View SKILL.md](vue-project-scaffolder/SKILL.md)

## Installation

### Install a Specific Skill

#### Vue Project Scaffolder
```bash
npx skills add https://github.com/EfeDeveloper/edfer-skills --skill vue-project-scaffolder
```

### Install All Skills
```bash
npx skills add EfeDeveloper/edfer-skills
```

## How to Use

### Trigger the Skill
Once installed, use with your AI agent:

**In Claude Code, Cursor, Windsurf:**
```bash
# Just describe what you want:
"create vue project my-app"
"new vue project"
"scaffold vue project dashboard"
```

The skill will automatically:
1. Create Vite project with Vue 3 + TypeScript
2. Install Tailwind CSS v4 and all dependencies
3. Configure all files (vite.config.ts, tsconfig.json, style.css, App.vue)
4. Validate minimum dependencies
5. Report when project is ready

**Then you run:**
```bash
cd my-app
npm run dev  # or pnpm, yarn, bun
```

## Contributing

To add a new skill:

1. Create a directory: `skills/{skill-name}/`
2. Write `SKILL.md` following the [Agent Skills Specification](CLAUDE.md#skill-structure)
3. Add optional `assets/` and `references/` directories
4. Register the skill here in `AGENTS.md`

See [CLAUDE.md](CLAUDE.md) for detailed skill creation guidelines.

## Skill Structure

```
skills/{skill-name}/
├── SKILL.md                 # Main skill definition
├── assets/                  # Templates, configs, examples
└── references/              # Detailed guides and documentation
```

## License

All skills in this repository are licensed under Apache-2.0 unless otherwise specified.
