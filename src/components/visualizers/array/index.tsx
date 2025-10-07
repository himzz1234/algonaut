import { motion } from "framer-motion";
import { useMemo } from "react";
import type { ArrayStep, Block, PointerValue } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { makeCurlyBrace } from "../../../utils/paths";
import { usePlayback } from "../../../context/PlaybackContext";
import { getBlockDimensions } from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";

type Props = {
  steps: ArrayStep[];
};

export default function ArrayVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { blockWidth, blockHeight, spacing, radius, FONT_SIZE } =
    getBlockDimensions(isMobile);

  const { blocks, positions, depths, highlight, pointers } = useMemo(() => {
    let { blocks, positions, depths, highlight, pointers } = {
      blocks: [] as Block[],
      positions: {} as Record<number, number>,
      depths: {} as Record<number, number>,
      highlight: {
        ids: [] as number[],
        mode: null as "key" | "compare" | "swap" | null,
      },
      pointers: {} as Record<string, PointerValue>,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];
      switch (step.type) {
        case "init":
          blocks = [];
          positions = {};
          depths = {};
          (step.array ?? []).forEach((b, i) => {
            blocks[i] = b;
            positions[b.id] = i;
            depths[b.id] = 0;
          });
          highlight = { ids: [], mode: null };
          pointers = step.pointers ?? {};
          break;

        case "highlight":
          highlight = { ids: step.ids ?? [], mode: "key" };

          if (step.drag && step.depth !== undefined) {
            (step.ids ?? []).forEach((id) => {
              depths[id] = step.depth!;
            });
          }

          pointers = step.pointers ?? pointers;
          break;

        case "remove":
          if (step.id !== undefined) {
            depths[step.id] = step.depth ?? 1;
          }
          break;

        case "insert":
          highlight = { ids: [step.id], mode: "key" };
          if (step.id !== undefined && step.targetIndex !== undefined) {
            positions[step.id] = step.targetIndex;
            depths[step.id] = step.depth ?? 0;
          }

          break;

        case "move":
          if (step.id !== undefined && step.targetIndex !== undefined) {
            positions[step.id] = step.targetIndex;
          }

          break;

        case "swap": {
          const [idA, idB] = step.ids ?? [];
          highlight = { ids: step.ids ?? [], mode: "swap" };

          if (idA !== undefined && idB !== undefined) {
            const posA = positions[idA];
            const posB = positions[idB];
            positions[idA] = posB;
            positions[idB] = posA;
          }

          break;
        }

        case "overwrite": {
          if (step.id !== undefined && step.value !== undefined) {
            if (blocks[step.id]) {
              blocks[step.id] = { ...blocks[step.id], value: step.value };
            }
          }
          break;
        }

        case "done":
          highlight = { ids: [], mode: null };
          pointers = {};
          break;
      }
    }

    return { blocks, positions, depths, highlight, pointers };
  }, [steps, stepIndex]);

  const stepType = steps[stepIndex]?.type;
  const isReset = stepType === "init" || stepType === "done";

  const svgY = isReset ? "0%" : "-75%";
  const svgTranslateY = isReset ? "-50%" : "-75%";

  let groupedPointers: Record<number, string[]> = {};
  Object.entries(pointers).forEach(([label, value]) => {
    if (typeof value === "number") {
      if (value in groupedPointers) groupedPointers[value].push(label);
      else groupedPointers[value] = [label];
    }
  });

  return (
    <motion.div className="w-full h-full flex py-16 justify-center items-center relative">
      <motion.svg
        animate={{ y: svgY, translateY: svgTranslateY }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        width={Object.keys(blocks).length * spacing}
        height={blockHeight}
        style={{ overflow: "visible", translateY: "-50%" }}
      >
        {blocks.map((block) => {
          const depth = depths[block.id] ?? 0;
          const pos = positions[block.id] ?? 0;
          const isHighlighted = highlight.ids.includes(block.id);

          const labelsAtIndex = groupedPointers[block.id];
          const rectFill = isHighlighted
            ? highlight.mode === "key"
              ? COLORS.dangerRed
              : highlight.mode === "swap"
              ? COLORS.successGreen
              : COLORS.accentYellow
            : depths[block.id] > 0
            ? COLORS.infoIndigo
            : COLORS.neutralGray;

          return (
            <motion.g
              key={block.id}
              animate={{
                x: pos * spacing,
                y: depth * (blockHeight + 30),
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.rect
                rx={radius}
                width={blockWidth}
                height={blockHeight}
                fill={rectFill}
                animate={{
                  scale: isHighlighted ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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

        {Object.entries(pointers).map(([label, value], idx) => {
          if (!value) return null;
          if (typeof value === "number") return null;

          const ids = Array.isArray(value) ? value : value.ids;
          const pointerValue = Array.isArray(value) ? null : value.value;

          const xs = ids.map((id) => positions[id] * spacing + blockWidth / 2);
          const depthsForBlocks = ids.map((id) => depths[id] ?? 0);
          const depth = Math.max(...depthsForBlocks);

          const minX = Math.min(...xs) - blockWidth / 2;
          const maxX = Math.max(...xs) + blockWidth / 2;
          const midX = (minX + maxX) / 2;

          const braceHeight = 10;

          const isAbove = idx % 2 === 0;

          const yBase = isAbove
            ? depth * (blockHeight + 30) - 10
            : depth * (blockHeight + 30) +
              blockHeight +
              10 +
              Math.floor(idx / 2) * 50;

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
                fontSize="14"
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
