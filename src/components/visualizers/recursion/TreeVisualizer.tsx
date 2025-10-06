import { motion } from "framer-motion";
import { useMemo } from "react";
import type { RecursionTreeStep, TreeNode } from "../../../algorithms/types";
import { usePlayback } from "../../../context/PlaybackContext";
import { useOrientation } from "../../../hooks/useOrientation";
import { getBlockDimensions } from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";

type Props = {
  steps: RecursionTreeStep[];
};

export default function TreeVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { blockWidth, blockHeight, FONT_SIZE } = getBlockDimensions(isMobile);

  const { treeNodes, highlight } = useMemo(() => {
    let { highlight, treeNodes } = {
      highlight: {
        ids: [] as number[],
        mode: null as "current" | "append" | "remove" | null,
      },
      treeNodes: new Map<number, TreeNode>(),
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];

      switch (step.type) {
        case "init":
          treeNodes.set(step.root.id, {
            ...step.root,
            children: [...(step.root.children ?? [])],
          });
          highlight = { ids: [], mode: null };
          break;

        case "expand": {
          highlight = { ids: [step.node.id], mode: "append" };
          if (step.node) {
            treeNodes.set(step.node.id, {
              ...step.node,
              children: [...(step.node.children ?? [])],
            });
          }
          break;
        }

        case "highlight":
          highlight = { ids: step.ids ?? [], mode: "current" };
          break;

        case "resolve": {
          const prevNode = treeNodes.get(step.id);
          if (prevNode) {
            treeNodes.set(step.id, {
              ...prevNode,
              id: prevNode.id,
              children: [...(prevNode.children ?? [])],
              label: step.label ?? prevNode.label,
            });
          }

          highlight = { ids: [step.id], mode: "current" };
          break;
        }

        case "collapse":
          highlight = { ids: [step.id], mode: "remove" };
          break;

        case "done":
          highlight = { ids: [], mode: null };
          break;
      }
    }

    return { treeNodes, highlight };
  }, [steps, stepIndex]);

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
  return (
    <motion.div className="w-full h-full flex justify-center items-center relative">
      <motion.svg
        width={treeWidth}
        height={maxDepth * verticalSpacing + blockHeight * 3}
        style={{ overflow: "visible" }}
      >
        {layout.map((node) => {
          if (node.parentId === -1) return null;
          const parent = layout.find((p) => p.id === node.parentId);
          if (!parent) return null;

          const isHighlighted = highlight.ids.includes(node.id);
          const edgeColor = isHighlighted
            ? highlight.mode === "append"
              ? COLORS.successGreen
              : highlight.mode === "remove"
              ? COLORS.dangerRed
              : COLORS.neutralGray
            : COLORS.neutralGray;

          return (
            <motion.line
              key={`edge-${node.id}`}
              x1={parent.x}
              y1={parent.y}
              x2={node.x}
              y2={node.y}
              stroke={edgeColor}
              strokeWidth={isHighlighted ? 3 : 2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          );
        })}

        {layout.map((node) => {
          const isHighlighted = highlight.ids.includes(node.id);
          const nodeFill = isHighlighted
            ? highlight.mode === "append"
              ? COLORS.successGreen
              : highlight.mode === "remove" || highlight.mode === "current"
              ? COLORS.dangerRed
              : COLORS.neutralGray
            : COLORS.neutralGray;

          return (
            <motion.g key={node.id}>
              <motion.rect
                x={node.x - (blockWidth * 0.95) / 2}
                y={node.y - (blockHeight * 0.95) / 2}
                rx={999}
                width={blockWidth * 0.95}
                height={blockHeight * 0.95}
                fill={nodeFill}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={FONT_SIZE.label}
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </motion.svg>
    </motion.div>
  );
}
