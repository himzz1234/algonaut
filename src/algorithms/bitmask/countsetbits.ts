import type { BitmaskStep } from "../types";
import { toBits } from "./helpers";

export function* countSetBits(num: number, width = 8): Generator<BitmaskStep> {
  let n = num;
  let count = 0;

  let bits = [...toBits(num, width)];
  let mask = [...toBits(1, width, bits.length)];

  yield {
    type: "init",
    bits: [...bits],
    mask: [...mask],
    result: [...toBits(0, width, bits.length + mask.length)],
    initialNum: num,
    explanation: `We want to count the number of set bits (1's) in ${num}.`,
    lines: [0],
  };

  while (n > 0) {
    const lsb = n & 1;
    bits = [...toBits(n, width)];
    const maskBits = [...toBits(1, width, bits.length)];
    const andResult = [...toBits(lsb, width, bits.length + maskBits.length)];

    yield {
      type: "highlight",
      ids: [bits[bits.length - 1].id],
      mode: "check",
      explanation: `Check the least significant bit (rightmost bit).`,
      lines: [2, 3],
    };

    yield {
      type: "operation",
      op: "AND",
      explanation: `Perform N & 1 to see if the LSB is set.`,
      lines: [4],
    };

    yield {
      type: "update",
      result: andResult,
      explanation:
        lsb === 1
          ? `N & 1 = 1 → increment count (count = ${++count}).`
          : `N & 1 = 0 → no change in count (count = ${count}).`,
      lines: [4, lsb === 1 ? 5 : undefined].filter(Boolean) as number[],
    };

    n = n >> 1;

    yield {
      type: "operation",
      op: "SHR",
      target: "bits",
      explanation: `Shift the number right by 1 to check the next bit.`,
      lines: [6],
    };
  }

  yield {
    type: "done",
    explanation: `Final count = ${count} set bits in ${num}.`,
    lines: [7],
  };
}
