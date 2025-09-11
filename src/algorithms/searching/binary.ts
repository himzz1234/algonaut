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
    explanation: `Start binary search for ${target} in [${a
      .map((b) => b.value)
      .join(", ")}].`,
  };

  yield {
    type: "set-range",
    low: a[left].id,
    high: a[right].id,
    pointers: { low: a[left].id, high: a[right].id },
    indices: [left, right],
    values: [a[left].value, a[right].value],
    lines: [1],
    explanation: `Initial search range is from index ${left} (${a[left].value}) to index ${right} (${a[right].value}).`,
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    yield {
      type: "check",
      id: a[mid].id,
      pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
      indices: [mid],
      values: [a[mid].value],
      lines: [3],
      explanation: `Check middle element at index ${mid}: ${a[mid].value}.`,
    };

    if (a[mid].value === target) {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: "=",
        pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
        indices: [mid],
        values: [a[mid].value],
        target,
        lines: [4],
        explanation: `Found target ${target} at index ${mid}.`,
      };
      yield {
        type: "found",
        id: a[mid].id,
        pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
        indices: [mid],
        values: [a[mid].value],
        lines: [4],
        explanation: `Search successful. Element ${target} located.`,
      };
      return;
    } else if (a[mid].value > target) {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: ">",
        pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
        indices: [mid],
        values: [a[mid].value],
        target,
        lines: [5],
        explanation: `Since ${a[mid].value} > ${target}, discard right half.`,
      };

      right = mid - 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: a[left].id, high: a[right].id },
          indices: [left, right],
          values: [a[left].value, a[right].value],
          lines: [6],
          explanation: `New search range: index ${left} (${a[left].value}) to index ${right} (${a[right].value}).`,
        };
      }
    } else {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: "<",
        pointers: { low: a[left].id, mid: a[mid].id, high: a[right].id },
        indices: [mid],
        values: [a[mid].value],
        target,
        lines: [7],
        explanation: `Since ${a[mid].value} < ${target}, discard left half.`,
      };

      left = mid + 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: a[left].id, high: a[right].id },
          indices: [left, right],
          values: [a[left].value, a[right].value],
          lines: [8],
          explanation: `New search range: index ${left} (${a[left].value}) to index ${right} (${a[right].value}).`,
        };
      }
    }
  }

  yield {
    type: "not-found",
    reason: "left > right",
    pointers: { low: a[left].id, high: a[right].id },
    target,
    lines: [9],
    explanation: `Search complete. ${target} not found in the array.`,
  };
}
