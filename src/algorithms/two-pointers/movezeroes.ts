import type { Block, TwoPointerStep } from "../types";

export function* moveZeroes(arr: Block[]): Generator<TwoPointerStep> {
  const a = [...arr];
  let lastNonZero = 0;

  yield {
    type: "init",
    array: [...a],
    explanation:
      "We will shift all non-zero elements forward and push zeroes to the end.",
    lines: [0],
  };

  for (let i = 0; i < a.length; i++) {
    yield {
      type: "highlight",
      ids: [a[i].id],
      pointers: {
        i: a[i].id,
        lastNonZero: a[lastNonZero].id,
      },
      explanation: `Checking index ${i}: value = ${a[i].value}.`,
      lines: [1, 2],
    };

    if (a[i].value !== 0) {
      yield {
        type: "compare",
        ids: [a[i].id],
        explanation: `${a[i].value} is non-zero.`,
        lines: [3],
      };

      if (i !== lastNonZero) {
        [a[i], a[lastNonZero]] = [a[lastNonZero], a[i]];

        yield {
          type: "swap",
          ids: [a[lastNonZero].id, a[i].id],
          pointers: {
            i: a[i].id,
            lastNonZero: a[lastNonZero].id,
          },
          explanation: `Swap values at index ${lastNonZero} and ${i}.`,
          lines: [4, 5],
        };
      }

      lastNonZero++;
    } else {
      yield {
        type: "compare",
        ids: [a[i].id],
        relation: "=",
        explanation: `${a[i].value} is zero, leave it in place.`,
        lines: [6, 7],
      };
    }
  }

  yield {
    type: "done",
    explanation:
      "All non-zero elements moved forward, zeroes shifted to the end.",
    lines: [8],
  };
}
