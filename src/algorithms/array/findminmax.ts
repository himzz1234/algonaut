import type { ArrayStep, Block } from "../types";

export function* findMinMax(arr: Block[]): Generator<ArrayStep> {
  const a = [...arr];
  if (a.length === 0) return;

  let min = a[0].value;
  let max = a[0].value;
  let minId = a[0].id;
  let maxId = a[0].id;

  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `We need to find the minimum and maximum elements in [${a
      .map((b) => b.value)
      .join(", ")}].`,
  };

  yield {
    type: "highlight",
    ids: [a[0].id],
    drag: false,
    role: "current",
    pointers: { i: a[0].id, min: minId, max: maxId },
    lines: [1],
    explanation: `Start with the first element ${a[0].value} as both min and max.`,
  };

  for (let i = 1; i < a.length; i++) {
    const value = a[i].value;

    let explanation = `Compare element ${value} with current min (${min}) and max (${max}).`;

    if (value < min) {
      min = value;
      minId = a[i].id;
      explanation = `Update min to ${min}, since ${value} is smaller than the previous min.`;
      yield {
        type: "highlight",
        ids: [a[i].id],
        role: "current",
        lines: [3],
        drag: false,
        pointers: { i: a[i].id, min: minId, max: maxId },
        explanation,
      };
    } else if (value > max) {
      max = value;
      maxId = a[i].id;
      explanation = `Update max to ${max}, since ${value} is larger than the previous max.`;
      yield {
        type: "highlight",
        ids: [a[i].id],
        role: "current",
        lines: [4],
        drag: false,
        pointers: { i: a[i].id, min: minId, max: maxId },
        explanation,
      };
    } else {
      yield {
        type: "highlight",
        ids: [a[i].id],
        role: "current",
        lines: [2, 3, 4],
        drag: false,
        pointers: { i: a[i].id, min: minId, max: maxId },
        explanation: `Compare element ${value} with current min (${min}) and max (${max}).`,
      };
    }
  }

  yield {
    type: "done",
    lines: [5],
    pointers: { min: minId, max: maxId },
    explanation: `Done! The minimum element is ${min} and the maximum element is ${max}.`,
  };
}
