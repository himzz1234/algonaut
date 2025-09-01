import type { ArrayStep, Block } from "../types";

export function* rotation(arr: Block[], k: number): Generator<ArrayStep> {
  const a = [...arr];
  const n = a.length;
  k = k % n;

  yield {
    type: "init",
    op: "rotate",
    array: [...a],
    meta: { k },
    lines: [0],
  };

  for (let r = 0; r < k; r++) {
    const element = a[0];

    yield {
      type: "highlight",
      ids: [element.id],
      indices: [0],
      values: [element.value],
      drag: false,
      role: "current",
      pointers: { current: element.id },
      lines: [1, 2],
    };

    yield {
      type: "remove",
      id: element.id,
      fromIndex: 0,
      value: element.value,
      depth: 1,
      pointers: { temp: element.id },
      lines: [1, 2],
    };

    for (let j = 1; j < n; j++) {
      yield {
        type: "highlight",
        ids: [a[j].id],
        indices: [j],
        values: [a[j].value],
        drag: false,
        role: "current",
        pointers: { temp: element.id, current: a[j].id },
        lines: [3],
      };

      yield {
        type: "move",
        id: a[j].id,
        targetIndex: j - 1,
        indices: [j, j - 1],
        values: [a[j].value, a[j].value],
        pointers: { temp: element.id, current: a[j].id },
        lines: [3],
      };
    }

    yield {
      type: "insert",
      id: element.id,
      targetIndex: n - 1,
      indices: [n - 1],
      values: [element.value],
      depth: 0,
      lines: [4],
    };

    a.splice(0, 1);
    a.push(element);
  }

  yield { type: "done", op: "rotate", lines: [5] };
}
