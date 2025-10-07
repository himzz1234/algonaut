import type { ArrayStep, Block } from "../types";

export function* kadane(arr: Block[]): Generator<ArrayStep> {
  const a = [...arr];
  if (a.length === 0) return;

  let sum = a[0].value;
  let max = a[0].value;
  let startIndex = 0;
  let bestRange: [number, number] = [0, 0];

  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `We need to find the maximum sum subarray in [${a
      .map((b) => b.value)
      .join(", ")}].`,
  };

  yield {
    type: "highlight",
    ids: [a[0].id],
    drag: false,
    role: "current",
    pointers: {
      sum: { ids: [a[0].id], value: sum },
      max: { ids: [a[0].id], value: max },
    },
    lines: [2],
    explanation: `Start with the first element ${a[0].value} as both sum and max.`,
  };

  for (let i = 1; i < a.length; i++) {
    const value = a[i].value;
    const newCurrent = sum + value;

    if (newCurrent >= value) {
      sum = newCurrent;
    } else {
      sum = value;
      startIndex = i;
    }

    const ids = a.slice(startIndex, i + 1).map((b) => b.id);

    yield {
      type: "highlight",
      ids,
      role: "subarray",
      lines: newCurrent >= value ? [4, 5] : [6, 7],
      drag: false,
      pointers: {
        sum: { ids, value: sum },
        max: {
          ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
          value: max,
        },
      },
      explanation:
        newCurrent >= value
          ? `Extend the subarray by adding ${value}. Now sum = ${sum}.`
          : `Restart a new subarray at ${value}, since it’s larger alone.`,
    };

    if (sum > max) {
      max = sum;
      bestRange = [startIndex, i];

      yield {
        type: "highlight",
        ids,
        role: "subarray",
        lines: [8, 9],
        drag: false,
        pointers: {
          sum: { ids, value: sum },
          max: { ids, value: max },
        },
        explanation: `Update max to ${max}, the largest sum found so far.`,
      };
    }
  }

  yield {
    type: "done",
    lines: [10],
    pointers: {
      sum: {
        ids: a.slice(startIndex, a.length).map((b) => b.id),
        value: sum,
      },
      max: {
        ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
        value: max,
      },
    },
    explanation: `Kadane’s algorithm complete. The maximum subarray sum is ${max}.`,
  };
}
