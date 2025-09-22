import type { Block, SearchingStep } from "../types";

export function* linearSearch(
  arr: Block[],
  target: number
): Generator<SearchingStep> {
  const a = [...arr];
  yield {
    type: "init",
    array: [...a],
    target,
    lines: [0],
    explanation: `Let's search for ${target} in [${a
      .map((b) => b.value)
      .join(", ")}] using Linear search.`,
  };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    yield {
      type: "check",
      id: a[i].id,
      pointers: { index: a[i].id },
      lines: [1],
      explanation: `Compare element ${a[i].value} at index ${i} with ${target}.`,
    };

    if (a[i].value === target) {
      yield {
        type: "compare",
        id: a[i].id,
        relation: "=",
        pointers: { index: a[i].id },
        target,
        lines: [2],
        explanation: `Element ${a[i].value} equals target ${target}.`,
      };

      yield {
        type: "found",
        id: a[i].id,
        pointers: { index: a[i].id },
        lines: [2],
        explanation: `TA-DA! Target ${target} found at index ${i}.`,
      };
      return;
    } else if (a[i].value < target) {
      yield {
        type: "compare",
        id: a[i].id,
        relation: "<",
        pointers: { index: a[i].id },
        target,
        lines: [1],
        explanation: `Element ${a[i].value} is less than ${target}, continue searching.`,
      };
    } else {
      yield {
        type: "compare",
        id: a[i].id,
        relation: ">",
        pointers: { index: a[i].id },
        target,
        lines: [1],
        explanation: `Element ${a[i].value} is greater than ${target}, continue searching.`,
      };
    }
  }

  yield {
    type: "not-found",
    pointers: { index: a[n - 1].id },
    target,
    lines: [5],
    explanation: `Search complete. ${target} not found.`,
  };
}
