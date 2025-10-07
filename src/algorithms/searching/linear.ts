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
      .join(", ")}] using Linear Search.`,
  };

  const n = a.length;
  for (let i = 0; i < n; i++) {
    const relation =
      a[i].value === target ? "=" : a[i].value < target ? "<" : ">";

    yield {
      type: "compare",
      id: a[i].id,
      relation,
      pointers: { index: a[i].id },
      target,
      lines: [1, 2],
      explanation: `Compare element ${a[i].value} at index ${i} with target ${target}.`,
    };

    if (a[i].value === target) {
      yield {
        type: "found",
        id: a[i].id,
        pointers: { index: a[i].id },
        lines: [3],
        explanation: `Target ${target} found at index ${i}.`,
      };
      return;
    }
  }

  yield {
    type: "not-found",
    pointers: { index: a[n - 1].id },
    target,
    lines: [4],
    explanation: `Search complete. ${target} not found in the array.`,
  };
}
