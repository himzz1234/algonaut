import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import type { Interval, IntervalStep } from "../../../algorithms/types";
import { usePlayback } from "../../../context/PlaybackContext";
import {
  BASE_CONFIG,
  getBlockDimensions,
} from "../../../config/visualizerConfig";

type Props = {
  steps: IntervalStep[];
};

export default function IntervalsVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { barHeight, spacing, FONT_SIZE } = getBlockDimensions(false, {
    ...BASE_CONFIG,
    BAR_HEIGHT: 40,
  });

  function applyStep(
    prev: {
      intervals: Interval[];
      depths: Record<number, number>;
      highlight: { ids: number[]; role: string | null };
      pointers: Record<string, any>;
    },
    step: IntervalStep
  ) {
    let { intervals, depths, highlight, pointers } = {
      intervals: [...prev.intervals],
      depths: { ...prev.depths },
      highlight: { ...prev.highlight },
      pointers: { ...prev.pointers },
    };

    switch (step.type) {
      case "init":
        intervals = step.intervals ?? [];
        depths = {};
        intervals.forEach((iv, i) => {
          depths[iv.id] = i;
        });
        highlight = { ids: [], role: null };
        pointers = step.pointers ?? {};
        break;

      case "highlight":
        highlight = { ids: step.ids ?? [], role: "current" };
        pointers = step.pointers ?? {};

        break;

      case "compare":
        highlight = { ids: step.ids, role: "compare" };
        pointers = step.pointers ?? {};

        break;

      case "merge": {
        const [idA, idB] = step.ids;
        intervals = intervals.filter((iv) => iv.id !== idA && iv.id !== idB);
        intervals.push(step.newInterval);
        if (step.mergeAtAxis) depths[step.newInterval.id] = 0;
        pointers = step.pointers ?? {};
        highlight = { ids: [step.newInterval.id], role: "merge" };
        break;
      }

      case "append":
        depths[step.interval.id] = 0;
        highlight = { ids: [step.interval.id], role: "current" };
        pointers = step.pointers ?? {};
        break;

      case "remove":
        intervals = intervals.filter((iv) => iv.id !== step.id);
        highlight = { ids: [step.id], role: "remove" };
        pointers = step.pointers ?? {};
        break;

      case "sweep":
        pointers = { sweep: { value: step.activeCount, pos: step.position } };
        break;

      case "gap": {
        const gapInterval = { ...step.interval, isGap: true };
        intervals.push(gapInterval);
        depths[gapInterval.id] = 1;
        highlight = { ids: [gapInterval.id], role: null };
        break;
      }

      case "done":
        highlight = { ids: [], role: null };
        intervals.forEach((iv) => {
          depths[iv.id] = 0;
        });
        pointers = {};
        break;
    }

    return { intervals, depths, highlight, pointers };
  }

  const { intervals, depths, highlight, pointers } = useMemo(() => {
    let state = {
      intervals: [] as Interval[],
      depths: {} as Record<number, number>,
      highlight: { ids: [] as number[], role: null as string | null },
      pointers: {} as Record<string, any>,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      state = applyStep(state, steps[i]);
    }

    return state;
  }, [steps, stepIndex]);

  const minStart = Math.min(...intervals.map((iv) => iv.start), 0);
  const maxEnd = Math.max(...intervals.map((iv) => iv.end), 1);
  const axisLength = maxEnd - minStart || 1;

  const axisWidth = Math.max(intervals.length, 7) * spacing;
  const svgHeight = barHeight * 6;
  const axisY = svgHeight;
  const scale = axisWidth / axisLength;

  const stepType = steps[stepIndex]?.type ?? "init";

  return (
    <motion.div className="w-full h-full flex py-16 justify-center items-center relative">
      <motion.svg
        width={axisWidth}
        height={svgHeight}
        animate={{
          y: stepType === "done" ? "-50%" : "-25%",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        style={{ overflow: "visible" }}
      >
        <AnimatePresence>
          {intervals.map((iv) => {
            const depth = depths[iv.id] ?? 0;
            const spacingBetween = 2;

            const x = (iv.start - minStart) * scale + spacingBetween / 2;
            const width = (iv.end - iv.start) * scale - spacingBetween;
            const y = axisY - barHeight - depth * (barHeight + 15) - 20;

            const isHighlighted = highlight.ids.includes(iv.id);
            const isGap = iv.isGap === true;

            const rectFill = isGap
              ? "rgba(34, 197, 94, 0.25)"
              : isHighlighted
              ? highlight.role === "merge"
                ? "#22c55e"
                : highlight.role === "compare"
                ? "#f59e0b"
                : highlight.role === "current"
                ? "#ef4444"
                : highlight.role === "remove"
                ? "#ef4444"
                : highlight.role === "insert"
                ? "#3b82f6"
                : "#475569"
              : "#475569";

            const stroke = isGap ? "#22c55e" : "none";
            const strokeDasharray = isGap ? "6,3" : undefined;

            const labelsAtIndex = Object.entries(pointers)
              .filter(([_, value]) => value === iv.id)
              .map(([label]) => label);

            return (
              <g key={iv.id}>
                <motion.rect
                  key={iv.id}
                  initial={{
                    x,
                    y: axisY - barHeight,
                    width,
                    height: barHeight,
                    opacity: 0,
                  }}
                  animate={{
                    x,
                    y,
                    width,
                    height: barHeight,
                    opacity: isHighlighted ? 1 : 0.85,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                  rx={4}
                  fill={rectFill}
                  stroke={stroke}
                  strokeWidth={isGap ? 1 : 0}
                  strokeDasharray={strokeDasharray}
                />

                {iv.isGap !== true && (
                  <>
                    <motion.text
                      initial={{
                        x: x + 10,
                        y: axisY - barHeight / 2,
                        opacity: 0,
                      }}
                      animate={{
                        x: x + 10,
                        y: y + barHeight / 2,
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                      fontFamily="Satoshi"
                      fontSize={FONT_SIZE.block - 2}
                      fill="white"
                      textAnchor="start"
                      dominantBaseline="middle"
                    >
                      {iv.start}
                    </motion.text>

                    <motion.text
                      initial={{
                        x: x + width - 10,
                        y: axisY - barHeight / 2,
                        opacity: 0,
                      }}
                      animate={{
                        x: x + width - 10,
                        y: y + barHeight / 2,
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                      fontFamily="Satoshi"
                      fontSize={FONT_SIZE.block - 2}
                      fill="white"
                      textAnchor="end"
                      dominantBaseline="middle"
                    >
                      {iv.end}
                    </motion.text>
                  </>
                )}

                {labelsAtIndex.length > 0 && (
                  <text
                    x={x + width / 2}
                    y={y + barHeight + 15}
                    fontFamily="Satoshi"
                    fontSize={FONT_SIZE.label}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {labelsAtIndex.join(", ")}
                  </text>
                )}
              </g>
            );
          })}
        </AnimatePresence>

        {"sweep" in pointers && pointers.sweep && (
          <g>
            <line
              x1={(pointers.sweep.pos - minStart) * scale}
              x2={(pointers.sweep.pos - minStart) * scale}
              y1={0}
              y2={svgHeight}
              stroke="#ef4444"
              strokeWidth={1}
            />
            <text
              x={(pointers.sweep.pos - minStart) * scale + 10}
              y={20}
              fontFamily="Satoshi"
              fontSize={FONT_SIZE.label}
              fill="white"
            >
              active={pointers.sweep.value}
            </text>
          </g>
        )}

        <line
          x1={-10}
          y1={axisY}
          x2={axisWidth + 10}
          y2={axisY}
          stroke="rgba(148,163,184,0.5)"
          strokeWidth={1}
        />

        {Array.from({ length: 6 }).map((_, i) => {
          const value = minStart + (axisLength / 5) * i;
          const x = (value - minStart) * scale;

          return (
            <g key={i}>
              <line
                x1={x}
                y1={axisY}
                x2={x}
                y2={axisY + 10}
                stroke="rgba(148,163,184,0.5)"
                strokeWidth={1}
              />
              <text
                x={x}
                y={axisY + 30}
                fontFamily="Satoshi"
                fontSize={FONT_SIZE.label}
                fill="rgb(148,163,184)"
                textAnchor="middle"
              >
                {Math.round(value)}
              </text>
            </g>
          );
        })}
      </motion.svg>
    </motion.div>
  );
}
