import { motion } from "framer-motion";
import { useMemo } from "react";
import type {
  Block,
  PointerValue,
  SortingStep,
} from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { usePlayback } from "../../../context/PlaybackContext";

const GAP = 5;
const BAR_WIDTH = 65;
const BAR_HEIGHT = 65;

type Props = {
  steps: SortingStep[];
};

export default function SortingVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const barWidth = isMobile ? 50 : BAR_WIDTH;
  const barHeight = isMobile ? 50 : BAR_HEIGHT;
  const spacing = barWidth + GAP;
  const laneOffset = barHeight + 30;

  function applyStep(
    prev: {
      blocks: Block[];
      positions: Record<number, number>;
      depths: Record<number, number>;
      sorted: number[];
      highlight: { ids: number[]; mode: "key" | "compare" | null };
      pointers: Record<string, PointerValue>;
    },
    step: SortingStep
  ) {
    let { blocks, positions, depths, sorted, highlight, pointers } = {
      blocks: [...prev.blocks],
      positions: { ...prev.positions },
      depths: { ...prev.depths },
      sorted: [...prev.sorted],
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

    return { blocks, positions, depths, sorted, highlight, pointers };
  }

  const { blocks, positions, depths, sorted, highlight, pointers } =
    useMemo(() => {
      let state = {
        blocks: [] as Block[],
        positions: {} as Record<number, number>,
        depths: {} as Record<number, number>,
        sorted: [] as number[],
        highlight: {
          ids: [] as number[],
          mode: null as "key" | "compare" | null,
        },
        pointers: {} as Record<string, PointerValue>,
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
      : "-100%";

  const svgTranslateY =
    steps[stepIndex]?.type === "init" || steps[stepIndex]?.type === "done"
      ? "-50%"
      : "-100%";

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

          const fillColor = isHighlighted
            ? highlight.mode === "key"
              ? "#ef4444"
              : "#f59e0b"
            : sorted.includes(block.id)
            ? "#00a73e"
            : "#475569";

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
                rx={6}
                width={barWidth}
                height={barHeight}
                fill={fillColor}
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
                  y={barHeight + 15}
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

        {/* {Object.entries(groupedPointers).map(([value, labels]) => {
          if (!value) return null;

          const valueNum = Number(value);
          const xPos = positions[valueNum] * spacing + barWidth / 2;
          const depth = depths[valueNum] ?? 0;
          const yPos = depth * (barHeight + 30) + barHeight + 15;

          return (
            <motion.text
              key={labels.join(" = ")}
              initial={false}
              animate={{ x: xPos, y: yPos }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              fontFamily="Satoshi"
              fontSize="14"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {labels.join(" = ")}
            </motion.text>
          );
        })} */}
      </motion.svg>
    </motion.div>
  );
}
