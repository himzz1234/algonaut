import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import type { ListStep, Node, PointerValue } from "../../../algorithms/types";
import { useOrientation } from "../../../hooks/useOrientation";
import { usePlayback } from "../../../context/PlaybackContext";
import {
  BASE_CONFIG,
  getBlockDimensions,
} from "../../../config/visualizerConfig";
import { COLORS } from "../../../config/visualizerColors";

type Props = {
  steps: ListStep[];
};

export default function LinkedListVisualizer({ steps }: Props) {
  const { stepIndex } = usePlayback();
  const { isMobile } = useOrientation();
  const { barWidth, barHeight, spacing, FONT_SIZE } = getBlockDimensions(
    isMobile,
    { ...BASE_CONFIG, GAP: 50 }
  );

  const { nodes, positions, highlight, pointers } = useMemo(() => {
    let { nodes, positions, highlight, pointers } = {
      nodes: [] as Node[],
      positions: {} as Record<number, number>,
      highlight: {} as {
        ids: number[];
        mode:
          | "current"
          | "compare"
          | "create"
          | "link"
          | "unlink"
          | "move"
          | null;
      },
      pointers: {} as Record<string, PointerValue<true>>,
    };

    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      const step = steps[i];
      switch (step.type) {
        case "init":
          nodes = [];
          positions = {};
          (step.array ?? []).forEach((node, i) => {
            nodes[i] = node;
            positions[node.id] = i;
          });

          highlight = { ids: [], mode: null };
          pointers = step.pointers ?? {};
          break;

        case "highlight":
          highlight = { ids: step.ids ?? [], mode: "current" };
          pointers = step.pointers ?? {};
          break;

        case "compare_next":
          highlight = { ids: step.ids, mode: "compare" };
          pointers = step.pointers ?? {};
          break;

        case "move":
          highlight = { ids: [step.id], mode: "move" };
          pointers = step.pointers ?? {};
          break;

        case "create_node":
          nodes = [...nodes, { id: step.id, value: step.value, next: null }];
          positions[step.id] = nodes.length - 1;
          highlight = { ids: [step.id], mode: "create" };
          pointers = step.pointers ?? {};
          break;

        case "link_next":
          highlight = { ids: step.ids ?? [], mode: "link" };
          pointers = step.pointers ?? {};

          if (step.ids && step.ids.length === 2) {
            const [fromId, toId] = step.ids;
            const fromNode = nodes.find((n) => n.id === fromId);
            const toNode = nodes.find((n) => n.id === toId);
            if (fromNode) fromNode.next = toNode ?? null;
          } else if (step.ids && step.ids.length === 1) {
            const [fromId] = step.ids;
            const fromNode = nodes.find((n) => n.id === fromId);
            if (fromNode) fromNode.next = null;
          }
          break;

        case "unlink_next":
          highlight = { ids: step.ids ?? [], mode: "unlink" };
          pointers = step.pointers ?? {};

          if (step.ids && step.ids.length === 2) {
            const [fromId, toId] = step.ids;
            const fromNode = nodes.find((n) => n.id === fromId);
            if (fromNode?.next?.id === toId) {
              fromNode.next = null;
            }
          }
          break;

        case "done":
          highlight = { ids: [], mode: null };
          pointers = step.pointers ?? {};
          break;
      }
    }

    return { nodes, positions, highlight, pointers };
  }, [steps, stepIndex]);

  const colorBlock = (id: number) => {
    if (!highlight.mode) return COLORS.neutralGray;
    if (!highlight.ids.includes(id)) return COLORS.neutralGray;

    switch (highlight.mode) {
      case "current":
        return COLORS.dangerRed;
      case "move":
        return COLORS.infoIndigo;
      case "link":
        return COLORS.successGreen;
      case "unlink":
        return COLORS.dangerRed;
      case "compare":
        return COLORS.accentYellow;
      default:
        return COLORS.neutralGray;
    }
  };

  const arrowPath = (xpos1: number, xpos2: number) => {
    const r = barWidth / 2;
    const center1x = xpos1 * spacing;
    const center2x = xpos2 * spacing;
    const centerY = barHeight / 2;

    if (Math.abs(xpos1 - xpos2) === 1) {
      const startX = center1x + (center1x < center2x ? 2 * r : 0);
      const endX = center2x + (center1x < center2x ? 0 : 2 * r + 2);
      const midX = (startX + endX) / 2;
      return `M ${startX} ${centerY} C ${midX} ${centerY}, ${midX} ${centerY}, ${endX} ${centerY}`;
    }

    const up = (xpos1 + xpos2) % 2 === 0;

    const startX = center1x + r;
    const endX = center2x + r;
    const gap = Math.abs(endX - startX);

    const startY = up ? 0 : barHeight;
    const endY = up ? 0 : barHeight;

    const base = 40;
    const archHeight = Math.min(160, base + gap * 0.18);

    const dir = up ? -1 : 1;
    const controlY = startY + dir * archHeight;

    const c1x = startX + (endX - startX) * 0.33;
    const c2x = startX + (endX - startX) * 0.66;

    const c1xOffset = gap > 120 ? 10 : 0;
    const c2xOffset = gap > 120 ? -10 : 0;

    const c1y = controlY;
    const c2y = controlY;

    return `M ${startX} ${startY} C ${c1x + c1xOffset} ${c1y}, ${
      c2x + c2xOffset
    } ${c2y}, ${endX} ${endY}`;
  };

  let groupedPointers: Record<number, string[]> = {};
  let nullPointerLabels: string[] = [];

  Object.entries(pointers).forEach(([label, value]) => {
    if (value === null) {
      nullPointerLabels.push(label);
    } else if (typeof value === "number") {
      if (value in groupedPointers) groupedPointers[value].push(label);
      else groupedPointers[value] = [label];
    }
  });

  const nullExists = nullPointerLabels.length > 0;
  const firstNodePos = nodes.length ? positions[nodes[0].id] ?? 0 : 0;
  const nullX = firstNodePos * spacing;
  const nullY = -2 * barHeight;

  return (
    <motion.div className="w-full h-full flex py-16 justify-center items-center relative">
      <motion.svg
        width={Math.max(1, nodes.length - 1) * spacing + barWidth}
        height={barHeight}
        style={{ overflow: "visible", translateY: "-50%" }}
      >
        <defs>
          {[
            { id: "arrow", fill: COLORS.neutralGray },
            { id: "arrow-new", fill: COLORS.successGreen },
            { id: "arrow-highlight", fill: COLORS.infoIndigo },
          ].map(({ id, fill }) => (
            <marker
              key={id}
              id={id}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={fill} />
            </marker>
          ))}
        </defs>

        {nodes.map((node) => {
          if (!node.next) return null;

          const next = node.next.id;
          if (next == null) return null;

          const currentStep = steps[stepIndex];
          const d = arrowPath(positions[node.id], positions[next]);

          const isHighlighted =
            currentStep.type === "move" &&
            currentStep.from === node.id &&
            currentStep.id === next;

          const isNew =
            currentStep.type === "link_next" && currentStep.ids[1] === next;

          return (
            <AnimatePresence>
              <motion.g key={`arrow-${node.id}-${node.next.id}`}>
                <>
                  <motion.path
                    key={`arrow-${node.id}-${node.next.id}`}
                    d={d}
                    stroke={isNew ? COLORS.successGreen : COLORS.neutralGray}
                    strokeWidth={2}
                    fill="none"
                    markerEnd={isNew ? "url(#arrow-new)" : "url(#arrow)"}
                    initial={{ pathLength: 0 }}
                    animate={
                      isHighlighted
                        ? { opacity: 0, pathLength: 1 }
                        : { opacity: 1, pathLength: 1 }
                    }
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      opacity: { duration: 0 },
                    }}
                  />

                  {isHighlighted && (
                    <motion.path
                      d={d}
                      stroke={COLORS.infoIndigo}
                      strokeWidth={2}
                      fill="none"
                      markerEnd="url(#arrow-highlight)"
                      strokeDasharray="6 6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, strokeDashoffset: [12, 0] }}
                      transition={{
                        opacity: { duration: 0.1 },
                        strokeDashoffset: {
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                        },
                      }}
                    />
                  )}
                </>
              </motion.g>
            </AnimatePresence>
          );
        })}

        {nodes.map((node) => {
          const pos = positions[node.id] ?? 0;
          const isHighlighted = highlight.ids.includes(node.id);

          const rectFill = colorBlock(node.id);
          const labelsAtIndex = groupedPointers[node.id];

          return (
            <motion.g
              key={node.id}
              transform={`translate(${pos * spacing}, ${0})`}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.rect
                rx={999}
                width={barWidth}
                height={barHeight}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: isHighlighted ? 1.05 : 1,
                }}
                fill={rectFill}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
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
                {node.value}
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

        <AnimatePresence>
          {nullExists && (
            <motion.g
              key="null-node"
              initial={{ opacity: 0, scale: 0.85, y: nullY, x: nullX }}
              animate={{ opacity: 1, scale: 1, y: nullY, x: nullX }}
              exit={{ opacity: 0, scale: 0.85, y: nullY, x: nullX }}
              transition={{
                opacity: { duration: 0.16, ease: "easeOut" },
                scale: { duration: 0.18, ease: "backOut" },
                y: { duration: 0.18, ease: "easeOut" },
              }}
            >
              <rect
                x={0}
                y={0}
                rx={999}
                width={barWidth}
                height={barHeight}
                fill="#0b1220"
                stroke="#374151"
                strokeWidth={1}
              />
              <text
                x={barWidth / 2}
                y={barHeight / 2}
                fontFamily="Satoshi"
                fontSize={FONT_SIZE.block}
                fill="#9ca3af"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                null
              </text>
              <text
                x={barWidth / 2}
                y={barHeight + 18}
                fontFamily="Satoshi"
                fontSize={FONT_SIZE.label}
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {nullPointerLabels.join(" = ")}
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </motion.svg>
    </motion.div>
  );
}
