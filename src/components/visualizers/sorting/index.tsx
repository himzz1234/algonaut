import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Block, SortingStep } from "../../../algorithms/types";

const GAP = 10;
const BAR_WIDTH = 60;
const BAR_HEIGHT = 60;

type Props = {
  steps: SortingStep[];
  stepIndex: number;
};

export default function SortingVisualizer({ steps, stepIndex }: Props) {
  const [array, setArray] = useState<Block[]>([]);
  const [highlight, setHighlight] = useState<{
    ids: number[];
    mode: "key" | "compare" | null;
  }>({ ids: [], mode: null });

  const [sorted, setSorted] = useState<number[]>([]);
  const [depths, setDepths] = useState<Record<number, number>>({});

  useEffect(() => {
    let newArray: Block[] = [];
    let newHighlight: { ids: number[]; mode: "key" | "compare" | null } = {
      ids: [],
      mode: null,
    };

    let newSorted: number[] = [];
    let newDepths: Record<number, number> = {};

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];

      switch (step.type) {
        case "init":
          newArray = step.array ?? [];
          newSorted = [];
          newHighlight = { ids: [], mode: null };
          newDepths = {};
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
          break;
        }

        case "highlight":
          newHighlight = { ids: step.ids ?? [], mode: "key" };
          if (step.drag && step.depth !== undefined) {
            (step.ids ?? []).forEach((id) => {
              newDepths[id] = step.depth!;
            });
          }
          break;

        case "compare":
          newHighlight = { ids: step.ids ?? [], mode: "compare" };
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
          break;
        }

        case "mark_sorted":
          newSorted = [...new Set([...newSorted, ...(step.ids ?? [])])];
          break;

        case "done":
          newHighlight = { ids: [], mode: null };
          newDepths = {};
          break;
      }
    }

    setArray(newArray);
    setHighlight(newHighlight);
    setSorted(newSorted);
    setDepths(newDepths);
  }, [stepIndex, steps]);

  return (
    <div className="w-full h-full flex py-16 justify-center">
      <svg
        width={array.length * (BAR_WIDTH + GAP)}
        height={BAR_HEIGHT}
        style={{ overflow: "visible" }}
      >
        {array.map((block, i) => {
          const isHighlighted = highlight.ids.includes(block.id);
          const isKey = isHighlighted && highlight.mode === "key";
          const isCompare = isHighlighted && highlight.mode === "compare";
          const depth = depths[block.id] ?? 0;

          return (
            <motion.g
              layout
              key={block.id}
              initial={{ x: i * (BAR_WIDTH + GAP), y: 0 }}
              animate={{
                x: i * (BAR_WIDTH + GAP),
                y: depth * (BAR_HEIGHT + 30),
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.rect
                rx={4}
                width={BAR_WIDTH}
                height={BAR_HEIGHT}
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
                x={BAR_WIDTH / 2}
                y={BAR_HEIGHT / 2}
                fontFamily="Satoshi"
                fontSize="16"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {block.value}
              </text>
              <text
                x={BAR_WIDTH / 2}
                y={BAR_HEIGHT + 20}
                fontFamily="Satoshi"
                fontSize="14"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {block.id}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
