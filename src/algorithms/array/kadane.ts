import type { ArrayStep, Block } from "../types";

export function* kadane(arr: Block[]): Generator<ArrayStep> {
  const a = [...arr];
  if (a.length === 0) return;

  let currentSum = a[0].value;
  let maxSum = a[0].value;
  let startIndex = 0;

  yield {
    type: "init",
    array: [...a],
    variables: {
      [a.length + 1]: { id: a.length + 1, value: maxSum, label: "maxsum" },
    },
    lines: [0],
    explanation: `We need to find the maximum sum subarray in [${a
      .map((b) => b.value)
      .join(", ")}].`,
  };

  yield {
    type: "highlight",
    ids: [a[0].id],
    indices: [0],
    values: [a[0].value],
    drag: false,
    role: "current",
    pointers: { currentsum: { ids: [a[0].id], value: currentSum } },
    lines: [3],
    explanation: `Start with the first element ${a[0].value} as both currentSum and maxSum.`,
  };

  for (let i = 1; i < a.length; i++) {
    const value = a[i].value;
    const newCurrent = currentSum + value;

    if (newCurrent >= value) {
      currentSum = newCurrent;
    } else {
      currentSum = value;
      startIndex = i;
    }

    const ids = a.slice(startIndex, i + 1).map((b) => b.id);

    yield {
      type: "highlight",
      ids,
      indices: ids.map((_, idx) => startIndex + idx),
      values: ids.map((id) => a.find((b) => b.id === id)!.value),
      role: "subarray",
      lines: newCurrent >= value ? [3, 4] : [5, 6],
      drag: false,
      pointers: {
        currentsum: { ids, value: currentSum },
      },
      explanation:
        newCurrent >= value
          ? `Extend the subarray by adding ${value}. Now currentSum = ${currentSum}.`
          : `Restart a new subarray at ${value}, since it’s larger alone.`,
    };

    if (currentSum > maxSum) {
      maxSum = currentSum;

      yield {
        type: "overwrite",
        id: a.length + 1,
        value: currentSum,
        lines: [7, 8],
        explanation: `Update maxSum to ${maxSum}, the largest sum found so far.`,
      };
    }
  }

  yield {
    type: "done",
    lines: [9],
    pointers: {
      currentsum: {
        ids: a.slice(startIndex, a.length).map((b) => b.id),
        value: currentSum,
      },
    },
    explanation: `Kadane’s algorithm complete. The maximum subarray sum is ${maxSum}.`,
  };
}
