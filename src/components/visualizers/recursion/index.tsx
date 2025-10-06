import StackVisualizer from "./StackVisualizer";
import TreeVisualizer from "./TreeVisualizer";
import type {
  RecursionStep,
  RecursionTreeStep,
} from "../../../algorithms/types";

type Props = {
  mode: "stack" | "tree";
  steps: (RecursionStep | RecursionTreeStep)[];
};

export default function RecursionVisualizer({ mode, steps }: Props) {
  if (mode === "tree") {
    return <TreeVisualizer steps={steps as RecursionTreeStep[]} />;
  }
  return <StackVisualizer steps={steps as RecursionStep[]} />;
}
