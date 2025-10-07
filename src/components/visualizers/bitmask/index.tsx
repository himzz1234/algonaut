import { motion } from "framer-motion";
import { useMemo } from "react";
import type { BitmaskStep, Block } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { usePlayback } from "../../../context/PlaybackContext";
import { getGridDimensions } from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";

type Props = {
  steps: BitmaskStep[];
};

export default function BitmaskVisualizer({ steps }: Props) {
  const { isMobile } = useOrientation();
  const { stepIndex } = usePlayback();
  const { cellSize, spacing, radius, FONT_SIZE } = getGridDimensions(isMobile);

  const { initialNum, bits, mask, result, highlight, op, positions } =
    useMemo(() => {
      let { initialNum, bits, mask, result, highlight, op, positions } = {
        initialNum: {} as number,
        bits: [] as Block[],
        mask: [] as Block[],
        result: [] as Block[],
        highlight: {
          ids: [] as number[],
          mode: null as "check" | "found" | "update" | null,
        },
        op: null as string | null,
        positions: {} as Record<number, number>,
      };

      for (let i = 0; i <= stepIndex && i < steps.length; i++) {
        const step = steps[i];
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
                mode: "update",
              };
            }

            break;

          case "done":
            highlight = { ids: [], mode: null };
            op = null;
            break;
        }
      }

      return { initialNum, bits, mask, result, highlight, op, positions };
    }, [steps, stepIndex]);

  const n = bits.length || 8;
  const svgWidth = n * spacing;
  const rowHeight = cellSize + (isMobile ? 10 : 15);
  const svgHeight = 5 * rowHeight;

  const rows = [
    { label: `N = ${initialNum}`, data: bits },
    { label: "Mask", data: mask },
    { label: "Result", data: result },
  ];

  const step = steps[stepIndex];

  function shouldRenderOpLabel(step: BitmaskStep, rowLabel: string): boolean {
    if (step.type !== "operation") return false;
    if (step.target === "bits" && rowLabel.startsWith("N")) return true;
    if (step.target === "mask" && rowLabel === "Mask") return true;
    if (!step.target && rowLabel === "Mask") return true;
    return false;
  }

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
          if (row.label === "Result") y += isMobile ? 10 : 15;

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

                const rectFill = isHighlighted
                  ? highlight.mode === "check"
                    ? COLORS.accentYellow
                    : highlight.mode === "found"
                    ? COLORS.successGreen
                    : highlight.mode === "update"
                    ? COLORS.infoIndigo
                    : COLORS.neutralGray
                  : COLORS.neutralGray;

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
                      rx={radius}
                    />

                    <motion.text
                      key={`${block.id}-${block.value}`}
                      x={cellSize / 2}
                      y={cellSize / 2 + 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={FONT_SIZE.cell}
                      fill="white"
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

              {step.type === "operation" &&
                op &&
                shouldRenderOpLabel(step, row.label) && (
                  <text
                    x={-spacing - 10}
                    y={
                      row.label.startsWith("N")
                        ? cellSize / 2
                        : row.label === "Mask" && !step.target
                        ? -10
                        : cellSize / 2
                    }
                    dominantBaseline="middle"
                    className="fill-gray-400 text-sm md:text-lg"
                  >
                    {op}
                  </text>
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
