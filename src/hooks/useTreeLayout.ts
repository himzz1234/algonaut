import { useMemo } from "react";
import type { TreeNode } from "../algorithms/types";

export function useTreeLayout(
  nodes: TreeNode[],
  blockWidth: number,
  blockHeight: number,
  isMobile: boolean
) {
  const verticalSpacing = blockHeight * 1.2;
  const maxDepth = Math.max(0, ...nodes.map((n) => n.depth));
  const treeWidth = Math.pow(2, Math.min(2, maxDepth)) * blockWidth;

  const positions = useMemo(() => {
    const result: Record<number, { x: number; y: number }> = {};
    const root = nodes.find((n) => n.parentId === -1);
    if (!root) return result;

    function countLeaves(node: TreeNode): number {
      const children = nodes.filter((n) => n.parentId === node.id);
      if (children.length === 0) return 1;
      return children.reduce((sum, c) => sum + countLeaves(c), 0);
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
      const totalLeaves = children.reduce((s, c) => s + countLeaves(c), 0);
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
  }, [nodes, blockWidth, blockHeight, isMobile]);

  const layout = nodes.map((n) => ({
    ...n,
    x: positions[n.id]?.x ?? 0,
    y: positions[n.id]?.y ?? 0,
  }));

  return { layout, maxDepth, treeWidth, verticalSpacing };
}
