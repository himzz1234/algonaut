import type { Block, SearchingStep } from "../types";

export function* linearSearch(
  arr: Block[],
  target: number
): Generator<SearchingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a], target, lines: [0] };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    yield {
      type: "check",
      id: a[i].id,
      pointers: { index: i },
      indices: [i],
      values: [a[i].value],
      lines: [1],
    };

    if (a[i].value === target) {
      yield {
        type: "compare",
        id: a[i].id,
        relation: "=",
        pointers: { index: i },
        indices: [i],
        values: [a[i].value],
        target,
        lines: [2],
      };
      yield {
        type: "found",
        id: a[i].id,
        pointers: { index: i },
        indices: [i],
        values: [a[i].value],
        lines: [2],
      };
      return;
    } else if (a[i].value < target) {
      yield {
        type: "compare",
        id: a[i].id,
        relation: "<",
        pointers: { index: i },
        indices: [i],
        values: [a[i].value],
        target,
        lines: [3],
      };
    } else {
      yield {
        type: "compare",
        id: a[i].id,
        relation: ">",
        pointers: { index: i },
        indices: [i],
        values: [a[i].value],
        target,
        lines: [4],
      };
    }
  }

  yield {
    type: "not-found",
    reason: "end of array reached",
    pointers: { index: n - 1 },
    target,
    lines: [5],
  };
}
