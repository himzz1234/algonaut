import type { Block, TwoPointerStep } from "../types";

export function* threeSum(
  arr: Block[],
  target: number
): Generator<TwoPointerStep> {
  const a = [...arr];

  yield {
    type: "init",
    array: [...a],
    lines: [0],
    explanation: `We need three numbers that add up to ${target}.`,
  };

  for (let i = 0; i < a.length - 2; i++) {
    let left = i + 1;
    let right = a.length - 1;

    yield {
      type: "highlight",
      ids: [a[i].id, a[left].id, a[right].id],
      pointers: {
        index: a[i].id,
        left: a[left].id,
        right: a[right].id,
      },
      explanation: `Fix ${a[i].value} at index ${i}. Now look for two numbers that sum with it.`,
      lines: [1, 2],
    };

    while (left < right) {
      const sum = a[i].value + a[left].value + a[right].value;

      yield {
        type: "highlight",
        ids: [a[i].id, a[left].id, a[right].id],
        pointers: {
          sum: {
            ids: [a[i].id, a[left].id, a[right].id],
            value: sum,
          },
          index: a[i].id,
          left: a[left].id,
          right: a[right].id,
        },
        explanation: `Check ${a[i].value} + ${a[left].value} + ${a[right].value} = ${sum}.`,
        lines: [3, 4],
      };

      if (sum === target) {
        yield {
          type: "compare",
          ids: [a[i].id, a[left].id, a[right].id],
          relation: "=",
          explanation: `Nice! ${sum} equals ${target}.`,
          lines: [5],
        };

        return yield {
          type: "found",
          ids: [a[i].id, a[left].id, a[right].id],
          explanation: `Found triplet: ${a[i].value}, ${a[left].value}, ${a[right].value}.`,
          lines: [5],
        };
      } else if (sum < target) {
        yield {
          type: "compare",
          ids: [a[i].id, a[left].id, a[right].id],
          relation: "<",
          explanation: `${sum} is too small. Let's move the left pointer right.`,
          lines: [6, 7],
        };
        left++;
      } else {
        yield {
          type: "compare",
          ids: [a[i].id, a[left].id, a[right].id],
          relation: ">",
          explanation: `${sum} is too big. Let's move the right pointer left.`,
          lines: [8, 9],
        };

        right--;
      }
    }
  }

  yield {
    type: "not-found",
    explanation: `We checked everything. No triplet adds up to ${target}.`,
    lines: [10],
  };
}
