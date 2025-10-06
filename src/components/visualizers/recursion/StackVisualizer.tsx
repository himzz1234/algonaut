import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Block, RecursionStep } from "../../../algorithms/types";
import { usePlayback } from "../../../context/PlaybackContext";
import { getBlockDimensions } from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";
import { useOrientation } from "../../../hooks/useOrientation";

type Props = {
  steps: RecursionStep[];
};

export default function StackVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { barWidth, barHeight, radius, FONT_SIZE } =
    getBlockDimensions(isMobile);

  const { stack, highlight, depths, finalValue } = useMemo(() => {
    let { stack, highlight, depths } = {
      stack: [] as Block[],
      depths: {} as Record<number, number>,
      highlight: {
        ids: [] as number[],
        mode: null as "append" | "remove" | "current" | null,
      },
    };
    let finalValue: number | null = null;

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
          const popped = stack.find((b) => b.id === step.id);
          finalValue = Number(popped?.label) || popped?.value || null;
          stack = stack.filter((b) => b.id !== step.id);
          highlight = stack.length
            ? { ids: [stack[stack.length - 1].id], mode: "remove" }
            : { ids: [], mode: "remove" };
          break;

        case "done":
          if (stack.length > 0) {
            const top = stack[stack.length - 1];
            finalValue = Number(top.label) || top.value;
          }

          stack = [];
          highlight = { ids: [], mode: null };
          break;
      }
    }

    return { stack, highlight, depths, finalValue };
  }, [steps, stepIndex]);

  const showFinal = stack.length === 0 && finalValue != null;

  return (
    <motion.div className="w-full h-full flex flex-col items-center justify-center relative">
      <motion.svg
        transition={{ duration: 0.6, ease: "easeInOut" }}
        width={barWidth}
        style={{ overflow: "visible", translateY: "-50%" }}
        height={Math.max(...stack.map((frame) => frame.value), 1) * barHeight}
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

      {showFinal && (
        <motion.div
          key="final-result"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="absolute -translate-y-1/2 text-xl md:text-3xl font-bold text-green-500"
        >
          Result = {finalValue}
        </motion.div>
      )}
    </motion.div>
  );
}
