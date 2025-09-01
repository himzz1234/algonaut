import type { Block, SortingStep } from "../types";

export function* insertionSort(arr: Block[]): Generator<SortingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a], lines: [0] };

  for (let i = 1; i < a.length; i++) {
    yield {
      type: "highlight",
      ids: [a[i].id],
      drag: true,
      depth: 1,
      role: "key",
      pointers: { key: i },
      indices: [i],
      values: [a[i].value],
      lines: [2],
    };

    let j = i - 1;
    while (j >= 0) {
      const relation =
        a[j].value === a[j + 1].value
          ? "="
          : a[j].value > a[j + 1].value
          ? ">"
          : "<";

      yield {
        type: "compare",
        ids: [a[j].id, a[j + 1].id],
        relation,
        pointers: { key: j + 1, j: j },
        indices: [j, j + 1],
        values: [a[j].value, a[j + 1].value],
        lines: [3],
      };

      if (relation === ">") {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield {
          type: "swap",
          ids: [a[j].id, a[j + 1].id],
          pointers: { key: j, j: j + 1 },
          indices: [j + 1, j],
          values: [a[j].value, a[j + 1].value],
          lines: [3, 4],
        };
      } else break;
      j--;
    }

    const finalIndex = j + 1;

    yield {
      type: "highlight",
      ids: [a[finalIndex].id],
      drag: true,
      depth: 0,
      role: "key",
      pointers: { key: finalIndex },
      indices: [finalIndex],
      values: [a[finalIndex].value],
      lines: [5],
    };

    yield {
      type: "mark_sorted",
      ids: a.slice(0, i + 1).map((b) => b.id),
      indices: a.slice(0, i + 1).map((_, idx) => idx),
      values: a.slice(0, i + 1).map((b) => b.value),
      lines: [6],
    };
  }

  yield { type: "done", lines: [7] };
}
