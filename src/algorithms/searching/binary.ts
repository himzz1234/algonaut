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
    lines: [0],
    explanation: `Let's search for ${target} in [${a
      .map((b) => b.value)
      .join(", ")}] using Binary search.`,
  };

  yield {
    type: "set-range",
    low: a[left].id,
    high: a[right].id,
    pointers: { low: a[left].id, high: a[right].id },
    lines: [1],
    explanation: `Start with the whole range: ${a[left].value} to ${a[right].value}.`,
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    yield {
      type: "check",
      id: a[mid].id,
      pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
      lines: [3],
      explanation: `Middle is ${a[mid].value} at index ${mid}.`,
    };

    if (a[mid].value === target) {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: "=",
        pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
        target,
        lines: [4],
        explanation: `Element ${a[mid].value} equals target ${target}.`,
      };

      yield {
        type: "found",
        id: a[mid].id,
        pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
        lines: [4],
        explanation: `TA-DA! Target ${target} found at index ${mid}.`,
      };

      return;
    } else if (a[mid].value > target) {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: ">",
        pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
        target,
        lines: [5],
        explanation: `${a[mid].value} is greater, start searching in the left half.`,
      };

      right = mid - 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: a[left].id, high: a[right].id },
          lines: [6],
          explanation: `New search range from index ${left} (${a[left].value}) to index ${right} (${a[right].value}).`,
        };
      }
    } else {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: "<",
        pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
        target,
        lines: [7],
        explanation: `${a[mid].value} is smaller, start searching in the right half.`,
      };

      left = mid + 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: a[left].id, high: a[right].id },
          lines: [8],
          explanation: `New search range from index ${left} (${a[left].value}) to index ${right} (${a[right].value}).`,
        };
      }
    }
  }

  yield {
    type: "not-found",
    pointers: { low: a[left].id, high: a[right].id },
    target,
    lines: [9],
    explanation: `Search complete. ${target} not found.`,
  };
}
