#!/usr/bin/env node

/**
 * Skripta za provjeru konzistentnosti verzija zavisnosti u monorepo
 * Upotreba: node scripts/check-versions.js
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function loadPackageJson(workspace) {
  const pkgPath = path.join(__dirname, '..', workspace, 'package.json');
  return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}

function compareVersions() {
  const admin = loadPackageJson('m-hotel-admin');
  const gost = loadPackageJson('m-hotel-gost');

  console.log(`${COLORS.cyan}═══════════════════════════════════════════════════════════════════════${COLORS.reset}`);
  console.log(`${COLORS.blue}🔍 Provjera verzija zavisnosti u HOTEL monorepo${COLORS.reset}`);
  console.log(`${COLORS.cyan}═══════════════════════════════════════════════════════════════════════${COLORS.reset}\n`);

  // Provjera dependencies
  console.log(`${COLORS.yellow}📦 Dependencies:${COLORS.reset}\n`);
  const depDiffs = checkDependencies(admin.dependencies, gost.dependencies);

  // Provjera devDependencies
  console.log(`\n${COLORS.yellow}🛠️  DevDependencies:${COLORS.reset}\n`);
  const devDepDiffs = checkDependencies(admin.devDependencies, gost.devDependencies);

  // Rezultat
  console.log(`\n${COLORS.cyan}═══════════════════════════════════════════════════════════════════════${COLORS.reset}`);

  const totalDiffs = depDiffs + devDepDiffs;
  if (totalDiffs === 0) {
    console.log(`${COLORS.green}✅ Sve zajedničke zavisnosti imaju konzistentne verzije!${COLORS.reset}`);
    return 0;
  } else {
    console.log(`${COLORS.red}❌ Pronađeno ${totalDiffs} razlika u verzijama${COLORS.reset}`);
    console.log(`${COLORS.yellow}\n💡 Preporuka: Usaglasi verzije ručno ili pokreni:${COLORS.reset}`);
    console.log(`   ${COLORS.cyan}npm run sync-versions${COLORS.reset}`);
    return 1;
  }
}

function checkDependencies(adminDeps = {}, gostDeps = {}) {
  const allDeps = new Set([...Object.keys(adminDeps), ...Object.keys(gostDeps)]);
  const sharedDeps = Array.from(allDeps).filter(dep => adminDeps[dep] && gostDeps[dep]).sort();

  let differences = 0;

  if (sharedDeps.length === 0) {
    console.log(`  ${COLORS.green}✓ Nema zajedničkih zavisnosti${COLORS.reset}`);
    return 0;
  }

  console.log(`  Paket`.padEnd(42) + `Admin`.padEnd(22) + `Gost`);
  console.log(`  ${'-'.repeat(70)}`);

  for (const dep of sharedDeps) {
    const adminVer = adminDeps[dep];
    const gostVer = gostDeps[dep];

    if (adminVer !== gostVer) {
      console.log(`  ${COLORS.red}✗ ${dep.padEnd(38)}${adminVer.padEnd(20)}${gostVer}${COLORS.reset}`);
      differences++;
    } else {
      console.log(`  ${COLORS.green}✓ ${dep.padEnd(38)}${adminVer}${COLORS.reset}`);
    }
  }

  return differences;
}

// Exit kod za CI/CD pipeline
const exitCode = compareVersions();
process.exit(exitCode);
