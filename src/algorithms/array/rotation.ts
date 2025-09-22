import type { ArrayStep, Block } from "../types";

export function* rotation(arr: Block[], k: number): Generator<ArrayStep> {
  const a = [...arr];
  const n = a.length;
  k = k % n;

  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `We will rotate [${a
      .map((b) => b.value)
      .join(", ")}] by ${k} step${k !== 1 ? "s" : ""}.`,
  };

  for (let r = 0; r < k; r++) {
    const element = a[0];

    yield {
      type: "highlight",
      ids: [element.id],
      drag: false,
      role: "current",
      pointers: { current: element.id },
      lines: [1, 2],
      explanation: `Take out ${element.value} from the front.`,
    };

    yield {
      type: "remove",
      id: element.id,
      fromIndex: 0,
      value: element.value,
      depth: 1,
      pointers: { temp: element.id },
      lines: [1, 2],
      explanation: `${element.value} is temporarily removed.`,
    };

    for (let j = 1; j < n; j++) {
      yield {
        type: "highlight",
        ids: [a[j].id],
        drag: false,
        role: "current",
        pointers: { temp: element.id, current: a[j].id },
        lines: [3],
        explanation: `Shift ${a[j].value} left by one position.`,
      };

      yield {
        type: "move",
        id: a[j].id,
        targetIndex: j - 1,
        pointers: { temp: element.id, current: a[j].id },
        lines: [3],
        explanation: `${a[j].value} moved to index ${j - 1}.`,
      };
    }

    yield {
      type: "insert",
      id: element.id,
      targetIndex: n - 1,
      depth: 0,
      lines: [4],
      explanation: `Place ${element.value} at the end.`,
    };

    a.splice(0, 1);
    a.push(element);
  }

  yield {
    type: "done",
    lines: [5],
    explanation: `Rotation complete → [${a.map((b) => b.value).join(", ")}].`,
  };
}
