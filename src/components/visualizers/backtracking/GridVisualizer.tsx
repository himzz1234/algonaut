import { motion } from "framer-motion";
import { useMemo } from "react";
import type { BacktrackingStep, Block } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { usePlayback } from "../../../context/PlaybackContext";
import { getGridDimensions } from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";

type Props = {
  steps: BacktrackingStep[];
};

export default function GridVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { cellSize, spacing, radius, FONT_SIZE } = getGridDimensions(isMobile);

  const {
    matrix,
    positions,
    showBlankCells,
    candidate,
    highlight,
    picked,
    solutions,
  } = useMemo(() => {
    let {
      matrix,
      positions,
      showBlankCells,
      candidate,
      highlight,
      picked,
      solutions,
    } = {
      matrix: [] as Block[][],
      positions: {} as Record<number, { row: number; col: number }>,
      candidate: [] as number[],
      highlight: { ids: [] as number[], mode: null as "check" | null },
      picked: [] as number[],
      solutions: [] as { grid: Block[][]; ids: number[] }[],
      showBlankCells: false as Boolean,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];

      switch (step.type) {
        case "init":
          matrix =
            step.grid?.map((row) => row.map((cell) => ({ ...cell }))) ?? [];
          positions = {};
          matrix.forEach((row, r) => {
            row.forEach((cell, c) => {
              positions[cell.id] = { row: r, col: c };
            });
          });
          candidate = [];
          highlight = { ids: [], mode: null };
          picked = [];
          if (step.showBlankCells) showBlankCells = step.showBlankCells;
          break;

        case "candidate":
          candidate = step.ids ?? [];
          highlight = { ids: [], mode: null };

          for (const id of step.ids) {
            for (const row of matrix) {
              const cell = row.find((c) => c.id === id);
              if (cell) cell.label = step.label;
            }
          }

          break;

        case "check":
          highlight = { ids: step.ids ?? [], mode: "check" };
          break;

        case "pick":
          picked = [...picked, ...(step.ids ?? [])];
          highlight = { ids: [], mode: null };
          if (step.label) {
            step.ids?.forEach((id) => {
              matrix.forEach((row) => {
                const cell = row.find((c) => c.id === id);
                if (cell) cell.label = step.label;
              });
            });
          }
          break;

        case "unpick":
          highlight = { ids: [], mode: null };
          step.ids?.forEach((id) => {
            matrix.forEach((row) => {
              const cell = row.find((c) => c.id === id);
              if (cell) cell.label = "";
            });
          });

          candidate.forEach((id) => {
            matrix.forEach((row) => {
              const cell = row.find((c) => c.id === id);
              if (cell) cell.label = "";
            });
          });

          candidate = [];
          picked = [...picked.filter((id) => !(step.ids ?? []).includes(id))];
          break;

        case "found": {
          const snapshot = matrix.map((row) =>
            row.map((cell) => ({ ...cell }))
          );

          solutions.push({
            grid: snapshot,
            ids: step.ids ?? [],
          });
          break;
        }

        case "done":
          candidate = [];
          highlight = { ids: [], mode: null };
          break;
      }
    }

    return {
      matrix,
      positions,
      showBlankCells,
      candidate,
      highlight,
      picked,
      solutions,
    };
  }, [steps, stepIndex]);

  const numRows = matrix.length;
  const numCols = matrix[0]?.length ?? 0;
  const totalWidth = numCols * spacing;
  const totalHeight = numRows * spacing;

  const getFillColor = (id: number) => {
    if (highlight.mode === "check" && highlight.ids.includes(id)) {
      return COLORS.accentYellow;
    }

    if (picked.includes(id)) return COLORS.successGreen;
    if (candidate.includes(id)) return COLORS.dangerRed;

    return COLORS.neutralGray;
  };

  const isHighlighted = (id: number) =>
    picked.includes(id) || candidate.includes(id);

  return (
    <motion.div className="w-full h-full flex justify-center items-center relative">
      <motion.svg
        transition={{ duration: 0.6, ease: "easeInOut" }}
        width={totalWidth}
        height={totalHeight}
        style={{ overflow: "visible", translateY: "-15%" }}
      >
        {matrix.flat().map((block) => {
          const pos = positions[block.id];
          const active = isHighlighted(block.id);
          const rectFill = getFillColor(block.id);

          return (
            <motion.g
              key={block.id}
              animate={{
                x: pos.col * spacing,
                y: pos.row * spacing,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.rect
                rx={radius}
                width={cellSize}
                height={cellSize}
                fill={rectFill}
                animate={{ scale: active ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <text
                x={cellSize / 2}
                y={cellSize / 2}
                fontFamily="Satoshi"
                fontSize={FONT_SIZE.cell}
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {block.label ||
                  (showBlankCells && block.value === 0 ? "" : block.value)}
              </text>
            </motion.g>
          );
        })}
      </motion.svg>

      <div className="absolute top-5 right-5 flex flex-col gap-1.5 md:gap-3">
        {solutions.map((solution, index) => (
          <motion.svg
            key={index}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            width={numCols * spacing * 0.5}
            height={numRows * spacing * 0.5}
          >
            {solution.grid.flat().map((block) => (
              <g
                key={block.id}
                transform={`translate(${
                  (positions[block.id].col * spacing) / 2
                }, ${(positions[block.id].row * spacing) / 2})`}
              >
                <rect
                  width={cellSize / 2}
                  height={cellSize / 2}
                  rx={radius / 2}
                  fill={
                    solution.ids.includes(block.id)
                      ? COLORS.successGreen
                      : COLORS.neutralGray
                  }
                />
                <text
                  x={cellSize / 4}
                  y={cellSize / 4}
                  fontSize={FONT_SIZE.cell / 2}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {block.label || block.value}
                </text>
              </g>
            ))}
          </motion.svg>
        ))}
      </div>
    </motion.div>
  );
}
