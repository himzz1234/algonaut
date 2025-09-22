import type { Block, TwoPointerStep } from "../types";

export function* mostWater(arr: Block[]): Generator<TwoPointerStep> {
  const a = [...arr];
  let left = 0;
  let right = a.length - 1;
  let maxArea = 0;
  let bestPair: [number, number] = [left, right];

  yield {
    type: "init",
    array: [...a],
    showBars: "centered",
    explanation: "We need the container that holds the most water.",
    lines: [0],
  };

  while (left < right) {
    const height = Math.min(a[left].value, a[right].value);
    const width = right - left;
    const area = height * width;

    if (area > maxArea) {
      maxArea = area;
      bestPair = [left, right];
    }

    yield {
      type: "highlight",
      ids: [a[left].id, a[right].id],
      explanation: `Check bars at ${left} and ${right}. Height = ${height}, width = ${width}, area = ${area}.`,
      overlays: [
        {
          kind: "range",
          ids: [a[bestPair[0]].id, a[bestPair[1]].id],
          value: maxArea,
          style: "best",
          label: `max = ${maxArea}`,
        },
        {
          kind: "range",
          ids: [a[left].id, a[right].id],
          value: area,
          style: "candidate",
          label: `area = ${area}`,
        },
      ],
      pointers: { left: a[left].id, right: a[right].id },
      lines: [1, 2],
    };

    yield {
      type: "compare",
      ids: [a[left].id, a[right].id],
      relation:
        a[left].value < a[right].value
          ? "<"
          : a[left].value > a[right].value
          ? ">"
          : "=",
      explanation:
        a[left].value < a[right].value
          ? `Left bar ${a[left].value} is smaller, so move left pointer.`
          : `Right bar ${a[right].value} is smaller or equal, so move right pointer.`,
      lines: a[left].value < a[right].value ? [4, 5] : [6, 7],
    };

    if (a[left].value < a[right].value) {
      left++;
    } else {
      right--;
    }
  }

  yield {
    type: "done",
    explanation: `Done! The biggest area is ${maxArea}, made by bars at ${bestPair[0]} and ${bestPair[1]}.`,
    overlays: [
      {
        kind: "range",
        ids: [a[bestPair[0]].id, a[bestPair[1]].id],
        value: maxArea,
        style: "best",
        label: `max = ${maxArea}`,
      },
    ],
    lines: [7],
  };
}
