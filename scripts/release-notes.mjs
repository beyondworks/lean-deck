// Print the CHANGELOG section for a version (default: package.json version).
// node scripts/release-notes.mjs [version]   — exits 1 if the section is missing or empty.
import { readFileSync } from 'node:fs';
const version = process.argv[2] ?? JSON.parse(readFileSync('package.json', 'utf8')).version;
const log = readFileSync('CHANGELOG.md', 'utf8');
const start = log.indexOf(`## [${version}]`);
if (start < 0) { console.error(`CHANGELOG.md has no "## [${version}]" section`); process.exit(1); }
const rest = log.slice(start).split('\n').slice(1);
const end = rest.findIndex((l) => l.startsWith('## ['));
const body = (end < 0 ? rest : rest.slice(0, end)).join('\n').trim();
if (!body) { console.error(`CHANGELOG.md section ${version} is empty`); process.exit(1); }
console.log(body);
