import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Block } from "../../../algorithms/types";
import type { RecursionStep } from "../../../algorithms/types";
import { usePlayback } from "../../../context/PlaybackContext";
import {
  BASE_CONFIG,
  getBlockDimensions,
} from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";
import { useOrientation } from "../../../hooks/useOrientation";

type Props = {
  steps: RecursionStep[];
};

export default function StackVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { barWidth, barHeight, radius, FONT_SIZE } = getBlockDimensions(
    isMobile,
    {
      ...BASE_CONFIG,
      BAR_WIDTH: 150,
      BAR_HEIGHT: 50,
    }
  );

  const { stack, highlight, depths } = useMemo(() => {
    let { stack, highlight, depths } = {
      stack: [] as Block[],
      depths: {} as Record<number, number>,
      highlight: {
        ids: [] as number[],
        mode: null as "append" | "remove" | "current" | null,
      },
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];
      switch (step.type) {
        case "init":
          stack = [];
          highlight = { ids: [], mode: null };
          (step.stack ?? []).forEach((b, i) => {
            stack[i] = b;
            depths[b.id] = b.value;
          });

          break;

        case "push":
          stack = [...stack, step.frame];
          highlight = { ids: [step.frame.id], mode: "append" };
          depths[step.frame.id] = step.frame.value;
          break;

        case "highlight":
          highlight = { ids: step.ids ?? [], mode: "current" };
          break;

        case "resolve":
          highlight = { ids: [step.id], mode: "current" };
          stack = stack.map((frame) =>
            frame.id === step.id ? { ...frame, label: step.label } : frame
          );
          break;

        case "pop":
          stack = stack.filter((b) => b.id !== step.id);
          highlight = { ids: [stack[stack.length - 1].id], mode: "remove" };
          break;

        case "done":
          stack = [];
          highlight = { ids: [], mode: null };
          break;
      }
    }

    return { stack, highlight, depths };
  }, [steps, stepIndex]);

  return (
    <motion.div className="w-full h-full flex flex-col items-center justify-center relative">
      <motion.svg
        transition={{ duration: 0.6, ease: "easeInOut" }}
        width={barWidth}
        style={{ overflow: "visible", translateY: "-50%" }}
        height={Math.max(...stack.map((frame) => frame.value)) * barHeight}
      >
        {stack.map((frame) => {
          const depth = depths[frame.id] ?? 0;
          const isHighlighted = highlight.ids.includes(frame.id);

          const rectFill = isHighlighted
            ? highlight.mode === "append"
              ? COLORS.successGreen
              : highlight.mode === "remove" || highlight.mode === "current"
              ? COLORS.dangerRed
              : COLORS.neutralGray
            : COLORS.neutralGray;

          return (
            <motion.g
              key={frame.id}
              animate={{
                x: 0,
                y: depth * (barHeight + 10),
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.rect
                rx={radius}
                width={barWidth}
                height={barHeight}
                fill={rectFill}
                animate={{
                  scale: isHighlighted ? 1.05 : 1,
                }}
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
                {frame.label || frame.value}
              </text>
            </motion.g>
          );
        })}
      </motion.svg>
    </motion.div>
  );
}
