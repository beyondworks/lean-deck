// Preview-card helper only — not part of lean-deck and never in the design bundle.
// lean-deck draws at slide scale (a 1920×1080 frame, 52px titles), far wider than a
// preview card cell. Each story renders its real-size frame; this shrinks the frame
// (CSS zoom, so layout height shrinks too) to fit the cell it is mounted in.
function natural(el: HTMLElement): number {
  const w = parseFloat(el.style.width);
  return Number.isFinite(w) && w > 0 ? w : el.scrollWidth;
}

function fitAll() {
  document.querySelectorAll<HTMLElement>('[id^="r"]').forEach((root) => {
    if (!/^r\d+$/.test(root.id)) return;
    const child = root.firstElementChild as HTMLElement | null;
    if (!child) return;
    const avail = root.clientWidth;
    const w = natural(child);
    const z = avail > 0 && w > avail ? avail / w : 1;
    const next = z === 1 ? '' : z.toFixed(4);
    if (child.style.zoom !== next) child.style.zoom = next;
  });
}

if (typeof window !== 'undefined' && !(window as any).__ldFit) {
  (window as any).__ldFit = true;
  new MutationObserver(fitAll).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('resize', fitAll);
  window.addEventListener('load', fitAll);
}

export {};
