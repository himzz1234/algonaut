import type { Block } from "../types";
import type { SlidingWindowStep } from "../types";

export function* maxSumSubarrayK(
  arr: Block[],
  k: number
): Generator<SlidingWindowStep> {
  const a = [...arr];
  if (a.length === 0 || k <= 0 || k > a.length) return;

  yield {
    type: "init",
    array: [...a],
    k,
    lines: [0],
    explanation: `We want the maximum sum of a subarray of size ${k} in [${a
      .map((b) => b.value)
      .join(", ")}].`,
  };

  let sum = 0;
  for (let i = 0; i < k; i++) sum += a[i].value;

  let maxSum = sum;
  let bestRange: [number, number] = [0, k - 1];

  yield {
    type: "highlight",
    ids: a.slice(0, k).map((b) => b.id),
    pointers: {
      sum: {
        ids: a.slice(0, k).map((b) => b.id),
        value: sum,
        pos: "top",
      },
      maxSum: {
        ids: a.slice(0, k).map((b) => b.id),
        value: maxSum,
        pos: "bottom",
      },
    },
    lines: [1, 2],
    explanation: `First window: [${a
      .slice(0, k)
      .map((b) => b.value)
      .join(", ")}], sum = ${sum}.`,
  };

  for (let right = k; right < a.length; right++) {
    const left = right - k;
    const exiting = a[left].value;
    const entering = a[right].value;

    sum = sum - exiting + entering;

    yield {
      type: "highlight",
      ids: a.slice(left + 1, right + 1).map((b) => b.id),
      pointers: {
        sum: {
          ids: a.slice(left + 1, right + 1).map((b) => b.id),
          value: sum,
          pos: "top",
        },
        maxSum: {
          ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
          value: maxSum,
          pos: "bottom",
        },
      },
      lines: [3, 4],
      explanation: `Move window → drop ${exiting}, add ${entering}, new sum = ${sum}.`,
    };

    if (sum > maxSum) {
      maxSum = sum;
      bestRange = [left + 1, right];

      yield {
        type: "found",
        ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
        pointers: {
          sum: {
            ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
            value: sum,
            pos: "top",
          },
          maxSum: {
            ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
            value: maxSum,
            pos: "bottom",
          },
        },
        lines: [5, 6],
        explanation: `Found bigger sum = ${maxSum} at window [${a
          .slice(bestRange[0], bestRange[1] + 1)
          .map((b) => b.value)
          .join(", ")}].`,
      };
    }
  }

  yield {
    type: "found",
    ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
    pointers: {
      maxSum: {
        ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
        value: maxSum,
        pos: "bottom",
      },
    },
    lines: [7],
    explanation: `Done. Max sum = ${maxSum} from window [${a
      .slice(bestRange[0], bestRange[1] + 1)
      .map((b) => b.value)
      .join(", ")}].`,
  };
}
