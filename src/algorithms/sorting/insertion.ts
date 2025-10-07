import type { Block, SortingStep } from "../types";

export function* insertionSort(arr: Block[]): Generator<SortingStep> {
  const a = [...arr];
  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `Lets perform Insertion sort on [${a
      .map((b) => b.value)
      .join(", ")}].`,
  };

  for (let i = 1; i < a.length; i++) {
    yield {
      type: "highlight",
      ids: [a[i].id],
      drag: true,
      depth: 1,
      pointers: { key: a[i].id },
      lines: [2],
      explanation: `Pick ${a[i].value} as the key element to insert.`,
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
        pointers: { key: a[j + 1].id, j: a[j].id },
        lines: [3],
        explanation: `Compare ${a[j].value} and key ${a[j + 1].value}.`,
      };

      if (relation === ">") {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield {
          type: "swap",
          ids: [a[j].id, a[j + 1].id],
          pointers: { key: a[j].id, j: a[j + 1].id },
          lines: [4, 5],
          explanation: `Shift ${a[j + 1].value} right since ${
            a[j + 1].value
          } is smaller than ${a[j].value}.`,
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
      pointers: { key: a[finalIndex].id },
      lines: [6],
      explanation: `Place key at position ${finalIndex}.`,
    };

    yield {
      type: "mark_sorted",
      ids: a.slice(0, i + 1).map((b) => b.id),
      lines: [6],
      explanation: `First ${i + 1} elements are now in their sorted positions.`,
    };
  }

  yield {
    type: "done",
    lines: [7],
    explanation: `Insertion Sort complete.`,
  };
}
