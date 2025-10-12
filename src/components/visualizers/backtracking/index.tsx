import TreeVisualizer from "./TreeVisualizer";
import type {
  BacktrackingStep,
  BacktrackingTreeStep,
} from "../../../algorithms/types";
import GridVisualizer from "./GridVisualizer";

type Props = {
  mode: "grid" | "tree";
  steps: (BacktrackingStep | BacktrackingTreeStep)[];
};

export default function BacktrackingVisualizer({ mode, steps }: Props) {
  if (mode === "tree") {
    return <TreeVisualizer steps={steps as BacktrackingTreeStep[]} />;
  }

  return <GridVisualizer steps={steps as BacktrackingStep[]} />;
}
