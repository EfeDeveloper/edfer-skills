# Available AI Agent Skills

This file catalogs all available AI agent skills in this repository. Use these skills with Claude Code, Cursor, Windsurf, and other AI agents.

## Skills Registry

| Skill Name | Description | Author | Version | Link |
|------------|-------------|--------|---------|------|
| `vue-project-scaffolder` | Scaffold production-ready Vue 3 projects with Vite, Tailwind CSS v4, and shadcn/vue. Automatically configures everything with zero manual setup. | gentleman-programming | 1.0 | [SKILL.md](vue-project-scaffolder/SKILL.md) |

## How to Use Skills

### With Claude Code
```bash
# Load this skill in Claude Code
/skill-creator
/vue-project-scaffolder
```

### With Cursor / Windsurf
Skills are automatically discovered when available in the project structure.

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
