import type { BacktrackingStep, Block } from "../types";

export function* generateNQueens(
  grid: Block[][],
  n: number
): Generator<BacktrackingStep> {
  yield {
    type: "init",
    grid: grid.map((row) => row.map((cell) => ({ ...cell }))),
    explanation: `We need to place ${n} queens on a ${n}×${n} chessboard so that no two queens attack each other.`,
    lines: [19],
  };

  const result: number[][] = [];

  function* isSafe(
    row: number,
    col: number
  ): Generator<BacktrackingStep, boolean> {
    for (let i = row - 1; i >= 0; i--) {
      const hasQueen = grid[i][col].label === "1";
      yield {
        type: "check",
        ids: [grid[i][col].id],
        explanation: hasQueen
          ? `There is already a queen in this column at row ${i}. We cannot place a queen here.`
          : `There is no queen in this column at row ${i}. We keep checking.`,
        lines: hasQueen ? [3, 4] : [3],
      };

      if (hasQueen) return false;
    }

    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      const hasQueen = grid[i][j].label === "1";
      yield {
        type: "check",
        ids: [grid[i][j].id],
        explanation: hasQueen
          ? `There is already a queen on the upper left diagonal at (${i}, ${j}). We cannot place a queen here.`
          : `There is no queen on the upper left diagonal at (${i}, ${j}). We keep checking.`,
        lines: hasQueen ? [5, 6] : [5],
      };

      if (hasQueen) return false;
    }

    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      const hasQueen = grid[i][j].label === "1";
      yield {
        type: "check",
        ids: [grid[i][j].id],
        explanation: hasQueen
          ? `There is already a queen on the upper right diagonal at (${i}, ${j}). We cannot place a queen here.`
          : `There is no queen on the upper right diagonal at (${i}, ${j}). We keep checking.`,
        lines: hasQueen ? [7, 8] : [7],
      };
      if (hasQueen) return false;
    }

    return true;
  }

  function* placeQueens(row: number): Generator<BacktrackingStep> {
    if (row === n) {
      const ans: number[] = [];
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (grid[i][j].label === "1") ans.push(grid[i][j].id);
        }
      }

      result.push(ans);

      yield {
        type: "found",
        ids: ans,
        explanation: `All ${n} queens have been placed successfully. This is a valid solution.`,
        lines: [11, 12, 13],
      };
      return;
    }

    for (let col = 0; col < n; col++) {
      yield {
        type: "candidate",
        ids: [grid[row][col].id],
        explanation: `Trying to place queen at (${row}, ${col}).`,
        lines: [15],
      };

      const safe = yield* isSafe(row, col);

      if (safe) {
        grid[row][col].label = "1";
        yield {
          type: "pick",
          ids: [grid[row][col].id],
          label: "🜲",
          explanation: `Placed a queen at (${row}, ${col}). Now moving to the next row to place the next queen.`,
          lines: [15, 16, 17],
        };

        yield* placeQueens(row + 1);

        grid[row][col].label = "0";
        yield {
          type: "unpick",
          ids: [grid[row][col].id],
          explanation: `No valid position in the next row. Removing the queen from (${row}, ${col}) and backtracking.`,
          lines: [18],
        };
      }
    }
  }

  yield* placeQueens(0);

  yield {
    type: "done",
    ids: [],
    explanation: `Done. All solutions have been explored. Total solutions found: ${result.length}.`,
    lines: [20],
  };
}
