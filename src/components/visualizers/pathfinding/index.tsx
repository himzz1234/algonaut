import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Cell, PathfindingStep } from "../../../algorithms/types";

const GAP = 5;
const BAR_WIDTH = 50;
const BAR_HEIGHT = 50;

type Props = {
  steps: PathfindingStep[];
  stepIndex: number;
};

export default function PathfindingVisualizer({ steps, stepIndex }: Props) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [target, setTarget] = useState<{ row: number; col: number }>({
    row: 0,
    col: 0,
  });

  const [active, setActive] = useState<Set<number>>(new Set());
  const [backtracked, setBacktracked] = useState<Set<number>>(new Set());
  const [enqueued, setEnqueued] = useState<Set<number>>(new Set());
  const [path, setPath] = useState<Set<number>>(new Set());
  const [visitedAll, setVisitedAll] = useState<Set<number>>(new Set());

  useEffect(() => {
    let target: { row: number; col: number } = { row: 0, col: 0 };
    let newArray: Cell[][] = [];
    const newActive = new Set<number>();
    const newBacktracked = new Set<number>();
    const newEnqueued = new Set<number>();
    const newPath = new Set<number>();
    const newVisitedAll = new Set<number>();

    console.log(steps);
    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];
      switch (step.type) {
        case "init":
          target = step.target;
          newArray = step.grid ?? [];
          break;
        case "enqueue":
          newEnqueued.add(step.id);
          break;
        case "visit":
          newActive.add(step.id);
          newEnqueued.delete(step.id);
          newVisitedAll.add(step.id);
          break;
        case "mark_visited":
          newBacktracked.add(step.id);
          break;
        case "path_found":
          step.path.forEach((id) => newPath.add(id));
          break;
      }
    }

    setTarget(target);
    setGrid(newArray);
    setActive(newActive);
    setBacktracked(newBacktracked);
    setEnqueued(newEnqueued);
    setPath(newPath);
    setVisitedAll(newVisitedAll);
  }, [stepIndex, steps]);

  const gridWidth = grid.length > 0 ? grid[0].length * (BAR_WIDTH + GAP) : 0;
  const gridHeight = grid.length * (BAR_HEIGHT + GAP);

  console.log(path);

  return (
    <div className="relative w-full h-full flex flex-col py-16 items-center justify-center">
      <svg
        width={gridWidth}
        height={gridHeight}
        style={{ overflow: "visible" }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const id = cell.id;

            let fill = "#374151";
            if (target.row === rowIndex && target.col === colIndex)
              fill = "#ef4444";
            else if (path.has(id)) fill = "#22c55e";
            else if (backtracked.has(id)) fill = "#8b5cf6";
            else if (enqueued.has(id)) fill = "#facc15";
            else if (active.has(id)) fill = "#3b82f6";

            return (
              <motion.g
                key={id}
                layout
                transform={`translate(${colIndex * (BAR_WIDTH + GAP)}, ${
                  rowIndex * (BAR_HEIGHT + GAP)
                })`}
              >
                <motion.rect
                  rx={6}
                  width={BAR_WIDTH}
                  height={BAR_HEIGHT}
                  fill={fill}
                  stroke="#111827"
                  strokeWidth={2}
                  animate={{ scale: active.has(id) ? 1.05 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
                {/* <text
                  x={4}
                  y={12}
                  fontFamily="Satoshi"
                  fontSize="10"
                  fill="white"
                >
                  ({rowIndex}, {colIndex})
                </text> */}
              </motion.g>
            );
          })
        )}
      </svg>

      <div className="flex flex-col items-center absolute top-5 right-5">
        <svg
          width={gridWidth / 2}
          height={gridHeight / 2}
          style={{ overflow: "visible" }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const id = cell.id;

              let fill = "#374151";
              if (visitedAll.has(id)) fill = "#3b82f6";

              return (
                <motion.g
                  key={id}
                  layout
                  transform={`translate(${
                    colIndex * (BAR_WIDTH / 2 + GAP / 2)
                  }, ${rowIndex * (BAR_HEIGHT / 2 + GAP / 2)})`}
                >
                  <motion.rect
                    rx={4}
                    width={BAR_WIDTH / 2}
                    height={BAR_HEIGHT / 2}
                    fill={fill}
                    stroke="#111827"
                    strokeWidth={2}
                    animate={{ scale: visitedAll.has(id) ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                </motion.g>
              );
            })
          )}
        </svg>
        <span className="mt-2 text-sm text-gray-200">Visited</span>
      </div>
    </div>
  );
}
