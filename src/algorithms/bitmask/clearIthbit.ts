import type { BitmaskStep } from "../types";
import { toBits } from "./helpers";

export function* clearIthBit(
  n: number,
  i: number,
  width = 8
): Generator<BitmaskStep> {
  const bits = [...toBits(n, width)];
  let mask = [...toBits(1, width, bits.length)];
  const result = [...toBits(0, width, bits.length + mask.length)];
  const newN = n & ~(1 << i);

  yield {
    type: "init",
    bits: [...bits],
    mask: [...mask],
    result: [...result],
    initialNum: n,
    explanation: `We want to clear (set to 0) the ${i}-th bit in ${n}.`,
    lines: [0],
  };

  for (let shift = 0; shift < i; shift++) {
    const shiftedMask = 1 << (shift + 1);
    yield {
      type: "operation",
      op: "SHL",
      target: "mask",
      explanation: `Shift mask left by 1 → mask = ${shiftedMask} (after ${
        shift + 1
      } shift${shift + 1 > 1 ? "s" : ""}).`,
      lines: [1],
    };
  }

  yield {
    type: "highlight",
    ids: [bits[bits.length - 1 - i].id, ...mask.map((m) => m.id)],
    mode: "check",
    explanation: `Mask is now aligned with the ${i}-th bit of N.`,
    lines: [1],
  };

  yield {
    type: "operation",
    op: "NOT",
    target: "mask",
    explanation: `Invert the mask (~mask): i-th bit becomes 0, others 1.`,
    lines: [2],
  };

  yield {
    type: "operation",
    op: "AND",
    explanation: "Perform N & ~mask to clear the i-th bit.",
    lines: [3],
  };

  yield {
    type: "update",
    result: [...toBits(newN, width, bits.length + mask.length)],
    explanation: `N & ~mask = ${newN}`,
    lines: [4],
  };
}
