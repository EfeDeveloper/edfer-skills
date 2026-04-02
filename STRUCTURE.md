# Project Structure Guide

Complete documentation of the edfer-skills repository structure following the [Agent Skills Official Specification](https://agentskills.io/specification).

## Repository Root

```
edfer-skills/
├── README.md                 # Quick start & usage guide
├── CLAUDE.md                 # Development guidance & architecture
├── CHANGELOG.md              # Version history & changes (new)
├── STRUCTURE.md              # This file - detailed structure guide
├── LICENSE                   # Apache-2.0 License
├── .gitignore                # Git ignore rules
└── vue-project-scaffolder/   # Individual skill directory
```

## Skill Directory: vue-project-scaffolder/

### SKILL.md - The Core Skill Definition

**Location**: `vue-project-scaffolder/SKILL.md`
**Size**: ~350 lines (optimized for progressive disclosure)
**Purpose**: Main skill instructions and implementation guide

**Contents**:
- YAML frontmatter (metadata)
- When to use this skill
- How it works (overview)
- Critical patterns & requirements
- Execution steps for agents
- Success criteria checklist
- Error handling guide
- Package manager equivalents
- Links to detailed references

**Frontmatter Fields**:
```yaml
name: vue-project-scaffolder           # Required: kebab-case
description: Scaffold Vue 3 projects    # Required: describe what & when
license: Apache-2.0                     # Optional
compatibility: Node.js 18+...           # Optional: environment requirements
metadata:                               # Optional: custom properties
  author: EfeDeveloper
  version: "2.1"
```

### scripts/ Directory - Executable Code

**Location**: `vue-project-scaffolder/scripts/`
**Purpose**: Automation scripts that agents run
**Requirements**: Self-contained, helpful errors, cross-platform

#### setup.js

**What it does**:
1. Copies all config files from `assets/` to the new project
2. Removes incompatible files (tailwind.config.js, postcss.config.js)
3. Validates all 15 dependencies against minimum versions
4. Automatically upgrades outdated packages
5. Performs final verification checklist

**Usage**:
```bash
node scripts/setup.js /path/to/project bun
```

**Parameters**:
- `$1`: Full path to newly created Vue project
- `$2`: Package manager (bun, npm, pnpm, yarn)

**Dependencies**: None (uses only Node.js built-in modules)

**Platforms**: ✅ macOS, ✅ Linux, ✅ Windows (native)

#### validate-deps.js

**What it does**:
1. Reads `package.json` from the project
2. Validates installed versions against minimum requirements
3. Reports missing dependencies (hard error)
4. Reports outdated dependencies (auto-upgrade)
5. Provides colored output for each dependency

**Usage**:
```bash
node scripts/validate-deps.js /path/to/project bun
```

**Parameters**:
- `$1`: Path to Vue project
- `$2`: Package manager (bun, npm, pnpm, yarn)

**Dependencies**: None (uses only Node.js built-in modules)

**Platforms**: ✅ macOS, ✅ Linux, ✅ Windows (native)

### references/ Directory - Supplementary Documentation

**Location**: `vue-project-scaffolder/references/`
**Purpose**: Detailed reference docs (loaded on-demand by agents)
**Loading**: Only when agents need detailed information (progressive disclosure)

#### SCRIPTS.md

**Size**: ~250 lines
**Purpose**: Complete automation scripts guide

**Contents**:
- Detailed setup.js documentation
- Detailed validate-deps.js documentation
- Minimum version requirements (pinned)
- Integration with SKILL.md
- Error handling examples
- Technical details (version parsing, file validation)
- Cross-platform support notes
- Troubleshooting guide
- Future enhancements list

#### implementation-guide.md

**Purpose**: Additional implementation reference
**Note**: Referenced in SKILL.md for users who need more details

### assets/ Directory - Project Templates

**Location**: `vue-project-scaffolder/assets/`
**Purpose**: Template files copied to new Vue projects

**Contents**:

#### Configuration Files
- **vite.config.ts** — Vite configuration with Tailwind v4 + Vue plugins
- **tsconfig.json** — Root TypeScript configuration
- **tsconfig.app.json** — App-specific TypeScript rules
- **tsconfig.node.json** — Node TypeScript rules (for vite.config.ts)

#### Styling
- **style.css** — Main stylesheet with Tailwind imports

#### Components
- **App.vue** — Demo app component with gradient styling

#### Documentation
- **README.md** — Project template README
- **components.json** — shadcn/vue configuration

#### Utilities
- (Additional config files as needed)

**Note**: These files are copied verbatim to new projects by `scripts/setup.js`

## Directory Tree Visualization

```
edfer-skills/                          # Repository root
│
├── README.md                          # Quick start guide
├── CLAUDE.md                          # Development guidance
├── CHANGELOG.md                       # Version history
├── STRUCTURE.md                       # This file
├── LICENSE                            # Apache-2.0
├── .gitignore
│
└── vue-project-scaffolder/            # Skill directory
    │
    ├── SKILL.md                       # ← Main skill definition
    │   ├── Frontmatter (metadata)
    │   ├── When to use
    │   ├── How it works
    │   ├── Execution steps
    │   └── Links to references/
    │
    ├── scripts/                       # ← Automation code
    │   ├── setup.js                  # Main orchestrator (Node.js)
    │   └── validate-deps.js          # Dependency validator (Node.js)
    │
    ├── references/                    # ← Detailed docs (on-demand)
    │   ├── SCRIPTS.md                # Automation guide
    │   └── implementation-guide.md   # Implementation reference
    │
    └── assets/                        # ← Project templates
        ├── vite.config.ts
        ├── tsconfig.json
        ├── tsconfig.app.json
        ├── tsconfig.node.json
        ├── style.css
        ├── App.vue
        ├── README.md
        └── components.json
```

## File Purpose Reference

| File | Purpose | Loaded When | Size |
|------|---------|-------------|------|
| SKILL.md | Main instructions | Always (skill activated) | 350 lines |
| scripts/setup.js | Setup automation | Agent runs it | 150 lines |
| scripts/validate-deps.js | Validation | Called by setup.js | 150 lines |
| references/SCRIPTS.md | Detailed guide | On-demand | 250 lines |
| references/implementation-guide.md | Additional ref | On-demand | Variable |
| assets/* | Templates | Copied to projects | Varies |

## Key Design Principles

### 1. Progressive Disclosure
- **SKILL.md** (350 lines) loads with skill activation
- **references/** (detailed docs) load only when needed
- **scripts/** code loads only when executed
- **assets/** copied to new projects, not loaded in context

### 2. Self-Contained Scripts
- **No external dependencies** beyond Node.js
- Uses only built-in modules: `fs`, `path`, `child_process`
- Helpful error messages and colored output
- Graceful edge case handling

### 3. Cross-Platform Support
- **setup.js**: Node.js native on Windows/Linux/macOS
- **validate-deps.js**: Node.js native on all platforms
- No Git Bash or WSL required
- Works with bun, npm, pnpm, yarn

### 4. Relative Path References
- All file references use relative paths from `SKILL.md`
- Examples: `[scripts/setup.js]`, `[references/SCRIPTS.md]`
- One level deep (no deeply nested chains)

## Official Specification Compliance

This structure complies with [agentskills.io/specification](https://agentskills.io/specification):

✅ Directory layout matches spec  
✅ SKILL.md with valid frontmatter  
✅ scripts/ for executable code  
✅ references/ for documentation  
✅ assets/ for templates  
✅ Progressive disclosure optimized  
✅ Self-contained scripts  
✅ Cross-platform compatible  
✅ Relative path references  

## Validation

To validate this skill structure:

```bash
npm install -g skills-ref
skills-ref validate vue-project-scaffolder
```

This verifies:
- SKILL.md frontmatter is valid
- `name` matches directory name
- No naming convention violations
- Field types are correct

## Next Steps for Developers

### To Understand How Skills Work
1. Read `README.md` for quick overview
2. Read `CLAUDE.md` for development guidance
3. Review `SKILL.md` in vue-project-scaffolder/

### To Understand Automation
1. Read `scripts/setup.js` for main logic
2. Read `references/SCRIPTS.md` for detailed guide
3. Review `scripts/validate-deps.js` for validation logic

### To Create New Skills
1. Follow structure: `scripts/`, `references/`, `assets/`
2. Create `SKILL.md` with required frontmatter
3. Use Node.js scripts (cross-platform)
4. Keep SKILL.md under 500 lines
5. Validate with `skills-ref validate`

---

**Last Updated**: 2026-04-01  
**Version**: 2.1  
**Status**: ✅ Official Specification Compliant
