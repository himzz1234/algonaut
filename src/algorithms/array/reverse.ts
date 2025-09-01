import type { ArrayStep, Block } from "../types";

export function* reverse(arr: Block[]): Generator<ArrayStep> {
  const a = [...arr];

  yield { type: "init", op: "reverse", array: [...a], lines: [0] };

  const n = a.length;
  let i = 0;
  let j = n - 1;

  while (i < j) {
    yield {
      type: "highlight",
      ids: [a[i].id, a[j].id],
      indices: [i, j],
      values: [a[i].value, a[j].value],
      drag: false,
      role: "pair",
      pointers: { left: a[i].id, right: a[j].id },
      lines: [2],
    };

    [a[i], a[j]] = [a[j], a[i]];

    yield {
      type: "swap",
      ids: [a[i].id, a[j].id],
      indices: [i, j],
      values: [a[i].value, a[j].value],
      pointers: { left: a[j].id, right: a[i].id },
      lines: [3, 4],
    };

    i++;
    j--;
  }

  yield { type: "done", op: "reverse", lines: [5] };
}
