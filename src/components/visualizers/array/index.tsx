import { motion } from "framer-motion";
import { useMemo } from "react";
import type { ArrayStep, Block } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";

const GAP = 5;
const BAR_WIDTH = 60;
const BAR_HEIGHT = 60;

type Props = {
  steps: ArrayStep[];
  stepIndex: number;
};

export default function ArrayVisualizer({ steps, stepIndex }: Props) {
  const { isMobile } = useOrientation();
  const barWidth = isMobile ? 50 : BAR_WIDTH;
  const barHeight = isMobile ? 50 : BAR_HEIGHT;
  const spacing = barWidth + GAP;

  function applyStep(
    prev: {
      blocks: Record<number, Block>;
      positions: Record<number, number>;
      depths: Record<number, number>;
      highlight: { ids: number[]; mode: "key" | "compare" | null };
      pointers: Record<string, number | null>;
    },
    step: ArrayStep
  ) {
    let { blocks, positions, depths, highlight, pointers } = {
      blocks: { ...prev.blocks },
      positions: { ...prev.positions },
      depths: { ...prev.depths },
      highlight: { ...prev.highlight },
      pointers: { ...prev.pointers },
    };

    switch (step.type) {
      case "init":
        blocks = {};
        positions = {};
        depths = {};
        (step.array ?? []).forEach((b, i) => {
          blocks[b.id] = b;
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
        if (idA !== undefined && idB !== undefined) {
          const posA = positions[idA];
          const posB = positions[idB];
          positions[idA] = posB;
          positions[idB] = posA;
        }
        break;
      }

      case "done":
        highlight = { ids: [], mode: null };
        pointers = {};
        break;
    }

    return { blocks, positions, depths, highlight, pointers };
  }

  const { blocks, positions, depths, highlight, pointers } = useMemo(() => {
    let state = {
      blocks: {} as Record<number, Block>,
      positions: {} as Record<number, number>,
      depths: {} as Record<number, number>,
      highlight: {
        ids: [] as number[],
        mode: null as "key" | "compare" | null,
      },
      pointers: {} as Record<string, number | null>,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      state = applyStep(state, steps[i]);
    }
    return state;
  }, [steps, stepIndex]);

  const svgY =
    steps[stepIndex]?.type === "init"
      ? "50%"
      : steps[stepIndex]?.type === "done"
      ? "50%"
      : "-100%";

  const svgTranslateY =
    steps[stepIndex]?.type === "init" || steps[stepIndex]?.type === "done"
      ? "-50%"
      : "-100%";

  return (
    <motion.div className="w-full h-full flex py-16 justify-center items-center relative">
      <motion.svg
        animate={{ y: svgY, translateY: svgTranslateY }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        width={Object.keys(blocks).length * spacing}
        height={barHeight}
        style={{ overflow: "visible", position: "absolute" }}
      >
        {Object.values(blocks).map((block) => {
          const depth = depths[block.id] ?? 0;
          const pos = positions[block.id] ?? 0;
          const isHighlighted = highlight.ids.includes(block.id);

          const labelsAtIndex = Object.entries(pointers)
            .filter(([, value]) => value === block.id)
            .map(([label]) => label);

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
                rx={4}
                width={barWidth}
                height={barHeight}
                animate={{
                  fill: isHighlighted
                    ? highlight.mode === "key"
                      ? "#ef4444"
                      : "#f59e0b"
                    : depths[block.id] > 0
                    ? "#6366f1"
                    : "#4b5563",
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
              {labelsAtIndex.length > 0 && (
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
      </motion.svg>
    </motion.div>
  );
}
