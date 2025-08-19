import type { Block, SortingStep } from "../types";

export function* bubbleSort(arr: Block[]): Generator<SortingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a] };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const relation =
        a[j].value === a[j + 1].value
          ? "="
          : a[j].value > a[j + 1].value
          ? ">"
          : "<";

      yield { type: "compare", ids: [a[j].id, a[j + 1].id], relation };

      if (relation === ">") {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { type: "swap", ids: [a[j].id, a[j + 1].id] };
      }
    }
    yield { type: "mark_sorted", ids: [a[n - i - 1].id] };
  }

  yield { type: "done" };
}
