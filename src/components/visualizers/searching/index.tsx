import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Block, SearchingStep } from "../../../algorithms/types";

const GAP = 10;
const BAR_WIDTH = 60;
const BAR_HEIGHT = 60;

type Props = {
  steps: SearchingStep[];
  stepIndex: number;
};

export default function SearchingVisualizer({ steps, stepIndex }: Props) {
  const [array, setArray] = useState<Block[]>([]);
  const [highlight, setHighlight] = useState<{
    ids: number[];
    mode: "check" | "found" | null;
  }>({ ids: [], mode: null });
  const [target, setTarget] = useState<number | null>(null);
  const [range, setRange] = useState<{
    low: number | null;
    high: number | null;
  }>({
    low: null,
    high: null,
  });

  useEffect(() => {
    let target = null;
    let newArray: Block[] = [];
    let newHighlight: { ids: number[]; mode: "check" | "found" | null } = {
      ids: [],
      mode: null,
    };

    let newRange: { low: number | null; high: number | null } = {
      low: null,
      high: null,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];
      switch (step.type) {
        case "init":
          target = step.target;
          newArray = step.array ?? [];
          newHighlight = { ids: [], mode: null };
          newRange = { low: null, high: null };
          break;

        case "set-range":
          newRange = { low: step.low, high: step.high };
          break;

        case "check":
          newHighlight = { ids: [step.id], mode: "check" };
          break;

        case "found":
          newHighlight = { ids: [step.id], mode: "found" };
          break;
      }
    }

    setTarget(target);
    setArray(newArray);
    setHighlight(newHighlight);
    setRange(newRange);
  }, [stepIndex, steps]);

  return (
    <div className="relative w-full h-full flex flex-col py-16 items-center justify-center">
      <svg
        width={array.length * (BAR_WIDTH + GAP)}
        height={BAR_HEIGHT}
        style={{ overflow: "visible" }}
      >
        {array.map((block, i) => {
          const isHighlighted = highlight.ids.includes(block.id);
          const inRange =
            range.low !== null &&
            range.high !== null &&
            i >= array.findIndex((b) => b.id === range.low) &&
            i <= array.findIndex((b) => b.id === range.high);

          return (
            <motion.g
              layout
              key={block.id}
              initial={{ x: i * (BAR_WIDTH + GAP), y: 0 }}
              animate={{
                x: i * (BAR_WIDTH + GAP),
                opacity: range.low === null ? 1 : inRange ? 1 : 0.2,
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.rect
                rx={4}
                width={BAR_WIDTH}
                height={BAR_HEIGHT}
                animate={{
                  fill: isHighlighted
                    ? highlight.mode === "found"
                      ? "#22c55e"
                      : "#eab308"
                    : "#374151",
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
            </motion.g>
          );
        })}
      </svg>

      <div className="absolute top-5 right-5 flex flex-col items-center">
        <svg height={BAR_HEIGHT} width={BAR_WIDTH}>
          <g>
            <motion.rect
              rx={4}
              width={BAR_WIDTH}
              height={BAR_HEIGHT}
              animate={{
                fill:
                  steps[stepIndex].type === "compare"
                    ? "#eab308"
                    : steps[stepIndex].type === "found"
                    ? "#22c55e"
                    : "#374151",
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
              {target}
            </text>
          </g>
        </svg>
        <span className="mt-2 text-sm text-gray-200">Target</span>
      </div>
    </div>
  );
}
