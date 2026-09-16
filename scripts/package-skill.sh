#!/usr/bin/env bash
# Zip the Claude Code skill as dist/lean-deck-skill-v<version>.zip — the release asset.
set -euo pipefail
cd "$(dirname "$0")/.."
version=$(node -p "require('./package.json').version")
mkdir -p dist
out="dist/lean-deck-skill-v${version}.zip"
rm -f "$out"
(cd skill && zip -qr "../$out" lean-deck -x '*/__pycache__/*' '*.DS_Store')
echo "$out"
