#!/usr/bin/env python3
"""Check the slide cues and demo lines in a script.

Usage: python3 check_markers.py <script.md> <slide count>

- `<<N>>` lines cover 1..count, once each, in order, and only below the body heading
- lists `(demo ...)` / `(시연 ...)` lines and sums the minutes written in them
"""
import re, sys

HEADINGS = ('## Script', '## 본문')
TIME = re.compile(r'(?:about|약)\s*(\d+)\s*(min|분|s|sec|초)(?:\s*(\d+)\s*(?:s|sec|초))?')


def main():
    if len(sys.argv) < 3:
        print(__doc__); return 1
    text = open(sys.argv[1], encoding='utf-8').read()
    total = int(sys.argv[2])
    heading = next((h for h in HEADINGS if h in text), None)
    if not heading:
        print(f'FAIL · no body heading ({" / ".join(HEADINGS)})'); return 1
    head, body = text.split(heading, 1)
    ok = True
    if re.search(r'^<<\d+>>$', head, flags=re.M):
        print('FAIL · a <<N>> line sits above the body'); ok = False
    seq = [int(x) for x in re.findall(r'^<<(\d+)>>$', body, flags=re.M)]
    if seq != list(range(1, total + 1)):
        print(f'FAIL · cue order {seq} != 1..{total}'); ok = False
    else:
        print(f'OK · {total} cues in order')
    demos = re.findall(r'^`?\(((?:demo|시연)[^\n]*)\)`?$', body, flags=re.M)   # backtick-wrapped lines count too
    sec = 0
    for d in demos:
        m = TIME.search(d)
        if m:
            n = int(m.group(1))
            sec += n * 60 + int(m.group(3) or 0) if m.group(2) in ('min', '분') else n
        print('  ·', d[:90])
    print(f'{len(demos)} demo lines · {sec // 60} min {sec % 60} s written')
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
