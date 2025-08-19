import type { Block, SearchingStep } from "../types";

export function* binarySearch(
  arr: Block[],
  target: number
): Generator<SearchingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a], target };

  let left = 0,
    right = a.length - 1;
  yield { type: "set-range", low: a[left].id, high: a[right].id };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    yield { type: "check", id: a[mid].id };

    if (a[mid].value === target) {
      yield { type: "compare", id: a[mid].id, relation: "=" };
      yield { type: "found", id: a[mid].id };
      return;
    } else if (a[mid].value > target) {
      yield { type: "compare", id: a[mid].id, relation: ">" };
      right = mid - 1;
      if (left <= right)
        yield { type: "set-range", low: a[left].id, high: a[right].id };
    } else {
      yield { type: "compare", id: a[mid].id, relation: "<" };
      left = mid + 1;
      if (left <= right)
        yield { type: "set-range", low: a[left].id, high: a[right].id };
    }
  }

  yield { type: "not-found", reason: "left > right" };
}
