import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Block, SortingStep } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";

const GAP = 5;
const BAR_WIDTH = 60;
const BAR_HEIGHT = 60;

type Props = {
  steps: SortingStep[];
  stepIndex: number;
};

export default function SortingVisualizer({ steps, stepIndex }: Props) {
  const { isMobile } = useOrientation();
  const barWidth = isMobile ? 50 : BAR_WIDTH;
  const barHeight = isMobile ? 50 : BAR_HEIGHT;

  const [array, setArray] = useState<Block[]>([]);
  const [highlight, setHighlight] = useState<{
    ids: number[];
    mode: "key" | "compare" | null;
  }>({ ids: [], mode: null });

  const [sorted, setSorted] = useState<number[]>([]);
  const [depths, setDepths] = useState<Record<number, number>>({});
  const [pointers, setPointers] = useState<Record<string, number | null>>({});

  useEffect(() => {
    let newArray: Block[] = [];
    let newHighlight: { ids: number[]; mode: "key" | "compare" | null } = {
      ids: [],
      mode: null,
    };

    let newSorted: number[] = [];
    let newDepths: Record<number, number> = {};

    let newPointers: Record<string, number | null> = {};

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];

      switch (step.type) {
        case "init":
          newArray = step.array ?? [];
          newSorted = [];
          newHighlight = { ids: [], mode: null };
          newDepths = {};
          newPointers = step.pointers ?? {};
          break;

        case "move": {
          const { ids, targetIndices, depth } = step;
          if (!ids?.length) break;

          ids.forEach((id, idx) => {
            const currentIndex = newArray.findIndex((b) => b.id === id);
            if (currentIndex === -1) return;
            const [element] = newArray.splice(currentIndex, 1);
            const target = targetIndices?.[idx] ?? currentIndex;
            newArray.splice(target, 0, element);
          });

          if (depth !== undefined) {
            ids.forEach((id) => (newDepths[id] = depth));
          }

          newPointers = step.pointers ?? {};
          break;
        }

        case "highlight":
          newHighlight = { ids: step.ids ?? [], mode: "key" };
          if (step.drag && step.depth !== undefined) {
            (step.ids ?? []).forEach((id) => {
              newDepths[id] = step.depth!;
            });
          }

          newPointers = step.pointers ?? {};
          break;

        case "compare":
          newHighlight = { ids: step.ids ?? [], mode: "compare" };
          newPointers = step.pointers ?? {};
          break;

        case "swap": {
          const [idA, idB] = step.ids ?? [];
          const indexA = newArray.findIndex((b) => b.id === idA);
          const indexB = newArray.findIndex((b) => b.id === idB);
          if (indexA !== -1 && indexB !== -1) {
            [newArray[indexA], newArray[indexB]] = [
              newArray[indexB],
              newArray[indexA],
            ];
          }
          newPointers = step.pointers ?? {};
          break;
        }

        case "mark_sorted":
          newSorted = [...new Set([...newSorted, ...(step.ids ?? [])])];
          newPointers = step.pointers ?? {};
          break;

        case "done":
          newHighlight = { ids: [], mode: null };
          newDepths = {};
          newPointers = step.pointers ?? {};
          break;
      }
    }

    setArray(newArray);
    setHighlight(newHighlight);
    setSorted(newSorted);
    setDepths(newDepths);
    setPointers(newPointers);
  }, [stepIndex, steps]);

  const svgY =
    steps[stepIndex].type === "init"
      ? "50%"
      : steps[stepIndex].type === "done"
      ? "50%"
      : "-100%";

  const svgTranslateY =
    steps[stepIndex].type === "init" || steps[stepIndex].type === "done"
      ? "-50%"
      : "-100%";

  return (
    <motion.div className="w-full h-full flex py-16 justify-center items-center relative">
      <motion.svg
        animate={{ y: svgY, translateY: svgTranslateY }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        width={array.length * (barWidth + GAP)}
        height={barHeight}
        style={{ overflow: "visible", position: "absolute" }}
      >
        {array.map((block, i) => {
          const isHighlighted = highlight.ids.includes(block.id);
          const isKey = isHighlighted && highlight.mode === "key";
          const isCompare = isHighlighted && highlight.mode === "compare";
          const depth = depths[block.id] ?? 0;
          const labelsAtIndex = Object.entries(pointers)
            .filter(([, value]) => value === i)
            .map(([label]) => label);

          return (
            <motion.g
              layout
              key={block.id}
              initial={{ x: i * (barWidth + GAP), y: 0 }}
              animate={{
                x: i * (barWidth + GAP),
                y: depth * (barHeight + 30),
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.rect
                rx={4}
                width={barWidth}
                height={barHeight}
                animate={{
                  fill: isKey
                    ? "#ef4444"
                    : isCompare
                    ? "#f59e0b"
                    : sorted.includes(block.id)
                    ? "#10b981"
                    : "#4b5563",
                }}
                transition={{ duration: 0.3 }}
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
