import { motion } from "framer-motion";
import { useMemo } from "react";
import type { BitmaskStep, Block } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { usePlayback } from "../../../context/PlaybackContext";

const GAP = 5;
const CELL_SIZE = 50;

type Props = {
  steps: BitmaskStep[];
};

export default function BitmaskVisualizer({ steps }: Props) {
  const { isMobile } = useOrientation();
  const { stepIndex } = usePlayback();

  const cellSize = isMobile ? 30 : CELL_SIZE;
  const spacing = cellSize + GAP;

  function applyStep(
    prev: {
      initialNum: number;
      bits: Block[];
      mask: Block[];
      result: Block[];
      highlight: { ids: number[]; mode: "check" | "found" | "updated" | null };
      positions: Record<number, number>;
      op: string | null;
    },
    step: BitmaskStep
  ) {
    let { initialNum, bits, mask, result, highlight, op, positions } = {
      ...prev,
      bits: [...prev.bits],
      mask: [...prev.mask],
      result: [...prev.result],
      positions: { ...prev.positions },
    };

    switch (step.type) {
      case "init":
        bits = step.bits ?? [];
        mask = step.mask ?? [];
        result = step.result ?? [];
        initialNum = step.initialNum;
        highlight = { ids: [], mode: null };
        op = null;
        positions = {};

        const rows = [bits, mask, result];
        rows.forEach((row) => {
          row.forEach((block, i) => {
            positions[block.id] = i;
          });
        });

        break;

      case "highlight":
        highlight = { ids: step.ids, mode: step.mode };
        break;

      case "operation": {
        if (step.op === "SHL" || step.op === "SHR" || step.op === "NOT") {
          const target = step.target ?? "bits";

          if (target === "bits") {
            highlight = { ids: [...bits.map((b) => b.id)], mode: "check" };
            const newBits = bits.map((b) => ({ ...b }));

            if (step.op === "SHL") {
              for (let i = 0; i < newBits.length - 1; i++) {
                newBits[i].value = newBits[i + 1].value;
              }
              newBits[newBits.length - 1].value = 0;
              bits = newBits;
              initialNum = initialNum << 1;
            } else if (step.op === "SHR") {
              for (let i = newBits.length - 1; i > 0; i--) {
                newBits[i].value = newBits[i - 1].value;
              }

              newBits[0].value = 0;
              bits = newBits;
              initialNum = initialNum >> 1;
            } else if (step.op === "NOT") {
              newBits.forEach((b) => (b.value = b.value === 1 ? 0 : 1));
              bits = newBits;
              initialNum = ~initialNum;
            }
          } else if (target === "mask") {
            highlight = { ids: [...mask.map((m) => m.id)], mode: "check" };
            const newMask = mask.map((m) => ({ ...m }));

            if (step.op === "SHL") {
              for (let i = 0; i < newMask.length - 1; i++) {
                newMask[i].value = newMask[i + 1].value;
              }
              newMask[newMask.length - 1].value = 0;
              mask = newMask;
            } else if (step.op === "SHR") {
              for (let i = newMask.length - 1; i > 0; i--) {
                newMask[i].value = newMask[i - 1].value;
              }

              newMask[0].value = 0;
              mask = newMask;
            } else if (step.op === "NOT") {
              newMask.forEach((m) => (m.value = m.value === 1 ? 0 : 1));
              mask = newMask;
            }
          }
        } else if (["AND", "OR", "XOR"].includes(step.op)) {
          highlight = {
            ids: [...bits.map((b) => b.id), ...mask.map((m) => m.id)],
            mode: "check",
          };
        }

        op = step.op;
        break;
      }

      case "overwrite":
        op = null;
        if (typeof step.id === "number") {
          result = result.map((block) =>
            block.id === step.id ? { ...block, value: step.value } : block
          );

          highlight = { ids: [step.id], mode: "found" };
        } else {
          highlight = { ids: [], mode: null };
        }

        break;

      case "update":
        op = null;
        highlight = { ids: [], mode: null };

        if (step.bits) {
          bits = [...step.bits];
        }

        if (step.mask) {
          mask = [...step.mask];
        }

        if (step.result) {
          result = [...step.result];
          highlight = {
            ids: result.map((r) => r.id),
            mode: "updated",
          };
        }

        break;

      case "done":
        highlight = { ids: [], mode: null };
        op = null;
        break;
    }

    return { initialNum, bits, mask, result, highlight, op, positions };
  }

  const { initialNum, bits, mask, result, highlight, op, positions } =
    useMemo(() => {
      let state = {
        initialNum: {} as number,
        bits: [] as Block[],
        mask: [] as Block[],
        result: [] as Block[],
        highlight: {
          ids: [] as number[],
          mode: null as "check" | "found" | "updated" | null,
        },
        op: null as string | null,
        positions: {} as Record<number, number>,
      };
      for (let i = 0; i <= stepIndex && i < steps.length; i++) {
        state = applyStep(state, steps[i]);
      }
      return state;
    }, [steps, stepIndex]);

  const n = bits.length || 8;
  const svgWidth = n * spacing;
  const rowHeight = cellSize + 15;
  const svgHeight = 5 * rowHeight;

  const rows = [
    { label: `N = ${initialNum}`, data: bits },
    { label: "Mask", data: mask },
    { label: "Result", data: result },
  ];

  const step = steps[stepIndex];

  return (
    <motion.div className="w-full flex justify-center">
      <motion.svg
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ overflow: "visible", translateY: "-25%" }}
        width={svgWidth}
        height={svgHeight}
      >
        {rows.map((row, rowIdx) => {
          let y = (rowIdx + 1) * rowHeight;
          if (row.label === "Result") y += 15;

          return (
            <motion.g
              key={row.label}
              transform={`translate(0, ${y})`}
              transition={{ duration: 0.25 }}
            >
              {row.data.map((block, i) => {
                const colIndex = positions?.[block.id] ?? i;
                const x = colIndex * spacing;

                const isHighlighted = highlight.ids.includes(block.id);

                let rectFill: string;
                let textFill: string;

                if (isHighlighted) {
                  switch (highlight.mode) {
                    case "check":
                      rectFill = "#fbbf24";
                      textFill = "#111827";
                      break;
                    case "found":
                      rectFill = "#22c55e";
                      textFill = "#f1f5f9";
                      break;
                    case "updated":
                      rectFill = "#3b82f6";
                      textFill = "#f1f5f9";
                      break;
                    default:
                      rectFill = "#475569";
                      textFill = block.value === 1 ? "#a7f3d0" : "#e2e8f0";
                  }
                } else {
                  rectFill = "#475569";
                  textFill = block.value === 1 ? "#a7f3d0" : "#e2e8f0";
                }

                return (
                  <motion.g key={block.id} transform={`translate(${x}, 0)`}>
                    {row.label.startsWith("N") && (
                      <motion.text
                        key={i}
                        x={cellSize / 2}
                        y={-cellSize / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm font-semibold"
                        fill="#475569"
                      >
                        {bits.length - i - 1}
                      </motion.text>
                    )}
                    <motion.rect
                      width={cellSize}
                      height={cellSize}
                      fill={rectFill}
                      strokeWidth={isHighlighted ? 2 : 1}
                      rx={4}
                    />

                    <motion.text
                      key={`${block.id}-${block.value}`}
                      x={cellSize / 2}
                      y={cellSize / 2 + 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm font-semibold"
                      fill={textFill}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {block.value}
                    </motion.text>
                  </motion.g>
                );
              })}

              {row.data.length > 0 && (
                <text
                  x={n * spacing + 10}
                  y={cellSize / 2}
                  dominantBaseline="middle"
                  className="fill-gray-400 text-sm md:text-lg"
                >
                  = {` ${row.label}`}
                </text>
              )}
              {op && (
                <>
                  {step.type === "operation" &&
                    step.target &&
                    row.label.startsWith("N") &&
                    step.target === "bits" && (
                      <text
                        x={-spacing - 10}
                        y={CELL_SIZE / 2}
                        dominantBaseline="middle"
                        className="fill-gray-400 text-sm md:text-lg"
                      >
                        {op}
                      </text>
                    )}

                  {step.type === "operation" &&
                    step.target &&
                    row.label === "Mask" &&
                    step.target === "mask" && (
                      <text
                        x={-spacing - 10}
                        y={CELL_SIZE / 2}
                        dominantBaseline="middle"
                        className="fill-gray-400 text-sm md:text-lg"
                      >
                        {op}
                      </text>
                    )}

                  {step.type === "operation" &&
                    !step.target &&
                    row.label === "Mask" && (
                      <text
                        x={-spacing - 10}
                        y={-10}
                        dominantBaseline="middle"
                        className="fill-gray-400 text-sm md:text-lg"
                      >
                        {op}
                      </text>
                    )}
                </>
              )}

              {row.label === "Mask" && result.length > 0 && (
                <line
                  x1={0}
                  x2={n * spacing}
                  y1={rowHeight}
                  y2={rowHeight}
                  stroke="#475569"
                  strokeWidth={2}
                />
              )}
            </motion.g>
          );
        })}
      </motion.svg>
    </motion.div>
  );
}
