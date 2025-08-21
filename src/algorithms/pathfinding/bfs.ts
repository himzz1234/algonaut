import type { Cell, PathfindingStep } from "../types";

export function* bfs(
  grid: Cell[][],
  target: { row: number; col: number }
): Generator<PathfindingStep> {
  const g = [...grid];
  yield { type: "init", grid: [...g], start: { row: 0, col: 0 }, target };

  const queue: [number, number][] = [];
  const n = g.length;
  const m = g[0].length;
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  queue.push([0, 0]);
  visited[0][0] = 1;
  yield { type: "enqueue", id: g[0][0].id };

  while (queue.length) {
    const current = queue.shift();
    if (!current) break;

    const [row, col] = current;
    yield { type: "visit", id: g[row][col].id, current: { row, col } };

    if (row === target.row && col === target.col) {
      yield { type: "path_found", path: [g[row][col].id] };
      yield { type: "done" };
      return;
    }

    for (const [dr, dc] of directions) {
      const nrow = dr + row;
      const ncol = dc + col;

      if (
        nrow >= 0 &&
        nrow < n &&
        ncol >= 0 &&
        ncol < m &&
        !visited[nrow][ncol]
      ) {
        visited[nrow][ncol] = 1;

        queue.push([nrow, ncol]);
        yield { type: "enqueue", id: g[nrow][ncol].id };
      }
    }

    yield { type: "mark_visited", id: g[row][col].id };
  }

  yield { type: "no_path" };
  yield { type: "done" };
}
