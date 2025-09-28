import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Block, PointerValue } from "../../../algorithms/types";
import type { SlidingWindowStep } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { makeCurlyBrace } from "../../../utils/paths";
import { usePlayback } from "../../../context/PlaybackContext";
import { getBlockDimensions } from "../../../config/visualizerConfig";

type Props = {
  steps: SlidingWindowStep[];
};

export default function SlidingWindowVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { barWidth, barHeight, spacing, radius, FONT_SIZE } =
    getBlockDimensions(isMobile);

  function applyStep(
    prev: {
      blocks: Block[];
      positions: Record<number, number>;
      pointers: Record<string, PointerValue<false>>;
      highlight: { ids: number[]; mode: "current" | "found" | null };
      metrics: Record<string, number>;
    },
    step: SlidingWindowStep
  ) {
    let { blocks, positions, pointers, metrics, highlight } = {
      blocks: [...prev.blocks],
      positions: { ...prev.positions },
      pointers: { ...prev.pointers },
      metrics: { ...prev.metrics },
      highlight: { ...prev.highlight },
    };

    switch (step.type) {
      case "init":
        blocks = [];
        positions = {};
        (step.array ?? []).forEach((b, i) => {
          blocks[i] = b;
          positions[b.id] = i;
        });
        pointers = step.pointers ?? {};
        metrics = {};
        highlight = { ids: [], mode: null };
        break;

      case "highlight":
        highlight = { ids: step.ids ?? [], mode: "current" };
        pointers = step.pointers ?? {};
        break;

      case "found":
        highlight = { ids: step.ids ?? [], mode: "found" };
        pointers = step.pointers ?? {};
        break;

      case "done":
        highlight = { ids: [], mode: null };
        pointers = {};
        break;
    }

    return { blocks, positions, pointers, metrics, highlight };
  }

  const { blocks, positions, pointers, highlight } = useMemo(() => {
    let state = {
      blocks: [] as Block[],
      positions: {} as Record<number, number>,
      pointers: {} as Record<string, PointerValue<false>>,
      metrics: {} as Record<string, number>,
      highlight: {
        ids: [] as number[],
        mode: null as "current" | "found" | null,
      },
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      state = applyStep(state, steps[i]);
    }

    return state;
  }, [steps, stepIndex]);

  return (
    <motion.div className="w-full h-full flex py-16 justify-center items-center relative">
      <motion.svg
        width={Object.keys(blocks).length * spacing}
        height={barHeight}
        style={{ overflow: "visible", translateY: "-50%" }}
      >
        {blocks.map((block) => {
          const pos = positions[block.id] ?? 0;
          const isHighlighted = highlight.ids.includes(block.id);

          let rectFill = isHighlighted
            ? highlight.mode === "current"
              ? "#ef4444"
              : highlight.mode === "found"
              ? "#22c55e"
              : "#475569"
            : "#475569";

          return (
            <motion.g
              key={block.id}
              animate={{ x: pos * spacing, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
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
                {block.label ?? block.value}
              </text>
            </motion.g>
          );
        })}

        {Object.entries(pointers).map(([label, value]) => {
          if (!value) return null;
          if (typeof value === "number") return null;

          const ids = Array.isArray(value) ? value : value.ids;
          const pointerValue = Array.isArray(value) ? null : value.value;
          const isAbove = Array.isArray(value) ? null : value.pos === "top";

          const xs = ids.map((id) => positions[id] * spacing + barWidth / 2);

          const minX = Math.min(...xs) - barWidth / 2;
          const maxX = Math.max(...xs) + barWidth / 2;
          const midX = (minX + maxX) / 2;

          const braceHeight = 10;
          const yBase = isAbove ? -10 : barHeight + 10;

          const bracePath = makeCurlyBrace(
            minX,
            yBase,
            maxX,
            yBase,
            isAbove ? -braceHeight : braceHeight
          );

          return (
            <motion.g key={label}>
              <motion.path
                d={bracePath}
                stroke="white"
                strokeWidth={2}
                fill="none"
                animate={{ d: bracePath }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
              />
              <motion.text
                initial={{ x: midX, y: isAbove ? yBase - 30 : yBase + 30 }}
                animate={{ x: midX, y: isAbove ? yBase - 30 : yBase + 30 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
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
