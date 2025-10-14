import type { GraphEdge, GraphNode, GraphStep } from "../types";

export function* generateBFS(
  nodes: GraphNode[],
  edges: GraphEdge[],
  source: number
): Generator<GraphStep> {
  const adj: Record<number, number[]> = {};
  for (const node of nodes) {
    adj[node.id] = [];
  }
  for (const e of edges) {
    adj[e.from].push(e.to);
    adj[e.to].push(e.from);
  }

  const visited = new Set<number>();
  const queue: number[] = [];

  yield {
    type: "init",
    nodes,
    edges,
    directed: false,
    weighted: false,
    structure: "queue",
    explanation: `We need to traverse the graph using BFS technique.`,
    lines: [0, 1],
  };

  visited.add(source);
  queue.push(source);

  yield {
    type: "visit-node",
    id: source,
    label: "Visited",
    explanation: `Mark node ${source} as visited.`,
    lines: [2],
  };

  yield {
    type: "enqueue",
    id: source,
    explanation: `Add node ${source} to the queue to begin the traversal.`,
    lines: [3],
  };

  while (queue.length > 0) {
    const current = queue.shift() as number;

    yield {
      type: "dequeue",
      id: current,
      explanation: `Remove node ${current} from the queue so we can process it.`,
      lines: [4, 5],
    };

    for (const neighbor of adj[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        yield {
          type: "enqueue",
          id: neighbor,
          explanation: `Node ${neighbor} is connected to ${current} and has not been visited yet, so we add it to the queue.`,
          lines: [6, 7, 8],
        };

        yield {
          type: "visit-node",
          id: neighbor,
          label: "Visited",
          explanation: `Mark node ${neighbor} as visited.`,
          lines: [6, 7, 9],
        };
      }
    }
  }

  yield {
    type: "done",
    explanation: `The BFS traversal is finished. All reachable nodes have been visited.`,
    lines: [],
  };
}
