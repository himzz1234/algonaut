import type { BitmaskStep } from "../types";
import { toBits } from "./helpers";

export function* checkOddEven(num: number, width = 8): Generator<BitmaskStep> {
  const bits = [...toBits(num, width)];
  const mask = [...toBits(1, width, bits.length)];
  const result = [...toBits(0, width, bits.length + mask.length)];
  const isOdd = num & 1;

  yield {
    type: "init",
    bits: [...bits],
    mask: [...mask],
    initialNum: num,
    result: [...result],
    explanation: `We want to check if ${num} is odd or even.`,
    lines: [0],
  };

  yield {
    type: "highlight",
    ids: [width],
    mode: "check",
    explanation: "Check the least significant bit (rightmost bit).",
    lines: [1],
  };

  yield {
    type: "operation",
    op: "AND",
    explanation: "Perform bitwise AND between the number and mask (1).",
    lines: [2],
  };

  yield {
    type: "update",
    result: [...toBits(isOdd, width, bits.length + mask.length)],
    explanation: isOdd
      ? `${num} & 1 = 1 → ${num} is odd.`
      : `${num} & 1 = 0 → ${num} is even.`,
    lines: isOdd ? [3] : [4],
  };
}
