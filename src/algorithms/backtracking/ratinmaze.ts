import type { BacktrackingStep, Block } from "../types";

export function* generateRatInMaze(
  grid: Block[][]
): Generator<BacktrackingStep> {
  const n = grid.length;
  const path: number[] = [];
  const visited = Array.from({ length: n }, () => Array(n).fill(false));

  yield {
    type: "init",
    grid: grid.map((row) => row.map((cell) => ({ ...cell }))),
    explanation:
      "We need to find all possible paths for the rat to reach the destination.",
    lines: [23],
  };

  function* isSafe(x: number, y: number): Generator<BacktrackingStep, boolean> {
    if (x < 0 || y < 0 || x >= n || y >= n) {
      yield {
        type: "check",
        ids: [],
        explanation: `Can't move outside the maze boundaries.`,
        lines: [5],
      };
      return false;
    }

    yield {
      type: "check",
      ids: [grid[x][y].id],
      explanation: `Checking if the rat can move to cell (${x}, ${y}).`,
      lines: [10],
    };

    if (grid[x][y].value === 0) {
      yield {
        type: "check",
        ids: [grid[x][y].id],
        explanation: `This cell is blocked. The rat cannot move here.`,
        lines: [6],
      };
      return false;
    }

    if (visited[x][y]) {
      yield {
        type: "check",
        ids: [grid[x][y].id],
        explanation: `This cell was already visited. The rat cannot revisit it.`,
        lines: [7],
      };
      return false;
    }

    return true;
  }

  function* backtrack(x: number, y: number): Generator<BacktrackingStep> {
    const safe = yield* isSafe(x, y);
    if (!safe) return;

    visited[x][y] = true;
    path.push(grid[x][y].id);

    if (!(x === n - 1 && y === n - 1)) {
      yield {
        type: "pick",
        ids: [grid[x][y].id],
        label: "🐁",
        explanation: `Cell (${x}, ${y}) is safe, so the rat moves here to continue the path.`,
        lines: [10, 11, 12, 18, 19],
      };
    }

    if (x === n - 1 && y === n - 1) {
      yield {
        type: "found",
        ids: [...path],
        explanation: "The rat reached the destination! This is one valid path.",
        lines: [13, 14, 15, 16, 17],
      };

      path.pop();
      visited[x][y] = false;
      return;
    }

    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      yield* backtrack(nx, ny);
    }

    path.pop();
    visited[x][y] = false;

    if (!(x === n - 1 && y === n - 1)) {
      yield {
        type: "unpick",
        ids: [grid[x][y].id],
        explanation: `Backtracking from cell (${x}, ${y}) as no further moves are possible.`,
        lines: [20, 21],
      };
    }
  }

  yield* backtrack(0, 0);

  yield {
    type: "done",
    ids: [],
    explanation:
      "Done. All possible paths to reach the destination have been explored.",
    lines: [24],
  };
}
