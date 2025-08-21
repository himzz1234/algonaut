export type Block = {
  id: number;
  value: number;
};

export type Cell = {
  id: number;
  row: number;
  col: number;
  weight: number;
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

export type PathfindingStep =
  | {
      type: "init";
      grid: Cell[][];
      start: { row: number; col: number };
      target: { row: number; col: number };
    }
  | {
      type: "visit";
      id: number;
      current: { row: number; col: number };
    }
  | {
      type: "expand";
      from: number;
      neighbors: number[];
    }
  | {
      type: "enqueue";
      id: number;
      priority?: number;
    }
  | {
      type: "relax";
      from: number;
      to: number;
      newDistance: number;
    }
  | {
      type: "compare";
      a: number;
      b: number;
      relation: "<" | ">" | "=";
    }
  | {
      type: "mark_visited";
      id: number;
    }
  | {
      type: "dead_end";
      id: number;
    }
  | {
      type: "backtrack";
      id: number;
    }
  | {
      type: "path_found";
      path: number[];
    }
  | {
      type: "no_path";
    }
  | {
      type: "done";
    };
