import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Block, Overlay, TwoPointerStep } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { usePlayback } from "../../../context/PlaybackContext";
import { getBlockDimensions } from "../../../config/visualizerConfig";

type Props = {
  steps: TwoPointerStep[];
};

export default function TwoPointersVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { barHeight, barWidth, spacing, radius, FONT_SIZE } =
    getBlockDimensions(isMobile);

  const unit = isMobile ? 15 : 25;
  const showBars = steps[0]?.type === "init" && steps[0].showBars;

  function applyStep(
    prev: {
      blocks: Block[];
      positions: Record<number, number>;
      highlight: {
        ids: number[];
        mode: "compare" | "current" | "found" | null;
      };
      pointers: Record<
        string,
        number | number[] | { ids: number[]; value: number } | null
      >;
      overlays: Overlay[];
    },
    step: TwoPointerStep
  ) {
    let { blocks, positions, highlight, pointers, overlays } = {
      blocks: [...prev.blocks],
      positions: { ...prev.positions },
      highlight: { ...prev.highlight },
      pointers: { ...prev.pointers },
      overlays: step.overlays ?? prev.overlays,
    };

    switch (step.type) {
      case "init":
        blocks = step.array ?? [];
        positions = {};
        (step.array ?? []).forEach((b, i) => {
          positions[b.id] = i;
        });
        highlight = { ids: [], mode: null };
        pointers = step.pointers ?? {};
        overlays = step.overlays ?? [];
        break;

      case "highlight":
        highlight = { ids: step.ids, mode: "current" };
        pointers = step.pointers ?? pointers;
        break;

      case "compare":
        highlight = { ids: step.ids, mode: "compare" };
        pointers = step.pointers ?? pointers;
        break;

      case "found":
        highlight = { ids: step.ids ?? [], mode: "found" };
        pointers = step.pointers ?? pointers;
        break;

      case "done":
        highlight = { ids: [], mode: null };
        pointers = {};
        break;
    }

    return { blocks, positions, highlight, pointers, overlays };
  }

  const { blocks, positions, highlight, pointers, overlays } = useMemo(() => {
    let state = {
      blocks: [] as Block[],
      positions: {} as Record<number, number>,
      highlight: {
        ids: [] as number[],
        mode: null as "compare" | "current" | "found" | null,
      },
      pointers: {} as Record<
        string,
        number | number[] | { ids: number[]; value: number } | null
      >,
      overlays: [] as Overlay[],
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      state = applyStep(state, steps[i]);
    }

    return state;
  }, [steps, stepIndex]);

  let groupedPointers: Record<number, string[]> = {};
  Object.entries(pointers).forEach(([label, value]) => {
    if (typeof value === "number") {
      if (value in groupedPointers) groupedPointers[value].push(label);
      else groupedPointers[value] = [label];
    }
  });

  let groupedRanges: Record<
    string,
    Extract<(typeof overlays)[number], { kind: "range" }>[]
  > = {};

  overlays
    ?.filter((o) => o.kind === "range")
    .forEach((overlay) => {
      const key = overlay.ids.join("-");
      if (!groupedRanges[key]) groupedRanges[key] = [];
      groupedRanges[key].push(overlay);
    });

  return (
    <motion.div className="w-full h-full flex py-16 justify-center items-center relative">
      <motion.svg
        transition={{ duration: 0.6, ease: "easeInOut" }}
        width={blocks.length * spacing}
        height={barHeight}
        style={{ overflow: "visible", translateY: !showBars ? "-50%" : "0%" }}
      >
        {Object.entries(groupedRanges ?? {}).map(([_, group], idx) => {
          const first = group[0];
          const leftId = first.ids[0];
          const rightId = first.ids[1];

          const leftPos = (positions[leftId] ?? 0) * spacing;
          const rightPos = (positions[rightId] ?? 0) * spacing;

          const minX = leftPos + (barWidth + barWidth / 2) / 2;
          const maxX = rightPos + (barWidth - barWidth / 2) / 2;

          const minHeight = Math.min(
            ...first.ids.map(
              (id) => blocks.find((b) => b.id === id)?.value ?? 0
            )
          );

          const rectHeight = minHeight * unit + barHeight - 10;
          const yTop = -rectHeight + barHeight;

          const mergedLabel = group
            .map((o) => o.label)
            .filter(Boolean)
            .join(", ");

          const style = group.some((o) => o.style === "best")
            ? "best"
            : "candidate";

          return (
            <motion.g key={`range-${idx}-${minX}-${maxX}`}>
              <motion.rect
                initial={{ width: 0, x: minX }}
                animate={{ width: maxX - minX, x: minX }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                y={yTop}
                height={rectHeight}
                fill={
                  style === "best"
                    ? "rgba(34,197,94,0.25)"
                    : "rgba(59,130,246,0.25)"
                }
              />
              <motion.line
                initial={{ x1: minX, x2: maxX }}
                animate={{ x1: minX, x2: maxX }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                y1={yTop}
                y2={yTop}
                stroke={
                  style === "best"
                    ? "rgba(34,197,94,0.5)"
                    : "rgba(59,130,246,0.5)"
                }
                strokeWidth={2}
              />
              {mergedLabel && (
                <motion.text
                  x={(minX + maxX) / 2}
                  y={yTop - 12.5}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Satoshi"
                  fontSize="14"
                >
                  {mergedLabel}
                </motion.text>
              )}
            </motion.g>
          );
        })}

        {overlays
          ?.filter((overlay) => overlay.kind === "bar")
          .map((overlay, idx) => {
            const pos = (positions[overlay.id] ?? 0) * spacing;

            const blockHeight =
              blocks.find((b) => b.id === overlay.id)?.value ?? 0;
            const waterHeight = overlay.value * unit;

            const blockTop = -blockHeight * unit + 10;
            const baselineY = blockTop;
            const targetY = blockTop - waterHeight;

            return (
              <motion.g key={`bar-${idx}`}>
                <motion.rect
                  initial={{ height: 0, y: baselineY }}
                  animate={{ height: waterHeight, y: targetY }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  x={pos + 2.5}
                  width={barWidth - 5}
                  fill="rgba(59,130,246,0.25)"
                  rx={2}
                />

                <motion.line
                  x1={pos + 2.5}
                  x2={pos + 2.5 + barWidth - 5}
                  initial={{ y1: baselineY, y2: baselineY }}
                  animate={{ y1: targetY, y2: targetY }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  stroke="rgba(59,130,246,0.5)"
                  strokeWidth={2}
                />

                {overlay.label && (
                  <motion.text
                    initial={{ opacity: 0, y: baselineY - 10 }}
                    animate={{ opacity: 1, y: targetY - 10 }}
                    transition={{ duration: 0.3 }}
                    x={pos + barWidth / 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="baseline"
                    fontFamily="Satoshi"
                    fontSize={FONT_SIZE.label}
                  >
                    {overlay.label}
                  </motion.text>
                )}
              </motion.g>
            );
          })}

        {blocks.map((block) => {
          const pos = positions[block.id] ?? 0;
          const isHighlighted = highlight.ids.includes(block.id);
          const labelsAtIndex = groupedPointers[block.id];

          let rectFill = "#475569";
          if (isHighlighted) {
            if (highlight.mode === "found") {
              rectFill = "#22c55e";
            } else if (highlight.mode === "compare") {
              rectFill = "#f59e0b";
            } else {
              rectFill = "#ef4444";
            }
          }

          return (
            <motion.g
              key={block.id}
              initial={{ x: pos * spacing }}
              animate={{
                x: pos * spacing,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {showBars && (
                <motion.rect
                  x={
                    showBars === "centered"
                      ? (barWidth - barWidth / 2) / 2
                      : 2.5
                  }
                  y={-block.value * unit + 10}
                  width={showBars === "centered" ? barWidth / 2 : barWidth - 5}
                  height={block.value * unit}
                  stroke="rgba(148,163,184,0.5)"
                  strokeWidth={1}
                  fill="transparent"
                  rx={2}
                  className="opacity-80"
                />
              )}
              <motion.rect
                rx={radius}
                width={barWidth}
                height={barHeight}
                fill={rectFill}
                animate={{ scale: isHighlighted ? 1.05 : 1 }}
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
                {block.value}
              </text>
              {labelsAtIndex && (
                <text
                  x={barWidth / 2}
                  y={barHeight + 20}
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

        {Object.entries(pointers).map(([label, value], idx) => {
          if (!value) return null;
          if (typeof value === "number") return null;

          const ids = Array.isArray(value) ? value : value.ids;
          const pointerValue = Array.isArray(value) ? null : value.value;

          const xs = ids.map(
            (id) => (positions[id] ?? 0) * spacing + barWidth / 2
          );

          const minX = Math.min(...xs);
          const maxX = Math.max(...xs);
          const midX = (minX + maxX) / 2;

          const isAbove = idx % 2 === 0;
          const yBase = isAbove
            ? -10
            : +barHeight + 10 + Math.floor(idx / 2) * 50;

          const height = 15;

          return (
            <motion.g key={label}>
              <motion.line
                x1={minX}
                y1={yBase}
                x2={minX}
                y2={isAbove ? yBase - height : yBase + height}
                stroke="white"
                strokeWidth={2}
              />

              <motion.line
                x1={maxX}
                y1={yBase}
                x2={maxX}
                y2={isAbove ? yBase - height : yBase + height}
                stroke="white"
                strokeWidth={2}
              />

              <motion.line
                x1={minX}
                y1={isAbove ? yBase - height : yBase + height}
                x2={maxX}
                y2={isAbove ? yBase - height : yBase + height}
                stroke="white"
                strokeWidth={2}
              />

              {xs.map((x) => (
                <motion.line
                  key={`tick-${x}`}
                  x1={x}
                  y1={yBase}
                  x2={x}
                  y2={isAbove ? yBase - height : yBase + height}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}

              <motion.text
                initial={{
                  x: midX,
                  y: isAbove ? yBase - height - 20 : yBase + height + 20,
                }}
                animate={{
                  x: midX,
                  y: isAbove ? yBase - height - 20 : yBase + height + 20,
                }}
                fontFamily="Satoshi"
                fontSize={FONT_SIZE.pointer}
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {pointerValue != null ? `${label} = ${pointerValue}` : label}
              </motion.text>
            </motion.g>
          );
        })}
      </motion.svg>
    </motion.div>
  );
}
