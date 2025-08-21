import type { Cell, PathfindingStep } from "../types";

export function* dfs(
  grid: Cell[][],
  target: { row: number; col: number }
): Generator<PathfindingStep> {
  const g = [...grid];
  yield { type: "init", grid: [...g], start: { row: 0, col: 0 }, target };

  const n = g.length;
  const m = g[0].length;
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let found = false;

  function* helper(row: number, col: number): Generator<PathfindingStep> {
    if (found) return;

    visited[row][col] = 1;
    yield { type: "visit", id: g[row][col].id, current: { row, col } };

    if (row === target.row && col === target.col) {
      found = true;
      yield { type: "path_found", path: [g[row][col].id] };
      // yield { type: "done" };
      return;
    }

    for (let [dr, dc] of directions) {
      const nrow = dr + row;
      const ncol = dc + col;

      if (
        nrow >= 0 &&
        nrow < n &&
        ncol >= 0 &&
        ncol < m &&
        !visited[nrow][ncol]
      ) {
        yield* helper(nrow, ncol);
      }
    }

    yield { type: "mark_visited", id: g[row][col].id };
  }

  yield* helper(0, 0);

  if (!found) {
    yield { type: "no_path" };
    yield { type: "done" };
  }
}
