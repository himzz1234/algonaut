import type { Block, SearchingStep } from "../types";

export function* linearSearch(
  arr: Block[],
  target: number
): Generator<SearchingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a], target };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    yield { type: "check", id: a[i].id, pointers: { index: i } };

    if (a[i].value === target) {
      yield {
        type: "compare",
        id: a[i].id,
        relation: "=",
        pointers: { index: i },
      };
      yield { type: "found", id: a[i].id, pointers: { index: i } };
      return;
    } else if (a[i].value < target) {
      yield {
        type: "compare",
        id: a[i].id,
        relation: "<",
        pointers: { index: i },
      };
    } else {
      yield {
        type: "compare",
        id: a[i].id,
        relation: ">",
        pointers: { index: i },
      };
    }
  }

  yield {
    type: "not-found",
    reason: "end of array reached",
    pointers: { index: n - 1 },
  };
}
