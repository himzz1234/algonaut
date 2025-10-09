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
    explanation: `We need to find the longest substring without repeating characters.`,
  };

  let start = 0;
  let maxLen = 0;
  let bestRange: [number, number] = [0, 0];
  const seen = new Map<number, number>();

  const getSeenPointer = () => {
    if (seen.size === 0) {
      return {
        ids: [a[0].id],
        value: "{ }" as unknown as number,
        pos: "top" as const,
      };
    }
    return {
      ids: Array.from(seen.values()).map((idx) => a[idx].id),
      value: `{ ${Array.from(seen.entries())
        .map(([charCode, idx]) => `${String.fromCharCode(charCode)}:${idx}`)
        .join(", ")} }` as unknown as number,
      pos: "top" as const,
    };
  };

  const getMaxPointer = () => {
    if (maxLen === 0) {
      return {
        ids: [a[0].id],
        value: 0,
        pos: "bottom" as const,
      };
    }
    return {
      ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
      value: maxLen,
      pos: "bottom" as const,
    };
  };

  for (let end = 0; end < a.length; end++) {
    const code = a[end].value;
    const duplicateFound = seen.has(code) && seen.get(code)! >= start;

    yield {
      type: "check",
      id: a[end].id,
      pointers: {
        seen: getSeenPointer(),
        maxlen: getMaxPointer(),
      },
      lines: [2],
      explanation: duplicateFound
        ? `Check if '${
            a[end].label
          }' exists in seen. Yes, it exists at index ${seen.get(code)!}.`
        : `Check if '${a[end].label}' exists in seen. No, it does not exist in the current window.`,
    };

    if (duplicateFound) {
      const duplicateIndex = seen.get(code)!;
      while (start <= duplicateIndex) {
        const removeChar = a[start].label;
        seen.delete(a[start].value);

        const currentWindowIds = a.slice(start + 1, end).map((b) => b.id);
        yield {
          type: "shrink",
          ids: currentWindowIds,
          pointers: {
            seen: getSeenPointer(),
            maxlen: getMaxPointer(),
          },
          lines: [3],
          explanation: `Remove '${removeChar}' from the window to make space for the next '${removeChar}'.`,
        };

        start++;
      }
    }

    seen.set(code, end);
    const currentWindowIds = a.slice(start, end + 1).map((b) => b.id);
    yield {
      type: "expand",
      ids: currentWindowIds,
      pointers: {
        seen: getSeenPointer(),
        maxlen: getMaxPointer(),
      },
      lines: [4, 5],
      explanation: `Add '${a[end].label}' with index ${end} to the window.`,
    };

    const currentWindowLen = end - start + 1;

    if (currentWindowLen > maxLen) {
      maxLen = currentWindowLen;
      bestRange = [start, end];

      yield {
        type: "found",
        ids: a.slice(start, end + 1).map((b) => b.id),
        pointers: {
          seen: getSeenPointer(),
          maxlen: getMaxPointer(),
        },
        lines: [6, 7],
        explanation: `Update max length to ${maxLen}. This is the best so far.`,
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
      maxlen: getMaxPointer(),
    },
    lines: [8],
    explanation: `Done. The longest substring is "${a
      .slice(bestRange[0], bestRange[1] + 1)
      .map((b) => b.label)
      .join("")}" with length ${maxLen}.`,
  };
}
