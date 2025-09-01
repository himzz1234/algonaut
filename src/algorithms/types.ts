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

export type ArrayStep =
  | {
      type: "init";
      op?: "reverse" | "rotate" | "shuffle" | "custom";
      array: Block[];
      meta?: Record<string, any>;
      pointers?: Record<string, number | null>;
      lines?: number[];
    }
  | {
      type: "highlight";
      ids: number[];
      indices?: number[];
      values?: number[];
      drag: true | false;
      depth?: number;
      role: "pair" | "current" | "subarray";
      pointers?: Record<string, number>;
      lines?: number[];
    }
  | {
      type: "swap";
      ids: [number, number];
      indices?: [number, number];
      values?: [number, number];
      depth?: number;
      pointers?: Record<string, number>;
      lines?: number[];
    }
  | {
      type: "move";
      id: number;
      targetIndex: number;
      values?: number[];
      indices?: number[];
      pointers?: Record<string, number>;
      lines?: number[];
    }
  | {
      type: "remove";
      id: number;
      fromIndex: number;
      value?: number;
      depth: number;
      pointers?: Record<string, number>;
      lines?: number[];
    }
  | {
      type: "insert";
      id: number;
      targetIndex: number;
      values?: number[];
      indices?: number[];
      depth?: number;
      pointers?: Record<string, number>;
      lines?: number[];
    }
  | {
      type: "done";
      op?: "reverse" | "rotate" | "shuffle" | "custom";
      meta?: Record<string, any>;
      pointers?: Record<string, number>;
      lines?: number[];
    };

export type SortingStep =
  | {
      type: "init";
      array: Block[];
      pointers?: Record<string, number | null>;
      lines?: number[];
    }
  | {
      type: "compare";
      ids: number[];
      relation: "<" | ">" | "=";
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      lines?: number[];
    }
  | {
      type: "swap";
      ids: number[];
      depth?: number;
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      lines?: number[];
    }
  | {
      type: "highlight";
      ids: number[];
      drag: true | false;
      depth?: number;
      action?: "enter" | "exit";
      role: "key" | "pivot" | "subarray" | "min" | "target";
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      lines?: number[];
    }
  | {
      type: "stage_move";
      ids: number[];
      fromIndex: number;
      toIndex: number;
      depth?: number;
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      lines?: number[];
    }
  | {
      type: "stage_commit";
      ids: number[];
      depth?: number;
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      lines?: number[];
    }
  | {
      type: "mark_sorted";
      ids: number[];
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      lines?: number[];
    }
  | {
      type: "done";
      pointers?: Record<string, number>;
      lines?: number[];
    };

export type SearchingStep =
  | {
      type: "init";
      array: Block[];
      target: number;
      pointers?: Record<string, number | null>;
      lines?: number[];
    }
  | {
      type: "check";
      id: number;
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      lines?: number[];
    }
  | {
      type: "compare";
      id: number;
      relation: string;
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      target: number;
      lines?: number[];
    }
  | {
      type: "found";
      id: number;
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      lines?: number[];
    }
  | {
      type: "not-found";
      reason: string;
      pointers?: Record<string, number>;
      target: number;
      lines?: number[];
    }
  | {
      type: "set-range";
      low: number;
      high: number;
      pointers?: Record<string, number>;
      indices?: number[];
      values?: number[];
      lines?: number[];
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
