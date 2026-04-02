#!/usr/bin/env node
/**
 * Vue Project Scaffolder - Dependency Validator
 *
 * Validates that all minimum required dependencies are installed
 * and upgrades outdated packages to acceptable versions.
 *
 * Uses only built-in Node.js modules (fs, path, child_process)
 * No external dependencies required
 *
 * Cross-platform: Works on macOS, Linux, Windows
 *
 * Usage: node validate-deps.js <project-dir> <package-manager>
 * Example: node validate-deps.js ./my-app bun
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectDir = process.argv[2];
const packageManager = process.argv[3];

if (!projectDir || !packageManager) {
  console.error('❌ Usage: node validate-deps.js <project-dir> <package-manager>');
  process.exit(1);
}

const packageJsonPath = path.join(projectDir, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error(`❌ Error: package.json not found at ${packageJsonPath}`);
  process.exit(1);
}

// Read package.json
let pkg;
try {
  pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch (e) {
  console.error(`❌ Error parsing package.json: ${e.message}`);
  process.exit(1);
}

// Minimum required versions
const MINIMUM_VERSIONS = {
  dependencies: {
    'vue': '3.5.30',
    'tailwindcss': '4.2.2',
    '@tailwindcss/vite': '4.2.2',
    'clsx': '2.1.1',
    'class-variance-authority': '0.7.1',
    'tailwind-merge': '3.5.0',
    'lucide-vue-next': '1.0.0',
  },
  devDependencies: {
    'typescript': '5.9.3',
    'vite': '8.0.1',
    '@vitejs/plugin-vue': '6.0.5',
    '@vue/tsconfig': '0.9.0',
    '@types/node': '24.12.0',
    'tw-animate-css': '1.4.0',
    'vite-plugin-vue-devtools': '8.0.7',
    'vue-tsc': '3.2.5',
  },
};

/**
 * Parse a semantic version string
 * @param {string} versionStr - Version string like "3.5.30", "^3.5.30", "~3.5.30"
 * @returns {object} { major, minor, patch }
 */
function parseVersion(versionStr) {
  // Remove leading symbols (^, ~, >, =, etc.)
  const cleaned = versionStr.replace(/^[\^~><=]*/, '');
  const parts = cleaned.split('.');
  return {
    major: parseInt(parts[0], 10) || 0,
    minor: parseInt(parts[1], 10) || 0,
    patch: parseInt(parts[2], 10) || 0,
  };
}

/**
 * Compare two versions
 * @returns {number} -1 if v1 < v2, 0 if equal, 1 if v1 > v2
 */
function compareVersions(v1Str, v2Str) {
  const v1 = parseVersion(v1Str);
  const v2 = parseVersion(v2Str);

  if (v1.major !== v2.major) return v1.major - v2.major;
  if (v1.minor !== v2.minor) return v1.minor - v2.minor;
  if (v1.patch !== v2.patch) return v1.patch - v2.patch;
  return 0;
}

/**
 * Check if version1 is >= version2
 */
function isVersionAcceptable(v1, v2) {
  return compareVersions(v1, v2) >= 0;
}

// Validation results
let hasErrors = false;
let needsUpgrade = [];

console.log('📦 Validating Dependencies\n');

// Check dependencies
console.log('🔍 Production Dependencies:');
Object.entries(MINIMUM_VERSIONS.dependencies).forEach(([pkgName, minVersion]) => {
  const installed = pkg.dependencies?.[pkgName];

  if (!installed) {
    console.error(`  ❌ ${pkgName} - NOT INSTALLED`);
    hasErrors = true;
  } else if (!isVersionAcceptable(installed, minVersion)) {
    console.warn(`  ⚠️  ${pkgName} (${installed}) - needs upgrade to ${minVersion}`);
    needsUpgrade.push({ name: pkgName, minVersion, isDev: false });
  } else {
    console.log(`  ✅ ${pkgName} (${installed})`);
  }
});

// Check dev dependencies
console.log('\n🔍 Development Dependencies:');
Object.entries(MINIMUM_VERSIONS.devDependencies).forEach(([pkgName, minVersion]) => {
  const installed = pkg.devDependencies?.[pkgName];

  if (!installed) {
    console.error(`  ❌ ${pkgName} - NOT INSTALLED`);
    hasErrors = true;
  } else if (!isVersionAcceptable(installed, minVersion)) {
    console.warn(`  ⚠️  ${pkgName} (${installed}) - needs upgrade to ${minVersion}`);
    needsUpgrade.push({ name: pkgName, minVersion, isDev: true });
  } else {
    console.log(`  ✅ ${pkgName} (${installed})`);
  }
});

console.log('');

// Handle errors
if (hasErrors) {
  console.error('❌ Critical: Some required dependencies are missing!');
  console.error('Run the following commands to install them:');

  const missing = Object.entries(MINIMUM_VERSIONS.dependencies)
    .filter(([name]) => !pkg.dependencies?.[name])
    .map(([name]) => name);

  const missingDev = Object.entries(MINIMUM_VERSIONS.devDependencies)
    .filter(([name]) => !pkg.devDependencies?.[name])
    .map(([name]) => name);

  if (missing.length > 0) {
    console.log(`  ${packageManager} add ${missing.join(' ')}`);
  }
  if (missingDev.length > 0) {
    const devFlag = packageManager === 'npm' ? '--save-dev' : '-D';
    console.log(`  ${packageManager} add ${devFlag} ${missingDev.join(' ')}`);
  }

  process.exit(1);
}

// Handle upgrades
if (needsUpgrade.length > 0) {
  console.log(`⚠️  Found ${needsUpgrade.length} package(s) to upgrade:\n`);

  needsUpgrade.forEach(({ name, minVersion }) => {
    console.log(`  Upgrading ${name} to ${minVersion}...`);

    try {
      execSync(`${packageManager} update ${name}`, {
        cwd: projectDir,
        stdio: 'inherit',
      });
      console.log(`  ✅ ${name} upgraded\n`);
    } catch (e) {
      console.error(`  ❌ Failed to upgrade ${name}: ${e.message}`);
      process.exit(1);
    }
  });
}

// Final report
console.log('════════════════════════════════════════');
console.log('✅ All dependencies validated and ready');
console.log('════════════════════════════════════════\n');
