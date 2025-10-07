import { motion } from "framer-motion";
import { useMemo } from "react";
import type {
  Block,
  BacktrackingStep,
  PointerValue,
  TreeNode,
} from "../../../algorithms/types";
import { usePlayback } from "../../../context/PlaybackContext";
import { useOrientation } from "../../../hooks/useOrientation";
import { getBlockDimensions } from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";

type Props = {
  steps: BacktrackingStep[];
};

export default function BacktrackingVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { blockWidth, blockHeight, spacing, radius, FONT_SIZE } =
    getBlockDimensions(isMobile);

  const { blocks, highlight, positions, pointers, treeNodes } = useMemo(() => {
    let { blocks, highlight, positions, pointers, treeNodes } = {
      blocks: [] as Block[],
      positions: {} as Record<number, number>,
      highlight: {
        ids: [] as number[],
        nodeIds: [] as number[],
        mode: null as "current" | "pick" | "unpick" | "found" | "done" | null,
      },
      pointers: {} as Record<string, PointerValue>,
      treeNodes: new Map<number, TreeNode>(),
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];
      switch (step.type) {
        case "init":
          blocks = [];
          positions = {};
          (step.array ?? []).forEach((b, idx) => {
            blocks[idx] = b;
            positions[b.id] = idx;
          });
          highlight = { ids: [], nodeIds: [], mode: null };
          treeNodes.clear();
          break;

        case "highlight":
          highlight = {
            ids: step.ids ?? [],
            nodeIds: step.nodeIds ?? [],
            mode: "current",
          };
          pointers = step.pointers ?? {};
          break;

        case "pick":
          highlight = {
            ids: step.ids ?? [],
            nodeIds: step.nodeIds ?? [],
            mode: "pick",
          };
          pointers = step.pointers ?? {};
          if (step.node) {
            treeNodes.set(step.node.id, {
              ...step.node,
              children: [...(step.node.children ?? [])],
            });
          }
          break;

        case "unpick":
          highlight = {
            ids: step.ids ?? [],
            nodeIds: step.nodeIds ?? [],
            mode: "unpick",
          };
          pointers = step.pointers ?? {};
          break;

        case "found":
          highlight = {
            ids: step.ids ?? [],
            nodeIds: step.nodeIds ?? [],
            mode: "found",
          };
          pointers = step.pointers ?? {};
          break;

        case "done":
          highlight = {
            ids: step.ids ?? [],
            nodeIds: step.nodeIds ?? [],
            mode: "done",
          };
          pointers = step.pointers ?? {};
          break;
      }
    }

    return { blocks, highlight, positions, pointers, treeNodes };
  }, [steps, stepIndex]);

  const moveToCorner = stepIndex > 0;

  const nodes = Array.from(treeNodes.values());
  const maxDepth = Math.max(0, ...nodes.map((n) => n.depth));
  const verticalSpacing = blockHeight * 1.2;
  const treeWidth = Math.pow(2, Math.min(2, maxDepth)) * blockWidth;

  function computeLayout() {
    const result: { [id: number]: { x: number; y: number } } = {};
    const root = nodes.find((n) => n.parentId === -1);
    if (!root) return result;

    function countLeaves(node: TreeNode): number {
      const children = nodes.filter((n) => n.parentId === node.id);
      if (children.length === 0) return 1;
      return children.reduce((sum, child) => sum + countLeaves(child), 0);
    }

    function placeNode(
      node: TreeNode,
      x: number,
      spread: number,
      depth: number
    ) {
      result[node.id] = {
        x,
        y: depth * verticalSpacing + blockHeight * (isMobile ? 0.2 : 1),
      };

      const children = nodes.filter((n) => n.parentId === node.id);
      if (children.length === 0) return;

      const totalLeaves = children.reduce(
        (sum, child) => sum + countLeaves(child),
        0
      );

      let currentX = x - spread / 2;

      children.forEach((child) => {
        const childLeaves = countLeaves(child);
        const childSpread = (spread * childLeaves) / totalLeaves;
        const childX = currentX + childSpread / 2;

        placeNode(child, childX, childSpread, depth + 1);
        currentX += childSpread;
      });
    }

    placeNode(root, treeWidth / 2, treeWidth * 2.5, 0);
    return result;
  }

  const layoutPositions = computeLayout();
  const layout = nodes.map((node) => ({
    ...node,
    x: layoutPositions[node.id]?.x ?? 0,
    y: layoutPositions[node.id]?.y ?? 0,
  }));

  const groupedPointers: Record<number, string[]> = {};
  Object.entries(pointers).forEach(([label, value]) => {
    if (typeof value === "number") {
      if (value in groupedPointers) groupedPointers[value].push(label);
      else groupedPointers[value] = [label];
    }
  });

  return (
    <motion.div className="w-full h-full flex py-16 justify-center items-center relative">
      <motion.svg
        initial={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -100%) scale(1)",
        }}
        animate={{
          left: moveToCorner ? "0%" : "50%",
          top: moveToCorner ? "2%" : "50%",
          transform: moveToCorner
            ? "translate(0%, 0%) scale(0.8)"
            : "translate(-50%, -100%) scale(1)",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        width={blocks.length * spacing}
        height={blockHeight}
        className="absolute overflow-visible"
      >
        {blocks.map((block) => {
          const pos = positions[block.id] ?? 0;
          const isHighlighted = highlight.ids.includes(block.id);
          const rectFill = isHighlighted
            ? highlight.mode === "pick" || highlight.mode === "current"
              ? COLORS.accentYellow
              : highlight.mode === "unpick"
              ? COLORS.dangerRed
              : highlight.mode === "found" || highlight.mode === "done"
              ? COLORS.successGreen
              : COLORS.neutralGray
            : COLORS.neutralGray;

          const labelsAtIndex = groupedPointers[block.id];
          return (
            <motion.g
              key={block.id}
              animate={{ x: pos * spacing, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.rect
                rx={radius}
                width={blockWidth}
                height={blockHeight}
                fill={rectFill}
                animate={{ scale: isHighlighted ? 1.05 : 1 }}
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
                {block.label ?? block.value}
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
      </motion.svg>

      <motion.svg
        width={treeWidth}
        height={maxDepth * verticalSpacing + blockHeight * 3}
        className="absolute left-1/2 top-10 -translate-x-1/2 overflow-visible"
      >
        {layout.map((n) => {
          if (n.parentId === undefined || n.parentId === -1) return null;
          const parent = layout.find((p) => p.id === n.parentId);
          if (!parent) return null;

          const isHighlighted = highlight.nodeIds.includes(n.id);
          const edgeColor = isHighlighted
            ? highlight.mode === "pick"
              ? COLORS.accentYellow
              : highlight.mode === "unpick"
              ? COLORS.dangerRed
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
          const isHighlighted = highlight.nodeIds.includes(n.id);
          const nodeFill = isHighlighted
            ? highlight.mode === "pick" || highlight.mode === "current"
              ? COLORS.accentYellow
              : highlight.mode === "unpick"
              ? COLORS.dangerRed
              : highlight.mode === "found" || highlight.mode === "done"
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
                fontSize={FONT_SIZE.label}
              >
                {n.label}
              </text>
            </motion.g>
          );
        })}
      </motion.svg>
    </motion.div>
  );
}
