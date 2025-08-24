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
  };

  yield {
    type: "set-range",
    low: a[left].id,
    high: a[right].id,
    pointers: { low: left, high: right },
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    yield {
      type: "check",
      id: a[mid].id,
      pointers: { low: left, mid, high: right },
    };

    if (a[mid].value === target) {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: "=",
        pointers: { low: left, mid, high: right },
      };
      yield {
        type: "found",
        id: a[mid].id,
        pointers: { low: left, mid, high: right },
      };
      return;
    } else if (a[mid].value > target) {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: ">",
        pointers: { low: left, mid, high: right },
      };

      right = mid - 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: left, high: right },
        };
      }
    } else {
      yield {
        type: "compare",
        id: a[mid].id,
        relation: "<",
        pointers: { low: left, mid, high: right },
      };

      left = mid + 1;
      if (left <= right) {
        yield {
          type: "set-range",
          low: a[left].id,
          high: a[right].id,
          pointers: { low: left, high: right },
        };
      }
    }
  }

  yield {
    type: "not-found",
    reason: "left > right",
    pointers: { low: left, high: right },
  };
}
