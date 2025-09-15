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
    explanation: `Start linear search for ${target} in [${a
      .map((b) => b.value)
      .join(", ")}].`,
  };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    yield {
      type: "check",
      id: a[i].id,
      pointers: { index: a[i].id },
      indices: [i],
      values: [a[i].value],
      lines: [1],
      explanation: `Check element ${a[i].value} at index ${i}.`,
    };

    if (a[i].value === target) {
      yield {
        type: "compare",
        id: a[i].id,
        relation: "=",
        pointers: { index: a[i].id },
        indices: [i],
        values: [a[i].value],
        target,
        lines: [2],
        explanation: `Element ${a[i].value} equals target ${target}.`,
      };
      yield {
        type: "found",
        id: a[i].id,
        pointers: { index: a[i].id },
        indices: [i],
        values: [a[i].value],
        lines: [2],
        explanation: `Target ${target} found at index ${i}.`,
      };
      return;
    } else if (a[i].value < target) {
      yield {
        type: "compare",
        id: a[i].id,
        relation: "<",
        pointers: { index: a[i].id },
        indices: [i],
        values: [a[i].value],
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
        indices: [i],
        values: [a[i].value],
        target,
        lines: [1],
        explanation: `Element ${a[i].value} is greater than ${target}, continue searching.`,
      };
    }
  }

  yield {
    type: "not-found",
    reason: "end of array reached",
    pointers: { index: a[n - 1].id },
    target,
    lines: [5],
    explanation: `Reached end of array. Target ${target} not found.`,
  };
}
