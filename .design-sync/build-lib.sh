#!/usr/bin/env bash
# Compiles src/lean-deck (kit, viz, themes, tokens) to dist/ with .d.ts, for design-sync only.
# lean-deck ships as a Next app with no library build; dist/ is gitignored.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist
npx tsc src/lean-deck/kit.tsx src/lean-deck/viz.tsx src/lean-deck/themes.ts src/lean-deck/tokens.ts \
  --declaration --outDir dist --rootDir src/lean-deck --jsx react-jsx --module esnext --target es2020 \
  --moduleResolution bundler --skipLibCheck --strict --esModuleInterop
printf "export * from './kit.js';\nexport * from './viz.js';\nexport * from './themes.js';\nexport * from './tokens.js';\n" > dist/index.js
printf "export * from './kit';\nexport * from './viz';\nexport * from './themes';\nexport * from './tokens';\n" > dist/index.d.ts
# dist/ is a self-contained package so the repo's package.json needs no "types"/"module" fields.
VERSION=$(node -p "require('./package.json').version")
printf '{\n  "name": "lean-deck",\n  "version": "%s",\n  "type": "module",\n  "module": "index.js",\n  "types": "index.d.ts",\n  "sideEffects": false\n}\n' "$VERSION" > dist/package.json
cp .design-sync/fonts.css dist/fonts.css
