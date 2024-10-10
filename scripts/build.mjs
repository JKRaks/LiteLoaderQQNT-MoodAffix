import spawn from 'cross-spawn';
import { resolve } from 'path';

const __dirname = resolve((import.meta.dirname || ''), './'); // Workaround

const SpawnConfig = {
    shell: true,
    stdio: 'inherit',
    cwd: __dirname,
};

// Build `index.js`
spawn.sync('npx', [
    'electron-vite', 'build'
], SpawnConfig);
// Generate `manifest.json`
// const PackageInfo = JSON.parse(fs.readFileSync(resolve(__dirname, './package.json'), 'utf8'));
// const { liteloader_manifest: PackageManifest } = PackageInfo;

// const PluginManifest = {
//     manifest_version: 4,

//     type: PackageManifest.type,
//     name: PackageManifest.name,
//     slug: PackageManifest.slug,
//     description: PackageInfo.description,
//     version: PackageInfo.version,
//     icon: PackageManifest.icon,
//     authors: [],

//     platform: PackageManifest.platform,
//     injects: PackageManifest.injects,

//     repository: PackageManifest.repository,
// };

// fs.writeFileSync(resolve(__dirname, './dist/manifest.json'), JSON.stringify(PluginManifest, null, 2), { encoding: 'utf8' });
