import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Block, SearchingStep } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";

const GAP = 5;
const BAR_WIDTH = 60;
const BAR_HEIGHT = 60;

type Props = {
  steps: SearchingStep[];
  stepIndex: number;
};

export default function SearchingVisualizer({ steps, stepIndex }: Props) {
  const { isMobile } = useOrientation();
  const barWidth = isMobile ? 50 : BAR_WIDTH;
  const barHeight = isMobile ? 50 : BAR_HEIGHT;
  const spacing = barWidth + GAP;

  function applyStep(
    prev: {
      blocks: Record<number, Block>;
      highlight: { ids: number[]; mode: "check" | "found" | null };
      target: number | null;
      range: { low: number | null; high: number | null };
      pointers: Record<string, number | null>;
    },
    step: SearchingStep
  ) {
    let { blocks, highlight, target, range, pointers } = {
      blocks: { ...prev.blocks },
      highlight: { ...prev.highlight },
      target: prev.target,
      range: { ...prev.range },
      pointers: { ...prev.pointers },
    };

    switch (step.type) {
      case "init":
        blocks = {};
        (step.array ?? []).forEach((b) => {
          blocks[b.id] = b;
        });
        highlight = { ids: [], mode: null };
        target = step.target;
        range = { low: null, high: null };
        pointers = step.pointers ?? {};
        break;

      case "set-range":
        range = { low: step.low, high: step.high };
        pointers = step.pointers ?? {};
        break;

      case "check":
        highlight = { ids: [step.id], mode: "check" };
        pointers = step.pointers ?? {};
        break;

      case "found":
        highlight = { ids: [step.id], mode: "found" };
        pointers = step.pointers ?? {};
        break;
    }

    return { blocks, highlight, target, range, pointers };
  }

  const { blocks, highlight, target, range, pointers } = useMemo(() => {
    let state = {
      blocks: {} as Record<number, Block>,
      highlight: {
        ids: [] as number[],
        mode: null as "check" | "found" | null,
      },
      target: null as number | null,
      range: { low: null as number | null, high: null as number | null },
      pointers: {} as Record<string, number | null>,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      state = applyStep(state, steps[i]);
    }
    return state;
  }, [steps, stepIndex]);

  return (
    <motion.div className="relative w-full h-full flex flex-col py-16 items-center justify-center">
      <motion.svg
        width={Object.keys(blocks).length * spacing}
        height={barHeight}
        style={{ overflow: "visible" }}
      >
        {Object.values(blocks).map((block, i) => {
          const isHighlighted = highlight.ids.includes(block.id);
          const inRange =
            range.low !== null &&
            range.high !== null &&
            i >= Object.values(blocks).findIndex((b) => b.id === range.low) &&
            i <= Object.values(blocks).findIndex((b) => b.id === range.high);

          const labelsAtIndex = Object.entries(pointers)
            .filter(([, value]) => value === i)
            .map(([label]) => label);

          return (
            <motion.g
              key={block.id}
              initial={{ x: i * spacing, y: 0 }}
              animate={{
                x: i * spacing,
                opacity: range.low === null ? 1 : inRange ? 1 : 0.2,
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.rect
                rx={4}
                width={barWidth}
                height={barHeight}
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
      </motion.svg>

      <div className="absolute top-5 right-5 flex flex-col items-center">
        <svg height={barWidth} width={barHeight}>
          <g>
            <motion.rect
              rx={4}
              width={barWidth}
              height={barHeight}
              animate={{
                fill:
                  steps[stepIndex]?.type === "check"
                    ? "#eab308"
                    : steps[stepIndex]?.type === "found"
                    ? "#22c55e"
                    : "#374151",
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
              {target}
            </text>
          </g>
        </svg>
        <span className="mt-2 text-sm text-gray-200">Target</span>
      </div>
    </motion.div>
  );
}
