import type { Block, SearchingStep } from "../types";

export function* linearSearch(
  arr: Block[],
  target: number
): Generator<SearchingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a], target };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    yield { type: "check", id: a[i].id };

    if (a[i].value === target) {
      yield { type: "compare", id: a[i].id, relation: "=" };
      yield { type: "found", id: a[i].id };
      return;
    } else if (a[i].value < target) {
      yield { type: "compare", id: a[i].id, relation: "<" };
    } else {
      yield { type: "compare", id: a[i].id, relation: ">" };
    }
  }

  yield { type: "not-found", reason: "end of array reached" };
}
