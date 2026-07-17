#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

console.log('🔍 Verifying workspace configuration...\n');

// Check root package.json
const rootPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log('✅ Root package.json:');
console.log(`   - Name: ${rootPkg.name}`);
console.log(`   - Private: ${rootPkg.private}`);
console.log(`   - Workspaces: ${JSON.stringify(rootPkg.workspaces)}\n`);

// Check workspace packages
const workspaces = ['projects/acontplus-core', 'projects/acontplus-ui-components'];

workspaces.forEach((workspace) => {
  const pkgPath = path.join(workspace, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    console.log(`✅ ${pkg.name}:`);
    console.log(`   - Version: ${pkg.version}`);

    if (pkg.dependencies) {
      const workspaceDeps = Object.entries(pkg.dependencies).filter(([name, version]) =>
        version.startsWith('workspace:'),
      );
      if (workspaceDeps.length > 0) {
        console.log(
          `   - Workspace dependencies: ${workspaceDeps.map(([name]) => name).join(', ')}`,
        );
      }
    }

    if (pkg.peerDependencies) {
      const peerDeps = Object.keys(pkg.peerDependencies);
      console.log(`   - Peer dependencies: ${peerDeps.length} packages`);
    }
    console.log('');
  } else {
    console.log(`❌ Missing package.json in ${workspace}\n`);
  }
});

console.log('🎉 Workspace verification complete!');
console.log('\n📋 Next steps:');
console.log('   1. Run: pnpm install');
console.log('   2. Run: pnpm run workspace:build');
console.log('   3. Test: pnpm run workspace:check');
