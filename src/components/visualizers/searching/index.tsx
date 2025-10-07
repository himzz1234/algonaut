import { motion } from "framer-motion";
import { useMemo } from "react";
import type {
  Block,
  PointerValue,
  SearchingStep,
} from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { usePlayback } from "../../../context/PlaybackContext";
import { getBlockDimensions } from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";
type Props = {
  steps: SearchingStep[];
};

export default function SearchingVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { blockWidth, blockHeight, spacing, radius, FONT_SIZE } =
    getBlockDimensions(isMobile);

  const { blocks, highlight, target, range, pointers } = useMemo(() => {
    let { blocks, highlight, target, range, pointers } = {
      blocks: [] as Block[],
      highlight: {
        ids: [] as number[],
        mode: null as "compare" | "found" | null,
      },
      target: null as number | null,
      range: { low: null as number | null, high: null as number | null },
      pointers: {} as Record<string, PointerValue>,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];
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

        case "compare":
          highlight = { ids: [step.id], mode: "compare" };
          pointers = step.pointers ?? {};
          break;

        case "found":
          highlight = { ids: [step.id], mode: "found" };
          pointers = step.pointers ?? {};
          break;
      }
    }

    return { blocks, highlight, target, range, pointers };
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
        height={blockHeight}
        style={{ overflow: "visible", translateY: "-50%" }}
        width={Object.keys(blocks).length * spacing + blockWidth * 2}
      >
        {blocks.map((block, i) => {
          const isHighlighted = highlight.ids.includes(block.id);
          const inRange =
            range.low !== null &&
            range.high !== null &&
            i >= Object.values(blocks).findIndex((b) => b.id === range.low) &&
            i <= Object.values(blocks).findIndex((b) => b.id === range.high);

          const labelsAtIndex = groupedPointers[block.id];
          const rectFill = isHighlighted
            ? highlight.mode === "found"
              ? COLORS.successGreen
              : COLORS.accentYellow
            : COLORS.neutralGray;

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
                rx={radius}
                width={blockWidth}
                height={blockHeight}
                fill={rectFill}
                transition={{ duration: 0.3 }}
              />
              <text
                x={blockWidth / 2}
                y={blockHeight / 2}
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
                  x={blockWidth / 2}
                  y={blockHeight + 15}
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

        <g transform={`translate(${blocks.length * spacing + 30}, 0)`}>
          <motion.rect
            rx={radius}
            width={blockWidth}
            height={blockHeight}
            animate={{
              fill:
                steps[stepIndex]?.type === "compare"
                  ? COLORS.accentYellow
                  : steps[stepIndex]?.type === "found"
                  ? COLORS.successGreen
                  : COLORS.neutralGray,
            }}
            transition={{ duration: 0.3 }}
          />
          <text
            x={blockWidth / 2}
            y={blockHeight / 2}
            fontFamily="Satoshi"
            fontSize={FONT_SIZE.block}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {target}
          </text>
          <text
            x={blockWidth / 2}
            y={blockHeight + 15}
            fontFamily="Satoshi"
            fontSize={FONT_SIZE.label}
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
