import { useSearchParams } from "react-router-dom";
import type {
  GraphStep,
  GraphNode,
  GraphEdge,
} from "../../../algorithms/types";
import {
  generateBFS,
  generateDFS,
  generateTopoSort,
} from "../../../algorithms/graphs";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";
import GraphVisualizer from "../../../components/visualizers/graphs";

export default function GraphPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const nodes: GraphNode[] = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
  ];

  const edges: GraphEdge[] = [
    { id: "1-2", from: 1, to: 2, weight: 2 },
    { id: "1-3", from: 1, to: 3, weight: 1 },
    { id: "2-4", from: 2, to: 4, weight: 3 },
    { id: "3-4", from: 3, to: 4, weight: 1 },
    { id: "4-5", from: 4, to: 5, weight: 2 },
  ];

  let steps: GraphStep[] = [];
  switch (algorithm) {
    case "bfs":
      steps = [...generateBFS(nodes, edges, 1)];
      break;

    case "dfs":
      steps = [...generateDFS(nodes, edges, 1)];
      break;

    case "topological-sort":
      steps = [...generateTopoSort(nodes, edges)];
      break;

    default:
      steps = [
        {
          type: "init",
          nodes,
          edges,
          directed: true,
          explanation: "No algorithm selected. Showing input only.",
        },
      ];
  }

  return (
    <VisualizerLayoutWrapper<GraphStep>
      steps={steps}
      renderVisualizer={(steps) => <GraphVisualizer steps={steps} />}
      algorithmKey={algorithm ?? ""}
    />
  );
}
