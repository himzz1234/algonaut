import type { ListStep, Node } from "../types";
import { toArray } from "./helpers";

export function* cycleDetect(head: Node | null): Generator<ListStep> {
  if (!head) return;

  const nodes = toArray(head);
  let slowIndex = 0;
  let fastIndex = 0;

  yield {
    type: "init",
    array: [...toArray(head)],
    explanation: `We need to detect if this linked list has a cycle.`,
    lines: [0],
  };

  yield {
    type: "move",
    from: nodes[slowIndex].id,
    id: nodes[slowIndex].id,
    pointers: {
      head: nodes[slowIndex].id,
      slow: nodes[slowIndex].id,
      fast: nodes[fastIndex].id,
    },
    explanation: "Set both slow and fast pointers at the head.",
    lines: [1, 2],
  };

  while (fastIndex !== -1 && nodes[fastIndex]?.next) {
    const slowFromId = nodes[slowIndex].id;
    slowIndex = nodes.findIndex((n) => n.id === nodes[slowIndex].next?.id);
    if (slowIndex === -1) break;

    yield {
      type: "move",
      from: slowFromId,
      id: nodes[slowIndex].id,
      pointers: {
        head: nodes[0].id,
        slow: nodes[slowIndex].id,
        fast: nodes[fastIndex].id,
      },
      explanation: `Slow moves from ${
        nodes.find((n) => n.id === slowFromId)?.value
      } to ${nodes[slowIndex].value}.`,
      lines: [4],
    };

    const fastFromId = nodes[fastIndex].id;
    const fastFirstHopId = nodes[fastIndex].next?.id ?? null;
    let fastFirstHopIndex = fastFirstHopId
      ? nodes.findIndex((n) => n.id === fastFirstHopId)
      : -1;
    if (fastFirstHopIndex === -1) break;

    yield {
      type: "move",
      from: fastFromId,
      id: nodes[fastFirstHopIndex].id,
      pointers: {
        head: nodes[0].id,
        slow: nodes[slowIndex].id,
        fast: nodes[fastFirstHopIndex].id,
      },
      explanation: `Fast takes first hop from ${
        nodes.find((n) => n.id === fastFromId)?.value
      } to ${nodes[fastFirstHopIndex].value}.`,
      lines: [5],
    };

    const fastSecondFromId = nodes[fastFirstHopIndex].id;
    const fastSecondHopId = nodes[fastFirstHopIndex].next?.id ?? null;
    fastIndex =
      fastSecondHopId !== null
        ? nodes.findIndex((n) => n.id === fastSecondHopId)
        : -1;
    if (fastIndex === -1) break;

    yield {
      type: "move",
      from: fastSecondFromId,
      id: nodes[fastIndex].id,
      pointers: {
        head: nodes[0].id,
        slow: nodes[slowIndex].id,
        fast: nodes[fastIndex].id,
      },
      explanation: `Fast takes second hop from ${
        nodes.find((n) => n.id === fastSecondFromId)?.value
      } to ${nodes[fastIndex].value}.`,
      lines: [5],
    };

    if (slowIndex === fastIndex) {
      yield {
        type: "highlight",
        ids: [nodes[slowIndex].id],
        pointers: {
          head: nodes[0].id,
          slow: nodes[slowIndex].id,
          fast: nodes[fastIndex].id,
        },
        explanation: `Cycle detected! Slow and fast met at node ${nodes[slowIndex].value}.`,
        lines: [6, 7],
      };
      return;
    }
  }

  yield {
    type: "done",
    explanation: "No cycle detected. Fast pointer reached the end.",
    lines: [9],
  };
}
