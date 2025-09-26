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

export type Overlay =
  | {
      kind: "range";
      ids: [number, number];
      value?: number;
      style?: "candidate" | "best";
      label?: string;
    }
  | {
      kind: "bar";
      id: number;
      value: number;
      label?: string;
    }
  | {
      kind: "region";
      ids: number[];
      label?: string;
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
      array: Block[];
    })
  | (Step & {
      type: "highlight";
      ids: number[];
      drag: true | false;
      depth?: number;
      role: "pair" | "current" | "subarray";
    })
  | (Step & {
      type: "swap";
      ids: [number, number];
      depth?: number;
    })
  | (Step & {
      type: "move";
      id: number;
      targetIndex: number;
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
      depth?: number;
    })
  | (Step & {
      type: "overwrite";
      id: number;
      value: number;
    })
  | (Step & {
      type: "done";
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
    })
  | (Step & {
      type: "compare";
      id: number;
      relation: string;
      target: number;
    })
  | (Step & {
      type: "found";
      id: number;
    })
  | (Step & {
      type: "not-found";
      target: number;
    })
  | (Step & {
      type: "set-range";
      low: number;
      high: number;
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

export type BitmaskStep =
  | (Step & {
      type: "init";
      bits: Block[];
      mask: Block[];
      result: Block[];
      initialNum: number;
    })
  | (Step & {
      type: "highlight";
      ids: number[];
      mode: "check" | "found";
    })
  | (Step & {
      type: "operation";
      op: "AND" | "OR" | "XOR" | "SHL" | "SHR" | "NOT";
      target?: "bits" | "mask";
      explanation: string;
      lines: number[];
    })
  | (Step & {
      type: "update";
      bits?: Block[];
      mask?: Block[];
      result?: Block[];
    })
  | (Step & {
      type: "overwrite";
      id: number;
      value: number;
    })
  | (Step & {
      type: "done";
    });

export type TwoPointerStep =
  | (Step & {
      type: "init";
      array: Block[];
      showBars?: "centered" | "full";
      overlays?: Overlay[];
    })
  | (Step & {
      type: "highlight";
      ids: number[];
      overlays?: Overlay[];
    })
  | (Step & {
      type: "compare";
      ids: number[];
      relation?: "<" | ">" | "=";
      overlays?: Overlay[];
    })
  | (Step & {
      type: "swap";
      ids: number[];
      overlays?: Overlay[];
    })
  | (Step & {
      type: "found";
      ids: number[];
      overlays?: Overlay[];
    })
  | (Step & {
      type: "not-found";
      overlays?: Overlay[];
    })
  | (Step & {
      type: "done";
      overlays?: Overlay[];
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
