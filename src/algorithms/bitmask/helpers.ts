import type { Block } from "../types";

export function toBits(num: number, width = 8, offset = 0): Block[] {
  const bits: Block[] = [];
  for (let i = 0; i < width; i++) {
    const value = (num >> (width - 1 - i)) & 1;
    bits.push({ id: offset + i + 1, value: value as 0 | 1 });
  }

  return bits;
}
