export type Block = {
  id: number;
  value: number;
};

export type VariableBlock = Block & {
  label: string;
};

export type Node = Block & {
  next: Node | null;
  prev?: Node | null;
};

export type Cell = {
  id: number;
  row: number;
  col: number;
  weight: number;
};

export type PointerValue<AllowNull extends boolean = false> =
  | (AllowNull extends true ? number | null : number)
  | (AllowNull extends true ? (number | null)[] : number[])
  | { ids: number[]; value: number };

export type Step<AllowNull extends boolean = false> = {
  pointers?: Record<string, PointerValue<AllowNull>>;
  lines?: number[];
  explanation?: string;
};

export type ArrayStep =
  | (Step<false> & {
      type: "init";
      variables?: Record<number, VariableBlock>;
      array: Block[];
    })
  | (Step & {
      type: "highlight";
      ids: number[];
      indices?: number[];
      values?: number[];
      drag: true | false;
      depth?: number;
      role: "pair" | "current" | "subarray";
    })
  | (Step & {
      type: "swap";
      ids: [number, number];
      indices?: [number, number];
      values?: [number, number];
      depth?: number;
    })
  | (Step & {
      type: "move";
      id: number;
      targetIndex: number;
      values?: number[];
      indices?: number[];
    })
  | (Step & {
      type: "remove";
      id: number;
      fromIndex: number;
      value?: number;
      depth: number;
    })
  | (Step & {
      type: "insert";
      id: number;
      targetIndex: number;
      values?: number[];
      indices?: number[];
      depth?: number;
    })
  | (Step & {
      type: "overwrite";
      id: number;
      value: number;
    })
  | (Step & {
      type: "done";
      op?: "reverse" | "rotate" | "shuffle" | "custom";
      meta?: Record<string, any>;
    });

export type SortingStep =
  | (Step & {
      type: "init";
      array: Block[];
    })
  | (Step & {
      type: "compare";
      ids: number[];
      relation: "<" | ">" | "=";
    })
  | (Step & {
      type: "swap";
      ids: number[];
      depth?: number;
    })
  | (Step & {
      type: "highlight";
      ids: number[];
      drag: true | false;
      depth?: number;
    })
  | (Step & {
      type: "stage_move";
      ids: number[];
      fromIndex: number;
      toIndex: number;
      depth?: number;
    })
  | (Step & {
      type: "stage_commit";
      ids: number[];
      depth?: number;
    })
  | (Step & {
      type: "mark_sorted";
      ids: number[];
    })
  | (Step & {
      type: "done";
    });

export type SearchingStep =
  | (Step & {
      type: "init";
      array: Block[];
      target: number;
    })
  | (Step & {
      type: "check";
      id: number;
      indices?: number[];
      values?: number[];
    })
  | (Step & {
      type: "compare";
      id: number;
      relation: string;
      indices?: number[];
      values?: number[];
      target: number;
    })
  | (Step & {
      type: "found";
      id: number;
      indices?: number[];
      values?: number[];
    })
  | (Step & {
      type: "not-found";
      reason: string;
      target: number;
    })
  | (Step & {
      type: "set-range";
      low: number;
      high: number;
      indices?: number[];
      values?: number[];
    });

export type ListStep =
  | (Step<true> & {
      type: "init";
      array: Node[];
    })
  | (Step<true> & {
      type: "highlight";
      ids: number[];
    })
  | (Step<true> & {
      type: "compare_next";
      ids: number[];
    })
  | (Step<true> & {
      type: "create_node";
      id: number;
      value: number;
    })
  | (Step<true> & {
      type: "link_next";
      ids: number[];
    })
  | (Step<true> & {
      type: "unlink_next";
      ids: number[];
    })
  | (Step<true> & {
      type: "move";
      from: number;
      id: number;
    })
  | (Step<true> & {
      type: "done";
    });

export type PathfindingStep =
  | {
      type: "init";
      grid: Cell[][];
      start: { row: number; col: number };
      target: { row: number; col: number };
      lines?: [];
    }
  | {
      type: "visit";
      id: number;
      current: { row: number; col: number };
      lines?: [];
    }
  | {
      type: "expand";
      from: number;
      neighbors: number[];
      lines?: [];
    }
  | {
      type: "enqueue";
      id: number;
      priority?: number;
      lines?: [];
    }
  | {
      type: "relax";
      from: number;
      to: number;
      newDistance: number;
      lines?: [];
    }
  | {
      type: "compare";
      a: number;
      b: number;
      relation: "<" | ">" | "=";
      lines?: [];
    }
  | {
      type: "mark_visited";
      id: number;
      lines?: [];
    }
  | {
      type: "dead_end";
      id: number;
      lines?: [];
    }
  | {
      type: "backtrack";
      id: number;
      lines?: [];
    }
  | {
      type: "path_found";
      path: number[];
      lines?: [];
    }
  | {
      type: "no_path";
      lines?: [];
    }
  | {
      type: "done";
      lines?: [];
    };
