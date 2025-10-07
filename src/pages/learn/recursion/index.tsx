import { useSearchParams } from "react-router-dom";
import type {
  RecursionStep,
  RecursionTreeStep,
} from "../../../algorithms/types";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";
import { factorial, fibonacci, sumOfN } from "../../../algorithms/recursion";
import RecursionVisualizer from "../../../components/visualizers/recursion";

export default function RecursionPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  let steps: (RecursionStep | RecursionTreeStep)[] = [];
  switch (algorithm) {
    case "factorial":
      steps = [...factorial(5)];
      break;
    case "sum-n":
      steps = [...sumOfN(5)];
      break;
    case "fibonacci":
      steps = [...fibonacci(4)];
      break;
    default:
      steps = [...factorial(5)];
      break;
  }

  return (
    <VisualizerLayoutWrapper<RecursionStep | RecursionTreeStep>
      steps={steps}
      renderVisualizer={(steps) => (
        <RecursionVisualizer
          mode={algorithm === "fibonacci" ? "tree" : "stack"}
          steps={steps}
        />
      )}
      algorithmKey={algorithm ?? ""}
    />
  );
}
