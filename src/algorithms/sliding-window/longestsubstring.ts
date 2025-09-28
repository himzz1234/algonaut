import type { Block, SlidingWindowStep } from "../types";

export function* longestSubstringWithoutRepeat(
  str: string
): Generator<SlidingWindowStep> {
  const a: Block[] = Array.from(str).map((ch, idx) => ({
    id: idx + 1,
    value: ch.charCodeAt(0),
    label: ch,
  }));

  if (a.length === 0) return;

  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `Start with start=0, maxLen=0, seen={}.`,
  };

  let start = 0;
  let maxLen = 0;
  let bestRange: [number, number] = [0, 0];
  const seen = new Map<number, number>();

  for (let end = 0; end < a.length; end++) {
    const code = a[end].value;
    const duplicateFound = seen.has(code) && seen.get(code)! >= start;

    if (duplicateFound) {
      start = seen.get(code)! + 1;
    }

    seen.set(code, end);

    for (const [charCode, idx] of Array.from(seen.entries())) {
      if (idx < start) seen.delete(charCode);
    }

    const currentWindow = a.slice(start, end + 1);
    const currentWindowIds = currentWindow.map((b) => b.id);
    const currentWindowLen = currentWindow.length;

    const seenStr = `{ ${Array.from(seen.entries())
      .map(([charCode, idx]) => `${String.fromCharCode(charCode)}:${idx}`)
      .join(", ")} }`;

    yield {
      type: "highlight",
      ids: currentWindowIds,
      pointers: {
        seen: {
          ids: currentWindowIds,
          value: seenStr as unknown as number,
          pos: "top",
        },
        maxlen: {
          ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
          value: a.slice(bestRange[0], bestRange[1] + 1).length,
          pos: "bottom",
        },
      },
      lines: duplicateFound ? [2, 3] : [4, 5],
      explanation: duplicateFound
        ? `Found duplicate '${
            a[end].label
          }' → move start to ${start}, window="${currentWindow
            .map((b) => b.label)
            .join("")}", len=${currentWindowLen}`
        : `Add '${a[end].label}' → window="${currentWindow
            .map((b) => b.label)
            .join("")}", len=${currentWindowLen}`,
    };

    if (currentWindowLen > maxLen) {
      maxLen = currentWindowLen;
      bestRange = [start, end];

      yield {
        type: "found",
        ids: currentWindowIds,
        pointers: {
          seen: {
            ids: currentWindowIds,
            value: seenStr as unknown as number,
            pos: "top",
          },
          maxlen: { ids: currentWindowIds, value: maxLen, pos: "bottom" },
        },
        lines: [6, 7],
        explanation: `Update maxLen → ${maxLen} (best so far).`,
      };
    }
  }

  const finalWindowIds = a
    .slice(bestRange[0], bestRange[1] + 1)
    .map((b) => b.id);

  yield {
    type: "found",
    ids: finalWindowIds,
    pointers: {
      maxlen: { ids: finalWindowIds, value: maxLen },
    },
    lines: [8],
    explanation: `Done → longest substring="${a
      .slice(bestRange[0], bestRange[1] + 1)
      .map((b) => b.label)
      .join("")}", len=${maxLen}.`,
  };
}
