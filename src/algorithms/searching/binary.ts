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
  };

  yield {
    type: "set-range",
    low: a[left].id,
    high: a[right].id,
    pointers: { low: left, high: right },
    indices: [left, right],
    values: [a[left].value, a[right].value],
    lines: [1],
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    yield {
      type: "check",
      id: a[mid].id,
      pointers: { low: left, mid, high: right },
      indices: [mid],
      values: [a[mid].value],
      lines: [3],
    };

    if (a[mid].value === target) {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: "=",
        pointers: { low: left, mid, high: right },
        indices: [mid],
        values: [a[mid].value],
        target,
        lines: [4],
      };
      yield {
        type: "found",
        id: a[mid].id,
        pointers: { low: left, mid, high: right },
        indices: [mid],
        values: [a[mid].value],
        lines: [4],
      };
      return;
    } else if (a[mid].value > target) {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: ">",
        pointers: { low: left, mid, high: right },
        indices: [mid],
        values: [a[mid].value],
        target,
        lines: [5],
      };

      right = mid - 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: left, high: right },
          indices: [left, right],
          values: [a[left].value, a[right].value],
          lines: [6],
        };
      }
    } else {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: "<",
        pointers: { low: left, mid, high: right },
        indices: [mid],
        values: [a[mid].value],
        target,
        lines: [7],
      };

      left = mid + 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: left, high: right },
          indices: [left, right],
          values: [a[left].value, a[right].value],
          lines: [8],
        };
      }
    }
  }

  yield {
    type: "not-found",
    reason: "left > right",
    pointers: { low: left, high: right },
    target,
    lines: [9],
  };
}
