#!/usr/bin/env node
/**
 * Vue Project Scaffolder - Automated Setup Script
 *
 * Orchestrates complete Vue 3 + Tailwind v4 project setup:
 * - Copies configuration files from assets/
 * - Validates all dependencies against minimum versions
 * - Removes incompatible files (tailwind.config.js, postcss.config.js)
 * - Auto-upgrades outdated packages
 * - Performs final verification
 *
 * Cross-platform: Works on macOS, Linux, Windows
 * No external dependencies required (uses built-in Node.js modules)
 *
 * Usage:
 *   node setup.js <project-dir> <package-manager>
 *
 * Example:
 *   node setup.js /path/to/my-app bun
 *   node setup.js ./calculadora-impresiones-3d npm
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[0;32m',
  yellow: '\x1b[1;33m',
  red: '\x1b[0;31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  console.error(`${colors.red}${message}${colors.reset}`);
  process.exit(1);
}

// Parse command-line arguments
const projectDir = process.argv[2];
const packageManager = process.argv[3];

if (!projectDir || !packageManager) {
  error('Usage: node setup.js <project-dir> <package-manager>');
}

// Validate arguments
if (!fs.existsSync(projectDir)) {
  error(`❌ Error: Project directory '${projectDir}' does not exist`);
}

if (!['bun', 'npm', 'pnpm', 'yarn'].includes(packageManager)) {
  error(`❌ Error: Unknown package manager '${packageManager}'. Use: bun, npm, pnpm, or yarn`);
}

// Get the skill directory (parent of scripts/)
const skillDir = path.dirname(path.dirname(__filename));
const assetsDir = path.join(skillDir, 'assets');

log('🚀 Vue Project Scaffolder - Setup', 'green');
log(`Project: ${projectDir}`);
log(`Package Manager: ${packageManager}`);
log('');

// Step 1: Copy configuration files
log('📋 Step 1: Copying configuration files...', 'yellow');

const filesToCopy = [
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
];

const filesToCopyInSrc = [
  { src: 'style.css', dest: 'src/style.css' },
  { src: 'App.vue', dest: 'src/App.vue' },
];

const filesToCopyInRoot = [
  { src: 'README.md', dest: 'README.md' },
];

// Copy files from assets/ to project root
[...filesToCopy, ...filesToCopyInSrc.map(f => f.src), ...filesToCopyInRoot.map(f => f.src)].forEach((file) => {
  const srcPath = path.join(assetsDir, file);
  let destPath;

  if (filesToCopyInSrc.some(f => f.src === file)) {
    destPath = path.join(projectDir, 'src', file);
  } else if (filesToCopyInRoot.some(f => f.src === file)) {
    destPath = path.join(projectDir, file);
  } else {
    destPath = path.join(projectDir, file);
  }

  try {
    if (!fs.existsSync(srcPath)) {
      error(`❌ Warning: Source file not found: ${srcPath}`);
    }
    fs.copyFileSync(srcPath, destPath);
    log(`  ${colors.green}✅${colors.reset} ${path.basename(destPath)}`);
  } catch (err) {
    error(`❌ Failed to copy ${file}: ${err.message}`);
  }
});

log(`${colors.green}✅ Configuration files copied${colors.reset}`);
log('');

// Step 2: Remove incompatible files
log('🧹 Step 2: Cleaning up incompatible files...', 'yellow');

const filesToRemove = [
  'tailwind.config.js',
  'tailwind.config.cjs',
  'postcss.config.js',
  'postcss.config.cjs',
];

filesToRemove.forEach((file) => {
  const filePath = path.join(projectDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    log(`  ${colors.green}✅${colors.reset} Removed: ${file}`);
  }
});

log('');

// Step 3: Validate and upgrade dependencies
log('📦 Step 3: Validating and upgrading dependencies...', 'yellow');

const validateDepsPath = path.join(skillDir, 'scripts', 'validate-deps.js');

try {
  execSync(`node "${validateDepsPath}" "${projectDir}" "${packageManager}"`, {
    stdio: 'inherit',
  });
} catch (err) {
  error('❌ Dependency validation failed');
}

log('');

// Step 4: Final verification
log('🔍 Step 4: Final verification...', 'yellow');

const requiredFiles = [
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'src/style.css',
  'src/App.vue',
  'README.md',
];

let passedChecks = 0;

requiredFiles.forEach((file) => {
  const filePath = path.join(projectDir, file);
  if (fs.existsSync(filePath)) {
    log(`  ${colors.green}✅${colors.reset} ${file}`);
    passedChecks++;
  } else {
    log(`  ${colors.red}❌${colors.reset} ${file}`);
  }
});

// Check that bad files don't exist
const badFilesExist = filesToRemove.some(f => fs.existsSync(path.join(projectDir, f)));
if (!badFilesExist) {
  log(`  ${colors.green}✅${colors.reset} No tailwind.config.js (correct for v4)`);
  passedChecks++;
} else {
  log(`  ${colors.red}❌${colors.reset} Found incompatible config files`);
}

log('');

// Final report
log('════════════════════════════════════════', 'green');
log('✅ SETUP COMPLETE!', 'green');
log('════════════════════════════════════════', 'green');
log('');
log('📝 Next steps:', 'yellow');
log(`  1. cd ${projectDir}`);
log(`  2. ${packageManager} run dev`);
log('  3. Open http://localhost:5173');
log('');
log('📚 To add shadcn/vue components:', 'yellow');
log(`  ${packageManager} dlx shadcn-vue@latest init`);
log('');

process.exit(passedChecks >= 7 ? 0 : 1);
