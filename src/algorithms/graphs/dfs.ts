import type { GraphEdge, GraphNode, GraphStep } from "../types";

export function* generateDFS(
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

  yield {
    type: "init",
    nodes,
    edges,
    directed: false,
    weighted: false,
    explanation: `We need to traverse the graph using DFS technique.`,
    lines: [0],
  };

  function* dfs(current: number): Generator<GraphStep> {
    yield {
      type: "highlight-node",
      ids: [current],
      explanation: `We are now exploring node ${current}.`,
      lines: [2, 3, 4],
    };

    visited.add(current);
    yield {
      type: "visit-node",
      id: current,
      label: "Visited",
      explanation: `Mark node ${current} as visited.`,
      lines: [1],
    };

    for (const neighbor of adj[current]) {
      if (!visited.has(neighbor)) {
        yield* dfs(neighbor);
      }
    }
  }

  yield* dfs(source);

  yield {
    type: "done",
    explanation: `The DFS traversal is finished. All reachable nodes have been visited.`,
    lines: [0],
  };
}
