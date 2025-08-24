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
  | { type: "init"; array: Block[]; pointers?: Record<string, number | null> }
  | {
      type: "move";
      ids: number[];
      targetIndices: number[];
      depth: number;
      pointers?: Record<string, number>;
    }
  | {
      type: "compare";
      ids: number[];
      relation: "<" | ">" | "=";
      pointers?: Record<string, number>;
    }
  | { type: "swap"; ids: number[]; pointers?: Record<string, number> }
  | {
      type: "highlight";
      ids: number[];
      drag: true | false;
      depth?: number;
      role: "key" | "pivot" | "subarray" | "min";
      pointers?: Record<string, number>;
    }
  | { type: "mark_sorted"; ids: number[]; pointers?: Record<string, number> }
  | { type: "done"; pointers?: Record<string, number> };

export type SearchingStep =
  | {
      type: "init";
      array: Block[];
      target: number;
      pointers?: Record<string, number | null>;
    }
  | { type: "check"; id: number; pointers?: Record<string, number> }
  | {
      type: "compare";
      id: number;
      relation: string;
      pointers?: Record<string, number>;
    }
  | { type: "found"; id: number; pointers?: Record<string, number> }
  | { type: "not-found"; reason: string; pointers?: Record<string, number> }
  | {
      type: "set-range";
      low: number;
      high: number;
      pointers?: Record<string, number>;
    };

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
