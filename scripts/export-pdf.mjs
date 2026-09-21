// PDF export — print a whole deck straight to PDF: one slide per 1920×1080 page, text stays text (vector, selectable).
//
//   npm run dev                                   # or npm run build && npm start
//   npm run export:pdf -- demo                    # → demo.pdf
//   node scripts/export-pdf.mjs <deck> [out.pdf] [--theme paper] [--base http://localhost:3000] [--route /deck]
//
// It opens <base><route>?deck=<deck>&theme=<theme>&print=1, waits for web fonts, and calls Page.printToPDF.
// No screenshots in between, so nothing is rasterised and nothing shifts between pages.
// Uses the Chrome DevTools protocol over Node's built-in WebSocket — no extra dependencies.
import { spawn } from 'node:child_process';
import { mkdtempSync, existsSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name, fallback) => { const k = args.indexOf(`--${name}`); return k < 0 ? fallback : args.splice(k, 2)[1]; };
const base = opt('base', 'http://localhost:3000');
const route = opt('route', '/deck');
const theme = opt('theme', '');
const [deck, out = `${deck}.pdf`] = args;
if (!deck) { console.error('usage: node scripts/export-pdf.mjs <deck> [out.pdf] [--theme id] [--base url] [--route /deck]'); process.exit(2); }

const CHROME = process.env.CHROME_BIN
  ?? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
if (!CHROME) { console.error('Chrome not found — set CHROME_BIN'); process.exit(2); }
const PORT = Number(process.env.CDP_PORT ?? 9334);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(path.join(tmpdir(), 'lean-deck-pdf-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const exited = new Promise((r) => chrome.once('exit', r));
const stop = async () => { chrome.kill(); await exited; rmSync(profile, { recursive: true, force: true }); };

let target;
for (let k = 0; k < 50 && !target; k++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === 'page'); } catch {}
}
if (!target) { await stop(); console.error('Chrome did not start'); process.exit(2); }

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;

try {
  const url = `${base}${route}?deck=${encodeURIComponent(deck)}&print=1${theme ? `&theme=${encodeURIComponent(theme)}` : ''}`;
  await send('Page.navigate', { url });
  let slides = 0;
  for (let k = 0; k < 150 && !slides; k++) { await sleep(200); slides = Number(await evaluate(`document.getElementById('deck')?.dataset.slides ?? 0`)); }
  if (!slides) throw new Error(`no deck rendered at ${url} — is the server running and the deck key right?`);
  await evaluate('document.fonts.ready.then(() => true)');
  await sleep(300);

  const pdf = await send('Page.printToPDF', { preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 });
  if (!pdf.result?.data) throw new Error(`printToPDF failed: ${JSON.stringify(pdf.error ?? pdf)}`);
  const bytes = Buffer.from(pdf.result.data, 'base64');
  const pages = (bytes.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  writeFileSync(out, bytes);
  console.log(`${out}: ${pages} pages / ${slides} slides · ${(bytes.length / 1024).toFixed(0)} KB`);
  if (pages !== slides) { console.error('page count does not match slide count'); process.exitCode = 1; }
} catch (e) {
  console.error(e.message); process.exitCode = 1;
} finally { ws.close(); await stop(); }
