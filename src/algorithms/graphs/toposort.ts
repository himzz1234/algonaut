import type { GraphEdge, GraphNode, GraphStep } from "../types";

function indegreePointers(indeg: Record<number, number>) {
  return Object.fromEntries(
    Object.entries(indeg).map(([id, val]) => [id, Number(val)])
  );
}

export function* generateTopoSort(
  nodes: GraphNode[],
  edges: GraphEdge[]
): Generator<GraphStep> {
  const adj: Record<number, number[]> = {};
  const indeg: Record<number, number> = {};

  for (const node of nodes) {
    adj[node.id] = [];
    indeg[node.id] = 0;
  }

  for (const e of edges) {
    adj[e.from].push(e.to);
    indeg[e.to]++;
  }

  const queue: number[] = [];

  yield {
    type: "init",
    nodes,
    edges,
    directed: true,
    weighted: false,
    structure: "queue",
    pointers: indegreePointers(indeg),
    explanation:
      "Initialize in-degrees and prepare a queue for zero in-degree nodes.",
    lines: [0],
  };

  for (const node of nodes) {
    if (indeg[node.id] === 0) {
      queue.push(node.id);
      yield {
        type: "enqueue",
        id: node.id,
        pointers: indegreePointers(indeg),
        explanation: `Node ${node.id} has in-degree 0, enqueue it.`,
        lines: [0],
      };
    }
  }

  while (queue.length > 0) {
    const current = queue.shift()!;

    yield {
      type: "dequeue",
      id: current,
      pointers: indegreePointers(indeg),
      explanation: `Remove node ${current} from the queue.`,
      lines: [0],
    };

    yield {
      type: "visit-node",
      id: current,
      pointers: indegreePointers(indeg),
      explanation: `Add node ${current} to the topological order.`,
      lines: [0],
    };

    for (const neighbor of adj[current]) {
      indeg[neighbor]--;

      if (indeg[neighbor] === 0) {
        queue.push(neighbor);
        yield {
          type: "enqueue",
          id: neighbor,
          pointers: indegreePointers(indeg),
          explanation: `Node ${neighbor} now has in-degree 0, enqueue it.`,
          lines: [0],
        };
      }
    }
  }

  yield {
    type: "done",
    explanation: "Topological sort completed. All nodes visited in order.",
    lines: [0],
  };
}
