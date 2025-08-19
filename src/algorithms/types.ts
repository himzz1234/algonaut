export type Block = {
  id: number;
  value: number;
};

export type SortingStep =
  | { type: "init"; array: Block[] }
  | { type: "move"; ids: number[]; targetIndices: number[]; depth: number }
  | { type: "compare"; ids: number[]; relation: "<" | ">" | "=" }
  | { type: "swap"; ids: number[] }
  | {
      type: "highlight";
      ids: number[];
      drag: true | false;
      depth?: number;
      role: "key" | "pivot" | "subarray" | "min";
    }
  | { type: "mark_sorted"; ids: number[] }
  | { type: "done" };

export type SearchingStep =
  | { type: "init"; array: Block[]; target: number }
  | { type: "check"; id: number }
  | { type: "compare"; id: number; relation: string }
  | { type: "found"; id: number }
  | { type: "not-found"; reason: string }
  | { type: "set-range"; low: number; high: number };
