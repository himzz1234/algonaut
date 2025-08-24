import type { Block, SortingStep } from "../types";

export function* insertionSort(arr: Block[]): Generator<SortingStep> {
  const a = [...arr];
  yield { type: "init", array: [...a] };

  for (let i = 1; i < a.length; i++) {
    yield {
      type: "highlight",
      ids: [a[i].id],
      drag: true,
      depth: 1,
      role: "key",
      pointers: { key: i },
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
        pointers: { key: j + 1, index: j },
      };

      if (relation === ">") {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield {
          type: "swap",
          ids: [a[j].id, a[j + 1].id],
          pointers: { key: j, index: j + 1 },
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
    };

    yield {
      type: "mark_sorted",
      ids: a.slice(0, i + 1).map((b) => b.id),
    };
  }

  yield { type: "done" };
}
