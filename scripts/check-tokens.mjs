// Semantic token round trip: every built-in theme must survive toSemantic → defineTheme unchanged,
// and must expose the CSS variables that non-React surfaces rely on.
// run: node --experimental-strip-types scripts/check-tokens.mjs
import assert from 'node:assert/strict';
import { THEMES, THEME_ORDER, resolveTheme } from '../src/lean-deck/themes.ts';
import { toSemantic, defineTheme, toCssVars } from '../src/lean-deck/tokens.ts';

const REQUIRED = ['--ld-font-body', '--ld-surface-page', '--ld-surface-raised', '--ld-text-strong', '--ld-accent-primary', '--ld-accent-marker'];

assert.deepEqual([...THEME_ORDER].sort(), Object.keys(THEMES).sort(), 'THEME_ORDER lists every theme exactly once');
for (const id of THEME_ORDER) {
  const t = THEMES[id];
  assert.equal(t.id, id, `${id}: id matches its key`);
  const back = defineTheme({ id: t.id, name: t.name, mood: t.mood }, toSemantic(t));
  assert.deepEqual(back, t, `${id}: round trip`);
  const vars = toCssVars(t);
  for (const k of REQUIRED) assert.ok(vars[k], `${id}: ${k}`);
}
assert.equal(resolveTheme('nope').id, 'darkmorphism');
assert.equal(resolveTheme(null, 'paper').id, 'paper');
console.log(`tokens ok — ${THEME_ORDER.length} themes round-trip, css vars present`);
