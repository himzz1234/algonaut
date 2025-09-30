import { useSearchParams } from "react-router-dom";
import type { Block, BacktrackingStep } from "../../../algorithms/types";
import BacktrackingVisualizer from "../../../components/visualizers/backtracking";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";
import {
  generateCombinationSum,
  generateLetterCombinations,
  generatePermutations,
  generateSubsets,
} from "../../../algorithms/backtracking";

export default function BacktrackingPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const initialArray: Block[] = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
  ];

  let steps: BacktrackingStep[] = [];

  switch (algorithm) {
    case "subsets":
      steps = [...generateSubsets(initialArray)];
      break;

    case "permutations":
      steps = [...generatePermutations(initialArray)];
      break;

    case "combination-sum":
      steps = [...generateCombinationSum(initialArray, 3)];
      break;

    case "letter-combinations-phone":
      steps = [...generateLetterCombinations("23")];
      break;

    default:
      steps = [
        {
          type: "init",
          array: initialArray,
          explanation: "No algorithm selected. Showing input only.",
        },
      ];
  }

  return (
    <VisualizerLayoutWrapper<BacktrackingStep>
      steps={steps}
      renderVisualizer={(steps) => <BacktrackingVisualizer steps={steps} />}
      algorithmKey={algorithm ?? ""}
    />
  );
}
