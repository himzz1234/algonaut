import type { Block, SearchingStep } from "../types";

export function* binarySearch(
  arr: Block[],
  target: number
): Generator<SearchingStep> {
  const a = [...arr];
  let left = 0,
    right = a.length - 1;

  yield {
    type: "init",
    array: [...a],
    target,
    lines: [0, 1],
    explanation: `Let's search for ${target} in [${a
      .map((b) => b.value)
      .join(", ")}] using Binary Search.`,
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    yield {
      type: "compare",
      id: a[mid].id,
      relation:
        a[mid].value === target ? "=" : a[mid].value > target ? ">" : "<",
      pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
      target,
      lines: [3, 4],
      explanation: `Compare middle element ${a[mid].value} at index ${mid} with target ${target}.`,
    };

    if (a[mid].value === target) {
      yield {
        type: "found",
        id: a[mid].id,
        pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
        lines: [5],
        explanation: `Target ${target} found at index ${mid}.`,
      };
      return;
    } else if (a[mid].value > target) {
      right = mid - 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: a[left].id, high: a[right].id },
          lines: [6, 7],
          explanation: `Target is smaller, search left half: indices ${left} to ${right}.`,
        };
      }
    } else {
      left = mid + 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: a[left].id, high: a[right].id },
          lines: [8, 9],
          explanation: `Target is larger, search right half: indices ${left} to ${right}.`,
        };
      }
    }
  }

  yield {
    type: "not-found",
    pointers: {},
    target,
    lines: [10],
    explanation: `Search complete. ${target} not found in the array.`,
  };
}
