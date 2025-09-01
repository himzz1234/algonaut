import type { Block, SortingStep } from "../types";

export function* bubbleSort(arr: Block[]): Generator<SortingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a], lines: [0] };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const relation =
        a[j].value === a[j + 1].value
          ? "="
          : a[j].value > a[j + 1].value
          ? ">"
          : "<";

      yield {
        type: "compare",
        ids: [a[j].id, a[j + 1].id],
        indices: [j, j + 1],
        values: [a[j].value, a[j + 1].value],
        relation,
        pointers: { i: j, j: j + 1 },
        lines: [2],
      };

      if (relation === ">") {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield {
          type: "swap",
          ids: [a[j].id, a[j + 1].id],
          indices: [j, j + 1],
          values: [a[j].value, a[j + 1].value],
          pointers: { i: j, j: j + 1 },
          lines: [3],
        };
      }
    }

    yield {
      type: "mark_sorted",
      ids: [a[n - i - 1].id],
      indices: [n - i - 1],
      values: [a[n - i - 1].value],
      lines: [4],
    };
  }

  yield { type: "done", lines: [5] };
}
