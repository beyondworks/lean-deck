#!/usr/bin/env python3
"""Insert <<N>> slide cues and demo lines into a script, right before anchor sentences.

Usage: python3 insert_markers.py <spec.json>

spec.json
{
  "script": "/abs/path/talk.md",
  "total": 12,
  "note": "> **Slides**: deck file · HTML file · 12 slides",      (optional)
  "marks": [["First words of the sentence where slide 1 appears", 1],
            ["Anchor", "(demo 1: what you type -> what appears, about 3 min)"], ...]
}

The script needs a body heading: `## Script` (or `## 본문`). Everything below it is the spoken text.
- Each anchor must occur exactly once in the body, and must start a sentence.
- If an anchor starts a paragraph the cue goes on the line above; otherwise the paragraph is split.
- Refuses to run twice (stops if <<1>> is already there) and checks that cues end up as 1..total.
- `note` goes after the header line that starts with `> **Length**` (or `> **분량**`), if present.
"""
import json, re, sys, pathlib

HEADINGS = ('## Script', '## 본문')
LENGTH = ('> **Length**', '> **분량**')


def main():
    spec = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
    p = pathlib.Path(spec['script'])
    t = p.read_text(encoding='utf-8')
    if re.search(r'^<<1>>$', t, flags=re.M):
        print('stop · cues are already there'); return 1
    heading = next((h for h in HEADINGS if h in t), None)
    if not heading:
        print(f'stop · no body heading ({" / ".join(HEADINGS)})'); return 1
    head, body = t.split(heading, 1)
    for anchor, mark in spec['marks']:
        c = body.count(anchor)
        if c != 1:
            print(f'stop · anchor found {c} times: {anchor}'); return 1
        label = f'<<{mark}>>' if isinstance(mark, int) else mark
        i = body.index(anchor)
        before = body[:i]
        if before.rstrip(' ') and before.rstrip(' ')[-1] not in '.?!\n':   # never split a sentence
            print(f'stop · anchor does not start a sentence: {anchor}'); return 1
        body = (before + label + '\n' + body[i:]) if before.endswith('\n\n') else (before.rstrip(' ') + '\n\n' + label + '\n' + body[i:])
    seq = [int(x) for x in re.findall(r'^<<(\d+)>>$', body, flags=re.M)]
    if seq != list(range(1, spec['total'] + 1)):
        print(f'stop · order {seq}'); return 1
    lines = head.split('\n')
    if spec.get('note'):
        k = next((j for j, l in enumerate(lines) if l.startswith(LENGTH)), None)
        if k is not None:
            lines.insert(k + 1, spec['note'])
    p.write_text('\n'.join(lines) + heading + body, encoding='utf-8')
    demos = sum(1 for _, m in spec['marks'] if not isinstance(m, int))
    print(f'done · {len(seq)} cues · {demos} demo lines')
    return 0


if __name__ == '__main__':
    sys.exit(main())
