import type { Block, SortingStep } from "../types";

export function* selectionSort(arr: Block[]): Generator<SortingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a], lines: [0] };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;

    yield {
      type: "highlight",
      ids: [a[minIdx].id],
      role: "min",
      drag: false,
      pointers: { min: minIdx },
      indices: [minIdx],
      values: [a[minIdx].value],
      lines: [2],
    };

    for (let j = i + 1; j < n; j++) {
      const relation =
        a[minIdx].value === a[j].value
          ? "="
          : a[minIdx].value > a[j].value
          ? ">"
          : "<";

      yield {
        type: "compare",
        ids: [a[minIdx].id, a[j].id],
        relation,
        pointers: { min: minIdx, j },
        indices: [minIdx, j],
        values: [a[minIdx].value, a[j].value],
        lines: [3],
      };

      if (relation === ">") {
        minIdx = j;
        yield {
          type: "highlight",
          ids: [a[minIdx].id],
          role: "min",
          drag: false,
          pointers: { min: minIdx, j },
          indices: [minIdx],
          values: [a[minIdx].value],
          lines: [4],
        };
      }
    }

    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];

      yield {
        type: "swap",
        ids: [a[i].id, a[minIdx].id],
        pointers: { min: i, i: minIdx },
        indices: [minIdx, i],
        values: [a[i].value, a[minIdx].value],
        lines: [5],
      };
    }

    yield {
      type: "mark_sorted",
      ids: [a[i].id],
      indices: [i],
      values: [a[i].value],
      lines: [6],
    };
  }

  yield { type: "done", lines: [7] };
}
