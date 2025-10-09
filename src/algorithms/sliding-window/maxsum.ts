import type { Block, SlidingWindowStep } from "../types";

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
    explanation: `We need to find the max sum of window of size ${k}.`,
  };

  let sum = 0;
  for (let i = 0; i < k; i++) sum += a[i].value;
  let maxSum = sum;
  let bestRange: [number, number] = [0, k - 1];

  yield {
    type: "expand",
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
    explanation: `Start with the first window that sum up to ${sum}.`,
  };

  for (let right = k; right < a.length; right++) {
    const left = right - k;
    const exitingBlock = a[left];
    const enteringBlock = a[right];

    sum -= exitingBlock.value;
    yield {
      type: "shrink",
      ids: a.slice(left + 1, right).map((b) => b.id),
      pointers: {
        sum: {
          ids: a.slice(left + 1, right).map((b) => b.id),
          value: sum,
          pos: "top",
        },
        maxSum: {
          ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
          value: maxSum,
          pos: "bottom",
        },
      },
      lines: [3],
      explanation: `Remove ${exitingBlock.value} since adding a new element would exceed window size ${k}.`,
    };

    sum += enteringBlock.value;
    const currentIds = a.slice(left + 1, right + 1).map((b) => b.id);
    yield {
      type: "expand",
      ids: currentIds,
      pointers: {
        sum: {
          ids: currentIds,
          value: sum,
          pos: "top",
        },
        maxSum: {
          ids: a.slice(bestRange[0], bestRange[1] + 1).map((b) => b.id),
          value: maxSum,
          pos: "bottom",
        },
      },
      lines: [4],
      explanation: `Add ${enteringBlock.value} to maintain the window size and update the sum to ${sum}.`,
    };

    if (sum > maxSum) {
      maxSum = sum;
      bestRange = [left + 1, right];

      yield {
        type: "found",
        ids: currentIds,
        pointers: {
          sum: {
            ids: currentIds,
            value: sum,
            pos: "top",
          },
          maxSum: {
            ids: currentIds,
            value: maxSum,
            pos: "bottom",
          },
        },
        lines: [5],
        explanation: `This window gives a new max sum of ${maxSum}.`,
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
    lines: [6],
    explanation: `Done. The largest window sum is ${maxSum}.`,
  };
}
