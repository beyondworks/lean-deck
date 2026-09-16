// Layout check — render every slide of the given decks in every theme at 1920×1080 and report
// text that leaves the frame or a last line holding only a short orphaned word.
//
//   npm run build && npm start            # in one terminal
//   npm run check:layout                  # in another (needs Google Chrome)
//   node scripts/check-layout.mjs http://localhost:3000 demo:10,viz:10 [theme,theme…]
//
// Fonts differ between operating systems, so run this where the deck will be presented.
// Uses the Chrome DevTools protocol over Node's built-in WebSocket — no extra dependencies.
import { spawn } from 'node:child_process';
import { mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const [base = 'http://localhost:3000', deckArg = 'demo:10,viz:10', themeArg = ''] = process.argv.slice(2);
const CHROME = process.env.CHROME_BIN
  ?? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
if (!CHROME) { console.error('Chrome not found — set CHROME_BIN'); process.exit(2); }
const PORT = Number(process.env.CDP_PORT ?? 9333);
const THEMES = themeArg ? themeArg.split(',') : ['glass', 'paper', 'neumorphism', 'darkmorphism', 'macintosh', 'claymorphism', 'flat', 'material',
  'fluent', 'apple', 'minimalism', 'darkmode', 'card', 'gradient', 'typographic', 'brutalism', 'neubrutalism'];
const DECKS = deckArg.split(',').map((d) => { const [k, n] = d.split(':'); return [k, Number(n)]; });
const ORPHAN_PX = 110;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--hide-scrollbars', '--no-first-run',
  `--user-data-dir=${mkdtempSync(path.join(tmpdir(), 'lean-deck-'))}`, 'about:blank'], { stdio: 'ignore' });
let target;
for (let k = 0; k < 50 && !target; k++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === 'page'); } catch {}
}
if (!target) { chrome.kill(); console.error('Chrome did not start'); process.exit(2); }

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(); const listeners = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method) for (const l of listeners.splice(0)) l(m);
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const loaded = () => new Promise((r) => { const on = (m) => (m.method === 'Page.loadEventFired' ? r() : listeners.push(on)); listeners.push(on); });

const CHECK = `(() => {
  const root = document.getElementById('slide'); if (!root) return ['no #slide'];
  const rr = root.getBoundingClientRect(), bad = [];
  root.querySelectorAll('*').forEach((el) => {
    const b = el.getBoundingClientRect();
    if (b.width && el.textContent.trim() && (b.right > rr.right + 1 || b.bottom > rr.bottom + 1)) bad.push('outside: ' + el.textContent.slice(0, 24));
    for (const c of el.childNodes) if (c.nodeType === 3 && c.textContent.trim().length > 3) {
      const rg = document.createRange(); rg.selectNodeContents(c);
      const rects = [...rg.getClientRects()], tops = [...new Set(rects.map((x) => Math.round(x.top)))];
      if (tops.length > 1) {
        const w = rects.filter((x) => Math.round(x.top) === tops.at(-1)).reduce((a, x) => a + x.width, 0);
        if (w < ${ORPHAN_PX}) bad.push('orphan (' + Math.round(w) + 'px): …' + c.textContent.slice(-16));
      }
    }
  });
  return bad;
})()`;

const problems = []; let frames = 0;
try {
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
  for (const [deck, count] of DECKS) for (const theme of THEMES) for (let i = 0; i < count; i++) {
    const done = loaded();
    await send('Page.navigate', { url: `${base}/deck?deck=${deck}&theme=${theme}&i=${i}&raw=1` });
    await Promise.race([done, sleep(15000)]);
    await sleep(500);
    const r = await send('Runtime.evaluate', { expression: CHECK, returnByValue: true });
    for (const p of r.result?.result?.value ?? ['evaluation failed']) problems.push(`${deck} #${i} ${theme}: ${p}`);
    frames++;
  }
} finally { ws.close(); chrome.kill(); }

console.log(`${frames} frames checked`);
if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
console.log('no text outside the frame, no orphaned last words');
