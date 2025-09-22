import { motion } from "framer-motion";
import { useMemo } from "react";
import type {
  ArrayStep,
  Block,
  VariableBlock,
} from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { makeCurlyBrace } from "../../../utils/paths";
import { usePlayback } from "../../../context/PlaybackContext";

const GAP = 5;
const BAR_WIDTH = 65;
const BAR_HEIGHT = 65;

type Props = {
  steps: ArrayStep[];
};

export default function ArrayVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const barWidth = isMobile ? 50 : BAR_WIDTH;
  const barHeight = isMobile ? 50 : BAR_HEIGHT;
  const spacing = barWidth + GAP;

  function applyStep(
    prev: {
      blocks: Block[];
      variables: Record<number, VariableBlock>;
      positions: Record<number, number>;
      depths: Record<number, number>;
      highlight: { ids: number[]; mode: "key" | "compare" | "swap" | null };
      pointers: Record<
        string,
        number | number[] | { ids: number[]; value: number } | null
      >;
    },
    step: ArrayStep
  ) {
    let { blocks, variables, positions, depths, highlight, pointers } = {
      blocks: [...prev.blocks],
      variables: { ...prev.variables },
      positions: { ...prev.positions },
      depths: { ...prev.depths },
      highlight: { ...prev.highlight },
      pointers: { ...prev.pointers },
    };

    switch (step.type) {
      case "init":
        blocks = [];
        positions = {};
        depths = {};
        (step.array ?? []).forEach((b, i) => {
          blocks[i] = b;
          positions[b.id] = i;
          depths[b.id] = 0;
        });
        highlight = { ids: [], mode: null };
        pointers = step.pointers ?? {};
        break;

      case "highlight":
        highlight = { ids: step.ids ?? [], mode: "key" };

        if (step.drag && step.depth !== undefined) {
          (step.ids ?? []).forEach((id) => {
            depths[id] = step.depth!;
          });
        }

        pointers = step.pointers ?? pointers;
        break;

      case "remove":
        if (step.id !== undefined) {
          depths[step.id] = step.depth ?? 1;
        }
        break;

      case "insert":
        highlight = { ids: [step.id], mode: "key" };
        if (step.id !== undefined && step.targetIndex !== undefined) {
          positions[step.id] = step.targetIndex;
          depths[step.id] = step.depth ?? 0;
        }

        break;

      case "move":
        if (step.id !== undefined && step.targetIndex !== undefined) {
          positions[step.id] = step.targetIndex;
        }
        break;

      case "swap": {
        const [idA, idB] = step.ids ?? [];
        highlight = { ids: step.ids ?? [], mode: "swap" };

        if (idA !== undefined && idB !== undefined) {
          const posA = positions[idA];
          const posB = positions[idB];
          positions[idA] = posB;
          positions[idB] = posA;
        }

        break;
      }
      case "overwrite": {
        if (step.id !== undefined && step.value !== undefined) {
          if (blocks[step.id]) {
            blocks[step.id] = { ...blocks[step.id], value: step.value };
          } else if (variables[step.id]) {
            variables[step.id] = { ...variables[step.id], value: step.value };
          } else {
            console.warn(`Overwrite step with unknown id: ${step.id}`);
          }
        }
        break;
      }

      case "done":
        highlight = { ids: [], mode: null };
        pointers = {};
        break;
    }

    return { blocks, variables, positions, depths, highlight, pointers };
  }

  const { blocks, positions, depths, highlight, pointers } = useMemo(() => {
    let state = {
      blocks: [] as Block[],
      variables: {} as Record<number, VariableBlock>,
      positions: {} as Record<number, number>,
      depths: {} as Record<number, number>,
      highlight: {
        ids: [] as number[],
        mode: null as "key" | "compare" | "swap" | null,
      },
      pointers: {} as Record<
        string,
        number | number[] | { ids: number[]; value: number } | null
      >,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      state = applyStep(state, steps[i]);
    }

    return state;
  }, [steps, stepIndex]);

  const svgY =
    steps[stepIndex]?.type === "init"
      ? "0%"
      : steps[stepIndex]?.type === "done"
      ? "0%"
      : "-75%";

  const svgTranslateY =
    steps[stepIndex]?.type === "init" || steps[stepIndex]?.type === "done"
      ? "-50%"
      : "-75%";

  let groupedPointers: Record<number, string[]> = {};
  Object.entries(pointers).forEach(([label, value]) => {
    if (typeof value === "number") {
      if (value in groupedPointers) groupedPointers[value].push(label);
      else groupedPointers[value] = [label];
    }
  });

  return (
    <motion.div className="w-full h-full flex py-16 justify-center items-center relative">
      <motion.svg
        animate={{ y: svgY, translateY: svgTranslateY }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        width={Object.keys(blocks).length * spacing}
        height={barHeight}
        style={{ overflow: "visible", translateY: "-50%" }}
      >
        {blocks.map((block) => {
          const depth = depths[block.id] ?? 0;
          const pos = positions[block.id] ?? 0;
          const isHighlighted = highlight.ids.includes(block.id);

          const labelsAtIndex = groupedPointers[block.id];

          return (
            <motion.g
              key={block.id}
              animate={{
                x: pos * spacing,
                y: depth * (barHeight + 30),
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.rect
                rx={6}
                width={barWidth}
                height={barHeight}
                fill={
                  isHighlighted
                    ? highlight.mode === "key"
                      ? "#ef4444"
                      : highlight.mode === "swap"
                      ? "#22c55e"
                      : "#f59e0b"
                    : depths[block.id] > 0
                    ? "#6366f1"
                    : "#475569"
                }
                animate={{
                  scale: isHighlighted ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <text
                x={barWidth / 2}
                y={barHeight / 2}
                fontFamily="Satoshi"
                fontSize="16"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {block.value}
              </text>

              {labelsAtIndex && (
                <text
                  x={barWidth / 2}
                  y={barHeight + 20}
                  fontFamily="Satoshi"
                  fontSize="14"
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {labelsAtIndex.join(" = ")}
                </text>
              )}
            </motion.g>
          );
        })}

        {Object.entries(pointers).map(([label, value]) => {
          if (!value) return null;
          if (typeof value === "number") return null;

          const ids = Array.isArray(value) ? value : value.ids;
          const pointerValue = Array.isArray(value) ? null : value.value;

          const xs = ids.map((id) => positions[id] * spacing + barWidth / 2);
          const depthsForBlocks = ids.map((id) => depths[id] ?? 0);
          const depth = Math.max(...depthsForBlocks);

          const minX = Math.min(...xs) - barWidth / 2;
          const maxX = Math.max(...xs) + barWidth / 2;
          const midX = (minX + maxX) / 2;

          const braceHeight = 10;

          const yBase = depth * (barHeight + 30) - 10;
          const bracePath = makeCurlyBrace(
            minX,
            yBase,
            maxX,
            yBase,
            -braceHeight
          );

          return (
            <motion.g key={label}>
              <motion.path
                d={bracePath}
                stroke="white"
                strokeWidth={2}
                fill="none"
                animate={{ d: bracePath }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
              />
              <motion.text
                initial={{ x: midX, y: yBase - 30 }}
                animate={{ x: midX, y: yBase - 30 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                }}
                fontFamily="Satoshi"
                fontSize="14"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {pointerValue != null ? `${label} = ${pointerValue}` : label}
              </motion.text>
            </motion.g>
          );
        })}
      </motion.svg>
    </motion.div>
  );
}
