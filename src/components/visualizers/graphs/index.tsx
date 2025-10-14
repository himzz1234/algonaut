import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import type {
  GraphStep,
  GraphNode,
  GraphEdge,
  PointerValue,
} from "../../../algorithms/types";
import { usePlayback } from "../../../context/PlaybackContext";
import { useOrientation } from "../../../hooks/useOrientation";
import { getBlockDimensions } from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";

type Props = {
  steps: GraphStep[];
};

export default function GraphVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { blockWidth, blockHeight, FONT_SIZE } = getBlockDimensions(isMobile);

  const {
    nodes,
    edges,
    highlight,
    visited,
    pointers,
    directed,
    weighted,
    frontier,
    structureType,
    structureContents,
  } = useMemo(() => {
    let {
      nodes,
      edges,
      highlight,
      directed,
      weighted,
      visited,
      pointers,
      frontier,
      structureType,
      structureContents,
    } = {
      nodes: [] as GraphNode[],
      edges: [] as GraphEdge[],
      directed: false as Boolean,
      weighted: false as Boolean,
      highlight: { ids: [] as number[], mode: null as "current" | null },
      visited: new Set<number>(),
      pointers: {} as Record<string, PointerValue>,
      frontier: new Set<number>(),
      structureType: null as "queue" | "stack" | "priority-queue" | null,
      structureContents: [] as number[],
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];

      switch (step.type) {
        case "init":
          nodes = step.nodes ?? [];
          edges = step.edges ?? [];
          directed = step.directed ?? false;
          weighted = step.weighted ?? false;
          highlight = { ids: [], mode: null };
          structureType = step.structure ?? null;
          structureContents = [];
          pointers = {};
          break;

        case "highlight-node":
          highlight = { ids: step.ids ?? [], mode: "current" };
          pointers = step.pointers ?? {};
          break;

        case "highlight-edge":
          break;

        case "visit-node":
          visited.add(step.id);
          frontier.delete(step.id);
          highlight = { ids: [], mode: null };
          pointers = step.pointers ?? {};
          break;

        case "enqueue":
          structureContents.push(step.id);
          frontier.add(step.id);
          pointers = step.pointers ?? {};
          break;

        case "dequeue":
          highlight = { ids: [step.id], mode: "current" };
          structureContents.shift();
          frontier.delete(step.id);
          pointers = step.pointers ?? {};
          break;

        case "update-distance":
          break;

        case "add-to-result":
          break;

        case "done":
          highlight = { ids: [], mode: null };
          break;
      }
    }

    return {
      nodes,
      edges,
      highlight,
      visited,
      directed,
      weighted,
      pointers,
      frontier,
      structureType,
      structureContents,
    };
  }, [steps, stepIndex]);

  const getNodeColor = (id: number) => {
    const isHighlighted =
      highlight.ids.includes(id) && highlight.mode === "current";
    const isVisited = visited.has(id);
    const isfrontier = frontier.has(id);

    if (isHighlighted) return COLORS.dangerRed;
    if (isVisited) return COLORS.successGreen;
    if (isfrontier) return COLORS.accentYellow;
    return COLORS.neutralGray;
  };

  const { layout, width, height } = useMemo(() => {
    const layerSpacing = blockWidth * 2;
    const nodeSpacing = blockHeight * 1.8;

    const inDegree: Record<number, number> = {};
    nodes.forEach((n) => (inDegree[n.id] = 0));
    edges.forEach((e) => {
      inDegree[e.to] = (inDegree[e.to] ?? 0) + 1;
    });

    const layerMap: Record<number, number> = {};
    const queue = nodes.filter((n) => inDegree[n.id] === 0);
    queue.forEach((n) => (layerMap[n.id] = 0));

    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentLayer = layerMap[current.id];
      edges.forEach((e) => {
        if (e.from === current.id) {
          const nextLayer = currentLayer + 1;
          if (layerMap[e.to] === undefined || layerMap[e.to] < nextLayer) {
            layerMap[e.to] = nextLayer;
          }
          inDegree[e.to]--;
          if (inDegree[e.to] === 0) {
            const targetNode = nodes.find((n) => n.id === e.to);
            if (targetNode) queue.push(targetNode);
          }
        }
      });
    }

    const layers: Record<number, GraphNode[]> = {};
    nodes.forEach((node) => {
      const layer = layerMap[node.id] ?? 0;
      layers[layer] = layers[layer] || [];
      layers[layer].push(node);
    });

    const layout = nodes.map((node) => {
      const layer = layerMap[node.id] ?? 0;
      const indexInLayer = layers[layer].indexOf(node);
      return {
        ...node,
        x: layer * layerSpacing,
        y: indexInLayer * nodeSpacing,
      };
    });

    const xs = layout.map((n) => n.x);
    const ys = layout.map((n) => n.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const width = maxX - minX;
    const height = maxY - minY;

    return {
      layout,
      width,
      height,
    };
  }, [nodes, edges, blockWidth, blockHeight]);

  const maxSlots = 3;
  const slotW = blockWidth * 0.75;
  const slotH = blockHeight * 0.75;

  const getSlotY = (index: number) => {
    const startY = (maxSlots - 1) * slotH;
    return startY - index * slotH;
  };

  return (
    <motion.div className="w-full h-full flex justify-center items-center relative">
      <motion.svg
        width={structureType ? width + 250 : width}
        height={structureType ? height + 150 : height}
        style={{
          overflow: "visible",
          translateY: "-30%",
        }}
      >
        <motion.g
          transform={
            structureType
              ? `translate(50, 50) scale(0.9)`
              : `translate(${width / 2}, ${height / 2}) scale(1) translate(${
                  -width / 2
                }, ${-height / 2})`
          }
          transition={{ duration: 0.4 }}
        >
          {edges.map((edge, i) => {
            const from = layout.find((n) => n.id === edge.from);
            const to = layout.find((n) => n.id === edge.to);
            if (!from || !to) return null;

            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const px = -dy / len;
            const py = dx / len;
            const offset = -12;
            const labelX = midX + px * offset;
            const labelY = midY + py * offset;

            return (
              <motion.g key={`edge-${i}`}>
                <motion.line
                  x1={from.x + blockWidth / 2.75}
                  y1={from.y}
                  x2={to.x - blockWidth / 2.75}
                  y2={to.y}
                  stroke={COLORS.neutralGray}
                  strokeWidth={2.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                  markerEnd={directed ? "url(#arrowhead)" : undefined}
                />
                {weighted && edge.weight !== undefined && (
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    fontSize={12}
                    fill="white"
                  >
                    {edge.weight}
                  </text>
                )}
              </motion.g>
            );
          })}

          {directed && (
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="15"
                refY="3"
                orient="auto"
                fill={COLORS.neutralGray}
              >
                <polygon points="0 0, 6 3, 0 6" />
              </marker>
            </defs>
          )}

          {layout.map((node) => (
            <motion.g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={blockWidth / 2.6}
                fill={getNodeColor(node.id)}
                animate={{ scale: highlight.ids.includes(node.id) ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={14}
              >
                {node.label ?? node.id}
              </text>
              {pointers[node.id] !== undefined && (
                <motion.text
                  key={`${node.id}-${pointers[node.id]}`}
                  x={node.x}
                  y={node.y + blockHeight / 1.5}
                  textAnchor="middle"
                  fontSize={FONT_SIZE.label}
                  fill="white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                >
                  {pointers[node.id].toString()}
                </motion.text>
              )}
            </motion.g>
          ))}
        </motion.g>

        {structureType && (
          <motion.g transform={`translate(${width + 150}, 50)`}>
            <motion.text
              x={slotW / 2}
              y={-15}
              textAnchor="middle"
              fontSize={16}
              fill="white"
            >
              {structureType === "queue" && "Queue"}
              {structureType === "stack" && "Stack"}
              {structureType === "priority-queue" && "Priority Queue"}
            </motion.text>

            {Array.from({ length: maxSlots }).map((_, i) => {
              const y = (maxSlots - 1 - i) * slotH;
              return (
                <motion.rect
                  key={`slot-${i}`}
                  x={0}
                  y={y}
                  width={slotW}
                  height={slotH}
                  fill="none"
                  stroke={COLORS.neutralGray}
                  strokeWidth={2}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                />
              );
            })}

            <AnimatePresence>
              {structureContents.map((id, i) => {
                const y = getSlotY(i);
                return (
                  <motion.g
                    key={`item-${id}`}
                    transform={`translate(0, ${y})`}
                    initial={{ opacity: 0, scale: 0.8, y: y - 10 }}
                    animate={{ opacity: 1, scale: 1, y: y }}
                    exit={{ opacity: 0, scale: 0.8, y: y + 10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <motion.text
                      x={slotW / 2}
                      y={slotH / 2 + 5}
                      textAnchor="middle"
                      fontSize={16}
                      fill="white"
                    >
                      {id}
                    </motion.text>
                  </motion.g>
                );
              })}
            </AnimatePresence>
          </motion.g>
        )}
      </motion.svg>
    </motion.div>
  );
}
