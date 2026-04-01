# edfer-skills

A collection of AI agent skills for modern frontend development. Skills follow the [Agent Skills](https://agentskills.io/specification) format and work with Claude Code, Cursor, Windsurf, and other AI coding agents.

## Installation

Install the full collection:

```bash
npx skills add EfeDeveloper/edfer-skills
```

Or install a specific skill:

```bash
npx skills add EfeDeveloper/edfer-skills/vue-project-scaffolder
```

## Available Skills

| Skill                                               | Description                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| [vue-project-scaffolder](./vue-project-scaffolder/) | Scaffold a Vue 3 + Vite + Tailwind v4 + shadcn/vue project in one command |

## Usage

Once installed, skills are automatically available in your AI agent. Just describe what you want:

- "vue project my-app"
- "create vue project"
- "new vue project called dashboard"

## Why This Collection?

The most common problem when AI sets up Vue + Tailwind: **it configures Tailwind v3 instead of v4**.

Tailwind v4 uses `@tailwindcss/vite` as a Vite plugin — no `tailwind.config.js`, no PostCSS setup. These skills follow the official docs exactly and produce correctly configured projects every time.

## Contributing

1. Create a new directory with a kebab-case name
2. Add a `SKILL.md` with valid YAML frontmatter (`name` + `description`)
3. Submit a pull request

See the [Agent Skills specification](https://agentskills.io/specification) for the full format.

## License

MIT
