# Changelog

All notable changes to the edfer-skills project are documented here.

## [v2.1] - 2026-04-01

### 🎯 Major Changes: Official Spec Compliance

#### ✅ Agent Skills Specification Compliance
- **Restructured directory layout** to match official Agent Skills spec:
  - Added `scripts/` directory for executable code
  - Reorganized `references/` for supplementary documentation
  - Maintained `assets/` for templates and resources
- **Updated SKILL.md frontmatter** with all optional fields:
  - Added `compatibility` field: "Node.js 18+. Works macOS, Linux, Windows."
  - Added structured `metadata` section
  - Upgraded version to 2.1

#### ✅ Cross-Platform Implementation
- **Migrated from Bash to Node.js**:
  - Rewrote `setup.sh` → `scripts/setup.js`
  - Moved `validate-deps.js` → `scripts/validate-deps.js`
  - Uses only Node.js built-in modules (fs, path, child_process)
  - **ZERO external dependencies**

- **Windows Compatibility**:
  - Before: Bash script required Git Bash or WSL on Windows
  - After: Native Node.js runs on Windows 10+ without any additional tools
  - Linux & macOS: Unchanged (work natively)

#### ✅ Progressive Disclosure Optimization
- Reduced `SKILL.md` from 409 lines to 350 lines
- Moved detailed automation docs to `references/SCRIPTS.md`
- Agents load detailed docs only when needed (not in main prompt)

#### ✅ Documentation Updates
- **README.md**: Added version status and spec compliance badge
- **CLAUDE.md**: Complete rewrite with:
  - Official spec requirements explained
  - New directory structure documented
  - Skill creation rules aligned with official spec
  - Implementation status section
  - Updated contributor guidelines
- **New**: `references/SCRIPTS.md` - Complete automation guide with:
  - Script documentation
  - Cross-platform support notes
  - Troubleshooting guide
  - Minimum version requirements

### 📁 File Structure Changes

```
BEFORE:
├── SKILL.md              (409 lines)
├── setup.sh              ← Bash (Windows issues)
├── validate-deps.js      ← Root directory
├── SCRIPTS.md            ← Root directory
└── assets/

AFTER:
├── SKILL.md              (350 lines, cleaner)
├── scripts/
│   ├── setup.js          ← Node.js (cross-platform)
│   └── validate-deps.js  ← Organized in scripts/
├── references/
│   ├── SCRIPTS.md        ← Moved here
│   └── implementation-guide.md
└── assets/
```

### 🔧 Technical Details

#### setup.js (New)
- Orchestrates complete Vue project setup
- Copies config files from assets/
- Removes incompatible files (Tailwind v4)
- Validates all 15 dependencies
- Auto-upgrades outdated packages
- Performs final verification
- Colored output for clarity
- Cross-platform native execution

#### validate-deps.js (Moved)
- Validates minimum version requirements
- Semantic version parsing
- Identifies missing packages (hard error)
- Identifies outdated packages (auto-upgrade)
- Works with bun, npm, pnpm, yarn

### ✅ Compliance Checklist

Official Agent Skills Spec (https://agentskills.io/specification):

- ✅ Directory structure (scripts/, references/, assets/)
- ✅ SKILL.md required with valid frontmatter
- ✅ name field (kebab-case, matches dir)
- ✅ description field (1-1024 chars)
- ✅ Optional fields (license, compatibility, metadata)
- ✅ Progressive disclosure (< 500 lines)
- ✅ Scripts self-contained
- ✅ Relative path references
- ✅ Cross-platform support
- ✅ No external dependencies
- ✅ Ready for `skills-ref validate` tool

### 🚀 Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Windows Support** | ❌ Requires Git Bash | ✅ Native |
| **Dependencies** | N/A | ✅ Zero external |
| **SKILL.md Size** | 409 lines | 350 lines |
| **Spec Compliance** | Partial | ✅ 100% |
| **Auto-Setup** | Manual steps | ✅ One command |
| **Error Handling** | Colored output | ✅ Improved |

### 🔗 References

- [Agent Skills Official Spec](https://agentskills.io/specification)
- [Detailed Scripts Guide](./vue-project-scaffolder/references/SCRIPTS.md)
- [Implementation Guide](./vue-project-scaffolder/references/implementation-guide.md)

### 📝 Migration Notes

For existing users:
- Old `setup.sh` removed (replaced with Node.js version)
- Old `validate-deps.js` in root moved to `scripts/`
- All functionality preserved, just reorganized
- No breaking changes to CLI interface

### 🔮 Next Steps

Potential future enhancements:
- Publish to official Agent Skills Registry
- Add support for other frameworks (React, Angular)
- Create skill templates for other use cases
- Auto-init shadcn/vue (with confirmation)
- Pre-configured git hooks setup
- CI/CD template generation

---

## [v2.0] - Previous

Previous implementation with setup.sh. See git history for details.
