import type { BitmaskStep } from "../types";
import { toBits } from "./helpers";

export function* powerOfTwo(num: number, width = 8): Generator<BitmaskStep> {
  const bitsN = [...toBits(num, width)];
  const bitsNminus1 = [...toBits(num - 1, width)];
  const result = [...toBits(0, width, bitsN.length + bitsNminus1.length)];

  yield {
    type: "init",
    bits: [...bitsN],
    mask: [...bitsNminus1],
    initialNum: num,
    result: [...result],
    explanation: `We want to check if ${num} is a power of two.`,
    lines: [0],
  };

  yield {
    type: "operation",
    op: "AND",
    explanation: "Perform bitwise AND between the number and (n - 1).",
    lines: [1],
  };

  const isPowerOfTwo = num > 0 && (num & (num - 1)) === 0;

  yield {
    type: "update",
    result: [
      ...toBits(num & (num - 1), width, bitsN.length + bitsNminus1.length),
    ],
    explanation: isPowerOfTwo
      ? `${num} & ${num - 1} = 0 → ${num} is a power of two.`
      : `${num} & ${num - 1} ≠ 0 → ${num} is NOT a power of two.`,
    lines: isPowerOfTwo ? [2] : [3],
  };
}
