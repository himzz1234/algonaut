import type { Block, SortingStep } from "../types";

export function* selectionSort(arr: Block[]): Generator<SortingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a] };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;

    yield {
      type: "highlight",
      ids: [a[minIdx].id],
      role: "min",
      drag: false,
      pointers: { min: minIdx },
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
        pointers: { min: minIdx, current: j },
      };

      if (relation === ">") {
        minIdx = j;
        yield {
          type: "highlight",
          ids: [a[minIdx].id],
          role: "min",
          drag: false,
          pointers: { min: minIdx, current: j },
        };
      }
    }

    if (minIdx !== i) {
      yield {
        type: "compare",
        ids: [a[minIdx].id, a[i].id],
        relation: ">",
        pointers: { min: minIdx, destination: i },
      };

      [a[i], a[minIdx]] = [a[minIdx], a[i]];

      yield {
        type: "swap",
        ids: [a[i].id, a[minIdx].id],
        pointers: { min: i, destination: minIdx },
      };
    }

    yield {
      type: "mark_sorted",
      ids: [a[i].id],
    };
  }

  yield { type: "done" };
}
