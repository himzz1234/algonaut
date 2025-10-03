import { motion } from "framer-motion";
import { useMemo } from "react";
import type {
  Block,
  PointerValue,
  SortingStep,
} from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { usePlayback } from "../../../context/PlaybackContext";
import { getBlockDimensions } from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";

type Props = {
  steps: SortingStep[];
  fromIndex?: number;
  toIndex?: number;
};

export default function SortingVisualizer({
  steps,
  fromIndex = 0,
  toIndex,
}: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { barWidth, barHeight, spacing, radius, FONT_SIZE } =
    getBlockDimensions(isMobile);

  const endIndex = toIndex ?? stepIndex;
  const laneOffset = barHeight + 30;

  const { blocks, positions, depths, sorted, highlight, pointers } =
    useMemo(() => {
      let { blocks, positions, depths, sorted, highlight, pointers } = {
        blocks: [] as Block[],
        positions: {} as Record<number, number>,
        depths: {} as Record<number, number>,
        sorted: [] as number[],
        highlight: {
          ids: [] as number[],
          mode: null as "key" | "compare" | "swap" | null,
        },
        pointers: {} as Record<string, PointerValue>,
      };

      for (let i = fromIndex; i <= endIndex && i < steps.length; i++) {
        const step = steps[i];
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
            sorted = [];
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

            pointers = step.pointers ?? {};
            break;

          case "compare":
            highlight = { ids: step.ids ?? [], mode: "compare" };
            pointers = step.pointers ?? {};
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

            pointers = step.pointers ?? {};
            break;
          }

          case "stage_move": {
            highlight = { ids: step.ids ?? [], mode: "key" };
            (step.ids ?? []).forEach((id) => {
              positions[id] = step.toIndex!;
              depths[id] = step.depth ?? 1;
            });

            pointers = step.pointers ?? {};
            break;
          }

          case "stage_commit": {
            highlight = { ids: step.ids ?? [], mode: "key" };
            (step.ids ?? []).forEach((id) => {
              depths[id] = step.depth ?? 0;
            });

            pointers = step.pointers ?? {};
            break;
          }

          case "mark_sorted":
            sorted = [...new Set([...sorted, ...(step.ids ?? [])])];
            pointers = step.pointers ?? {};
            break;

          case "done":
            highlight = { ids: [], mode: null };
            depths = {};
            pointers = {};
            break;
        }
      }

      return { blocks, positions, depths, sorted, highlight, pointers };
    }, [steps, fromIndex, endIndex]);

  const stepType = steps[stepIndex]?.type;
  const isReset = stepType === "init" || stepType === "done";

  const svgY = isReset ? "0%" : "-125%";
  const svgTranslateY = isReset ? "-50%" : "-125%";

  let groupedPointers: Record<number, string[]> = {};
  Object.entries(pointers).forEach(([label, value]) => {
    if (typeof value === "number") {
      if (value in groupedPointers) {
        groupedPointers[value].push(label);
      } else {
        groupedPointers[value] = [label];
      }
    }
  });

  return (
    <motion.div className="w-full h-full flex justify-center items-center relative">
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

          const rectFill = isHighlighted
            ? highlight.mode === "key"
              ? COLORS.dangerRed
              : highlight.mode === "swap"
              ? COLORS.successGreen
              : COLORS.accentYellow
            : sorted.includes(block.id)
            ? COLORS.successGreen
            : COLORS.neutralGray;

          const labelsAtIndex = groupedPointers[block.id];

          return (
            <motion.g
              key={block.id}
              animate={{
                x: pos * spacing,
                y: depth * laneOffset,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.rect
                rx={radius}
                width={barWidth}
                height={barHeight}
                fill={rectFill}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <text
                x={barWidth / 2}
                y={barHeight / 2}
                fontFamily="Satoshi"
                fontSize={FONT_SIZE.block}
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {block.value}
              </text>
              {labelsAtIndex && (
                <text
                  x={barWidth / 2}
                  y={barHeight + 15}
                  fontFamily="Satoshi"
                  fontSize={FONT_SIZE.label}
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
      </motion.svg>
    </motion.div>
  );
}
