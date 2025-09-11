import type { Block, SortingStep } from "../types";

export function* bubbleSort(arr: Block[]): Generator<SortingStep> {
  const a = [...arr];
  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `Start Bubble Sort on [${a.map((b) => b.value).join(", ")}].`,
  };

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
        relation,
        pointers: { i: a[j].id, j: a[j + 1].id },
        lines: [2],
        explanation: `Compare ${a[j].value} and ${a[j + 1].value} → ${
          a[j].value
        } ${relation} ${a[j + 1].value}.`,
      };

      if (relation === ">") {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield {
          type: "swap",
          ids: [a[j].id, a[j + 1].id],
          pointers: { i: a[j + 1].id, j: a[j].id },
          lines: [3],
          explanation: `Swap to place ${a[j].value} before ${a[j + 1].value}.`,
        };
      }
    }

    yield {
      type: "mark_sorted",
      ids: [a[n - i - 1].id],
      lines: [4],
      explanation: `${a[n - i - 1].value} is now in its correct position.`,
    };
  }

  yield {
    type: "done",
    lines: [5],
    explanation: `Array is sorted with Bubble Sort.`,
  };
}
