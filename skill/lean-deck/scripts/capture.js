// lean-deck capture — open `<viewer>?deck=<key>&i=0&raw=1`, then run this in the page (devtools console or a browser tool).
// It presses → until the slide stops changing, collects #slide markup and posts it to export_html.py.
// PORT must match the port export_html.py printed.
const PORT = 18765;
const deck = new URL(location.href).searchParams.get('deck');
const wait = ms => new Promise(r => setTimeout(r, ms));
await wait(800);
const slides = []; let prev = '';
for (let n = 0; n < 120; n++) {
  const html = document.getElementById('slide').innerHTML;
  if (html === prev) break;               // → on the last slide changes nothing — done
  slides.push(html); prev = html;
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
  await wait(300);
}
const r = await fetch(`http://127.0.0.1:${PORT}/`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ deck, slides }) });
`${deck}: ${slides.length} slides · ${r.status}`
