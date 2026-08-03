import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [packageDirectory] = process.argv.slice(2);

if (!packageDirectory) {
  throw new Error('Usage: node tools/prepare-dist-package-manifest.mjs <package-directory>');
}

const workspaceRoot = process.cwd();
const packageJsonPath = resolve(workspaceRoot, packageDirectory, 'package.json');
const workspacePackagesDirectory = resolve(workspaceRoot, 'packages');
const workspacePackages = new Map();

for (const directory of await readdir(workspacePackagesDirectory, { withFileTypes: true })) {
  if (!directory.isDirectory()) {
    continue;
  }

  const manifest = JSON.parse(
    await readFile(resolve(workspacePackagesDirectory, directory.name, 'package.json'), 'utf8'),
  );
  workspacePackages.set(manifest.name, manifest.version);
}

const manifest = JSON.parse(await readFile(packageJsonPath, 'utf8'));
const dependencySections = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'peerDependencies',
];

for (const section of dependencySections) {
  for (const [name, range] of Object.entries(manifest[section] ?? {})) {
    if (typeof range !== 'string' || !range.startsWith('workspace:')) {
      continue;
    }

    const version = workspacePackages.get(name);
    if (!version) {
      throw new Error(`Cannot resolve workspace dependency "${name}" in ${packageJsonPath}.`);
    }

    const specifier = range.slice('workspace:'.length);
    manifest[section][name] =
      specifier === '^' || specifier === '~' ? `${specifier}${version}` : version;
  }
}

await writeFile(packageJsonPath, `${JSON.stringify(manifest, null, 2)}\n`);
