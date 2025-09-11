import type { ArrayStep, Block } from "../types";

export function* reverse(arr: Block[]): Generator<ArrayStep> {
  const a = [...arr];

  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `We need to reverse [${a.map((b) => b.value).join(", ")}].`,
  };

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
      explanation: `Focus on the two ends: ${a[i].value} (left) and ${a[j].value} (right).`,
    };

    [a[i], a[j]] = [a[j], a[i]];

    yield {
      type: "swap",
      ids: [a[i].id, a[j].id],
      indices: [i, j],
      values: [a[i].value, a[j].value],
      pointers: { left: a[j].id, right: a[i].id },
      lines: [3, 4],
      explanation: `Swap them → positions ${i} and ${j} are now reversed.`,
    };

    i++;
    j--;
  }

  yield {
    type: "done",
    op: "reverse",
    lines: [5],
    explanation: `The array is fully reversed: [${a
      .map((b) => b.value)
      .join(", ")}].`,
  };
}
