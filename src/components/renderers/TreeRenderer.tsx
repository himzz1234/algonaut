import { motion } from "framer-motion";
import type { TreeNode } from "../../algorithms/types";
import { COLORS } from "../../config/visualizerColors";
import { useOrientation } from "../../hooks/useOrientation";
import { getBlockDimensions } from "../../config/visualizerConfig";

type HighlightMode =
  | "pick"
  | "unpick"
  | "append"
  | "remove"
  | "current"
  | "found"
  | "done"
  | null;

interface Props {
  layout: (TreeNode & { x: number; y: number })[];
  maxDepth: number;
  treeWidth: number;
  verticalSpacing: number;
  highlightIds: number[];
  highlightMode: HighlightMode;
}

export function TreeRenderer({
  layout,
  maxDepth,
  treeWidth,
  verticalSpacing,
  highlightIds,
  highlightMode,
}: Props) {
  const { isMobile } = useOrientation();
  const { blockWidth, blockHeight, FONT_SIZE } = getBlockDimensions(isMobile);

  return (
    <motion.svg
      width={treeWidth}
      height={maxDepth * verticalSpacing + blockHeight * 3}
      className="absolute left-1/2 top-10 -translate-x-1/2 overflow-visible"
    >
      {layout.map((n) => {
        if (n.parentId === -1) return null;
        const parent = layout.find((p) => p.id === n.parentId);
        if (!parent) return null;

        const isHighlighted = highlightIds.includes(n.id);
        const edgeColor =
          isHighlighted && highlightMode
            ? highlightMode === "pick" || highlightMode === "append"
              ? COLORS.accentYellow
              : highlightMode === "unpick" || highlightMode === "remove"
              ? COLORS.dangerRed
              : highlightMode === "found" || highlightMode === "done"
              ? COLORS.successGreen
              : COLORS.neutralGray
            : COLORS.neutralGray;

        return (
          <motion.line
            key={`edge-${n.id}`}
            x1={parent.x}
            y1={parent.y}
            x2={n.x}
            y2={n.y}
            stroke={edgeColor}
            strokeWidth={isHighlighted ? 3 : 2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        );
      })}

      {layout.map((n) => {
        const isHighlighted = highlightIds.includes(n.id);
        const nodeFill =
          isHighlighted && highlightMode
            ? highlightMode === "pick" ||
              highlightMode === "current" ||
              highlightMode === "append"
              ? COLORS.accentYellow
              : highlightMode === "unpick" || highlightMode === "remove"
              ? COLORS.dangerRed
              : highlightMode === "found" || highlightMode === "done"
              ? COLORS.successGreen
              : COLORS.neutralGray
            : COLORS.neutralGray;

        return (
          <motion.g key={n.id}>
            <motion.rect
              x={n.x - (blockWidth * 0.95) / 2}
              y={n.y - (blockHeight * 0.95) / 2}
              rx={999}
              width={blockWidth * 0.95}
              height={blockHeight * 0.95}
              fill={nodeFill}
            />
            <text
              x={n.x}
              y={n.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={FONT_SIZE.block}
            >
              {n.label}
            </text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}
