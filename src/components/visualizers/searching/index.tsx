import { motion } from "framer-motion";
import { useMemo } from "react";
import type {
  Block,
  PointerValue,
  SearchingStep,
} from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { usePlayback } from "../../../context/PlaybackContext";

const GAP = 5;
const BAR_WIDTH = 65;
const BAR_HEIGHT = 65;

type Props = {
  steps: SearchingStep[];
};

export default function SearchingVisualizer({ steps }: Props) {
  const { isMobile } = useOrientation();
  const { stepIndex } = usePlayback();

  const barWidth = isMobile ? 50 : BAR_WIDTH;
  const barHeight = isMobile ? 50 : BAR_HEIGHT;
  const spacing = barWidth + GAP;

  function applyStep(
    prev: {
      blocks: Block[];
      highlight: { ids: number[]; mode: "check" | "found" | null };
      target: number | null;
      range: { low: number | null; high: number | null };
      pointers: Record<string, PointerValue>;
    },
    step: SearchingStep
  ) {
    let { blocks, highlight, target, range, pointers } = {
      blocks: [...prev.blocks],
      highlight: { ...prev.highlight },
      target: prev.target,
      range: { ...prev.range },
      pointers: { ...prev.pointers },
    };

    switch (step.type) {
      case "init":
        blocks = [];
        (step.array ?? []).forEach((b, i) => {
          blocks[i] = b;
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
      blocks: [] as Block[],
      highlight: {
        ids: [] as number[],
        mode: null as "check" | "found" | null,
      },
      target: null as number | null,
      range: { low: null as number | null, high: null as number | null },
      pointers: {} as Record<string, PointerValue>,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      state = applyStep(state, steps[i]);
    }
    return state;
  }, [steps, stepIndex]);

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
    <motion.div className="relative w-full h-full flex flex-col py-16 items-center justify-center">
      <motion.svg
        height={barHeight}
        style={{ overflow: "visible", translateY: "-50%" }}
        width={Object.keys(blocks).length * spacing + barWidth * 2}
      >
        {blocks.map((block, i) => {
          const isHighlighted = highlight.ids.includes(block.id);
          const inRange =
            range.low !== null &&
            range.high !== null &&
            i >= Object.values(blocks).findIndex((b) => b.id === range.low) &&
            i <= Object.values(blocks).findIndex((b) => b.id === range.high);

          const labelsAtIndex = groupedPointers[block.id];

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
                rx={6}
                width={barWidth}
                height={barHeight}
                animate={{
                  fill: isHighlighted
                    ? highlight.mode === "found"
                      ? "#22c55e"
                      : "#f59e0b"
                    : "#475569",
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

        <g transform={`translate(${blocks.length * spacing + 30}, 0)`}>
          <motion.rect
            rx={6}
            width={barWidth}
            height={barHeight}
            animate={{
              fill:
                steps[stepIndex]?.type === "check"
                  ? "#f59e0b"
                  : steps[stepIndex]?.type === "found"
                  ? "#00a73e"
                  : "#475569",
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
          <text
            x={barWidth / 2}
            y={barHeight + 15}
            fontFamily="Satoshi"
            fontSize="14"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            target
          </text>
        </g>
      </motion.svg>
    </motion.div>
  );
}
