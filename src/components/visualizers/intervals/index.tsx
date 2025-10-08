import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import type { Interval, IntervalStep } from "../../../algorithms/types";
import { usePlayback } from "../../../context/PlaybackContext";
import {
  BASE_CONFIG,
  getBlockDimensions,
} from "../../../config/visualizerConfig";
import { useOrientation } from "../../../hooks/useOrientation";
import { COLORS } from "../../../config/visualizerColors";

type Props = {
  steps: IntervalStep[];
};

export default function IntervalsVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { barHeight, spacing, radius, FONT_SIZE } = getBlockDimensions(
    isMobile,
    {
      ...BASE_CONFIG,
      BAR_HEIGHT: 40,
    }
  );

  const { intervals, depths, highlight, pointers } = useMemo(() => {
    let state = {
      intervals: [] as Interval[],
      depths: {} as Record<number, number>,
      highlight: { ids: [] as number[], role: null as string | null },
      pointers: {} as Record<string, any>,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];

      let { intervals, depths, highlight, pointers } = {
        intervals: [...state.intervals],
        depths: { ...state.depths },
        highlight: { ...state.highlight },
        pointers: { ...state.pointers },
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

        case "sort":
          intervals = step.intervals ?? [];
          depths = {};
          intervals.forEach((iv, i) => {
            depths[iv.id] = i;
          });
          highlight = { ids: [], role: null };
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
          highlight = { ids: [step.id], role: "remove" };
          intervals = intervals.filter((iv) => iv.id !== step.id);
          pointers = step.pointers ?? {};
          break;

        case "sweep":
          pointers = {
            sweep: {
              pos: step.position,
              activeCount: step.activeCount,
              maxCount: step.maxCount,
            },
          };

          const activeIds =
            step.position !== null
              ? intervals
                  .filter(
                    (iv) => step.position >= iv.start && step.position <= iv.end
                  )
                  .map((iv) => iv.id)
              : [];

          highlight = { ids: activeIds ?? [], role: "current" };
          break;

        case "gap": {
          const gapInterval = { ...step.interval, type: "gap" as "gap" };
          intervals.push(gapInterval);
          depths[gapInterval.id] = 0;
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

      state = { intervals, depths, highlight, pointers };
    }

    return state;
  }, [steps, stepIndex]);

  const initialIntervals =
    "intervals" in (steps[0] ?? {}) &&
    Array.isArray((steps[0] as any).intervals)
      ? (steps[0] as any).intervals
      : [];

  const initialMinStart = Math.min(
    ...initialIntervals.map((iv: Interval) => iv.start),
    0
  );
  const initialMaxEnd = Math.max(
    ...initialIntervals.map((iv: Interval) => iv.end),
    1
  );

  const axisLength = initialMaxEnd - initialMinStart || 1;
  const axisWidth = Math.max(initialIntervals.length, 7) * spacing;
  const svgHeight = barHeight * 6;
  const axisY = svgHeight;
  const scale = axisWidth / axisLength;

  const stepType = steps[stepIndex]?.type ?? "init";

  return (
    <motion.div className="w-full h-full flex justify-center items-center relative">
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
            const x = (iv.start - initialMinStart) * scale + spacingBetween / 2;
            const width = (iv.end - iv.start) * scale - spacingBetween;
            const y = axisY - barHeight - depth * (barHeight + 10) - 20;

            const isHighlighted = highlight.ids.includes(iv.id);
            const isGap = iv.type === "gap";

            const rectFill = isGap
              ? "rgba(34, 197, 94, 0.25)"
              : isHighlighted
              ? highlight.role === "merge"
                ? COLORS.successGreen
                : highlight.role === "compare"
                ? COLORS.accentYellow
                : highlight.role === "current"
                ? COLORS.dangerRed
                : highlight.role === "remove"
                ? COLORS.dangerRed
                : highlight.role === "insert"
                ? COLORS.infoIndigo
                : COLORS.neutralGray
              : COLORS.neutralGray;

            const stroke = isGap ? COLORS.successGreen : "none";

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
                  exit={{
                    opacity: 0,
                    scaleY: 0,
                    transition: { duration: 0.25 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                  rx={radius - 1}
                  fill={rectFill}
                  stroke={stroke}
                  strokeWidth={1}
                />

                {iv.end - iv.start >= 2 ? (
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
                        y: y + barHeight / 2 + 10,
                        transition: { duration: 0.2 },
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
                        y: y + barHeight / 2 + 10,
                        transition: { duration: 0.2 },
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
                ) : (
                  <motion.text
                    initial={{
                      x: x + width / 2,
                      y: axisY - barHeight / 2,
                      opacity: 0,
                    }}
                    animate={{
                      x: x + width / 2,
                      y: y + barHeight / 2,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: y + barHeight / 2 + 10,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    fontFamily="Satoshi"
                    fontSize={FONT_SIZE.block - 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {iv.start}
                  </motion.text>
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

        {pointers.sweep && (
          <motion.g
            initial={false}
            animate={{
              x: (pointers.sweep.pos - initialMinStart) * scale,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 25,
            }}
          >
            <motion.line
              x1={0}
              x2={0}
              y1={0}
              y2={svgHeight}
              stroke={COLORS.dangerRed}
              strokeWidth={1.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />

            <motion.text
              x={0}
              y={-14}
              fontFamily="Satoshi"
              fontSize={FONT_SIZE.label}
              fill="white"
              textAnchor="middle"
              dominantBaseline="auto"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              active = {pointers.sweep.activeCount}, max ={" "}
              {pointers.sweep.maxCount}
            </motion.text>
          </motion.g>
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
          const value = initialMinStart + (axisLength / 5) * i;
          const x = (value - initialMinStart) * scale;

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
