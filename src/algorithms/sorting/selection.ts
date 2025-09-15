import type { Block, SortingStep } from "../types";

export function* selectionSort(arr: Block[]): Generator<SortingStep> {
  const a = [...arr];
  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `Start Selection Sort on [${a
      .map((b) => b.value)
      .join(", ")}].`,
  };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;

    yield {
      type: "highlight",
      ids: [a[minIdx].id],
      drag: false,
      pointers: { min: a[minIdx].id, i: a[minIdx].id },
      lines: [2],
      explanation: `Assume ${a[minIdx].value} (index ${minIdx}) is the minimum.`,
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
        pointers: { min: a[minIdx].id, j: a[j].id, i: a[i].id },
        lines: [3],
        explanation: `Compare current min ${a[minIdx].value} with ${a[j].value}.`,
      };

      if (relation === ">") {
        minIdx = j;
        yield {
          type: "highlight",
          ids: [a[minIdx].id],
          drag: false,
          pointers: { min: a[minIdx].id, j: a[j].id, i: a[i].id },
          lines: [4],
          explanation: `New minimum found: ${a[minIdx].value} at index ${minIdx}.`,
        };
      }
    }

    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];

      yield {
        type: "swap",
        ids: [a[i].id, a[minIdx].id],
        pointers: { i: a[i].id, min: a[minIdx].id },
        lines: [5],
        explanation: `Swap ${a[minIdx].value} into position ${i}.`,
      };
    }

    yield {
      type: "mark_sorted",
      ids: [a[i].id],
      lines: [6],
      explanation: `${a[i].value} is now fixed in sorted order.`,
    };
  }

  yield {
    type: "done",
    lines: [7],
    explanation: `Selection Sort complete.`,
  };
}
