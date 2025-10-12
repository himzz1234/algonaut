import type { BacktrackingStep, Block } from "../types";

export function* generateSudoku(grid: Block[][]): Generator<BacktrackingStep> {
  const n = grid.length;
  const subGridSize = Math.sqrt(n);

  yield {
    type: "init",
    grid: grid.map((row) => row.map((cell) => ({ ...cell }))),
    explanation:
      "We will fill the empty cells so that every row, column, and box has all numbers exactly once.",
    lines: [1],
    showBlankCells: true,
  };

  function* isValid(
    row: number,
    col: number,
    num: number
  ): Generator<BacktrackingStep> {
    for (let c = 0; c < n; c++) {
      if (grid[row][c].label === num.toString()) {
        yield {
          type: "check",
          ids: [grid[row][c].id],
          explanation: `${num} cannot be placed at (${row}, ${col}) because it already exists at (${row}, ${c}) in the same row.`,
          lines: [13, 14],
        };
        return false;
      }
    }

    for (let r = 0; r < n; r++) {
      if (grid[r][col].label === num.toString()) {
        yield {
          type: "check",
          ids: [grid[r][col].id],
          explanation: `${num} cannot be placed at (${row}, ${col}) because it already exists at (${r}, ${col}) in the same column.`,
          lines: [15, 16],
        };
        return false;
      }
    }

    const startRow = Math.floor(row / subGridSize) * subGridSize;
    const startCol = Math.floor(col / subGridSize) * subGridSize;
    for (let r = 0; r < subGridSize; r++) {
      for (let c = 0; c < subGridSize; c++) {
        const checkRow = startRow + r;
        const checkCol = startCol + c;
        if (grid[checkRow][checkCol].label === num.toString()) {
          yield {
            type: "check",
            ids: [grid[checkRow][checkCol].id],
            explanation: `${num} cannot be placed at (${row}, ${col}) because it already exists at (${checkRow}, ${checkCol}) in the same subgrid.`,
            lines: [17, 18, 19, 20, 21],
          };
          return false;
        }
      }
    }

    return true;
  }

  function findEmpty(): [number, number] | null {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c].label === "") return [r, c];
      }
    }
    return null;
  }

  function* solve(): Generator<BacktrackingStep> {
    const empty = findEmpty();
    if (!empty) {
      const ids: number[] = [];
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (grid[r][c].value === 0 && grid[r][c].label !== "") {
            ids.push(grid[r][c].id);
          }
        }
      }

      yield {
        type: "found",
        ids,
        explanation:
          "We filled all empty cells successfully. This is a valid Sudoku solution.",
        lines: [2, 3, 4],
      };
      return true;
    }

    const [row, col] = empty;
    const cellId = grid[row][col].id;

    for (let num = 1; num <= n; num++) {
      yield {
        type: "candidate",
        ids: [cellId],
        label: num.toString(),
        explanation: `Trying the next number ${num} at cell (${row}, ${col}).`,
        lines: [5, 6],
      };

      const valid = yield* isValid(row, col, num);
      if (valid) {
        grid[row][col].label = num.toString();

        yield {
          type: "pick",
          ids: [cellId],
          label: num.toString(),
          explanation: `Placed ${num} at cell (${row}, ${col}) as it does not conflict with row, column or box.`,
          lines: [6, 7, 8, 9],
        };

        const solved = yield* solve();
        if (solved) return true;

        grid[row][col].label = "";

        yield {
          type: "unpick",
          ids: [cellId],
          label: "",
          explanation: `Backtracking from cell (${row}, ${col}) removing ${num} and trying another number.`,
          lines: [10, 11],
        };
      }
    }

    return false;
  }

  yield* solve();

  yield {
    type: "done",
    ids: [],
    explanation: "All possibilities have been explored.",
    lines: [],
  };
}
