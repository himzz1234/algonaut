import type { Block, TwoPointerStep } from "../types";

export function* twoSum(
  arr: Block[],
  target: number
): Generator<TwoPointerStep> {
  const a = [...arr];
  let left = 0;
  let right = a.length - 1;

  yield {
    type: "init",
    array: [...a],
    explanation: `We need two numbers that add up to ${target}.`,
    lines: [0],
  };

  while (left < right) {
    const sum = a[left].value + a[right].value;

    yield {
      type: "highlight",
      ids: [a[left].id, a[right].id],
      pointers: {
        sum: { ids: [a[left].id, a[right].id], value: sum },
        left: a[left].id,
        right: a[right].id,
      },
      explanation: `Check ${a[left].value} + ${a[right].value} = ${sum}.`,
      lines: [1, 2],
    };

    if (sum === target) {
      yield {
        type: "compare",
        ids: [a[left].id, a[right].id],
        relation: "=",
        explanation: `Nice! ${sum} equals ${target}.`,
        lines: [3, 4],
      };

      return yield {
        type: "found",
        ids: [a[left].id, a[right].id],
        explanation: `Found the pair: ${a[left].value} and ${a[right].value}.`,
        lines: [3, 4],
      };
    } else if (sum < target) {
      yield {
        type: "compare",
        ids: [a[left].id, a[right].id],
        relation: "<",
        explanation: `${sum} is too small. Let's move the left pointer right.`,
        lines: [5, 6],
      };

      left++;
    } else {
      yield {
        type: "compare",
        ids: [a[left].id, a[right].id],
        relation: ">",
        explanation: `${sum} is too big. Let's move the right pointer left.`,
        lines: [7, 8],
      };

      right--;
    }
  }

  yield {
    type: "not-found",
    explanation: `We checked everything. No pair adds up to ${target}.`,
    lines: [9],
  };
}
