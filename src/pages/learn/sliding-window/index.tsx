import { useSearchParams } from "react-router-dom";
import type { Block, SlidingWindowStep } from "../../../algorithms/types";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";
import SlidingWindowVisualizer from "../../../components/visualizers/sliding-window";
import {
  longestSubstringWithoutRepeat,
  maxSumSubarrayK,
  smallestSubarrayWithSumGreaterThanK,
} from "../../../algorithms/sliding-window";

export default function SlidingWindowPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const initialArray: Block[] = [
    { id: 1, value: 2 },
    { id: 2, value: 1 },
    { id: 3, value: 5 },
    { id: 4, value: 1 },
    { id: 5, value: 3 },
    { id: 6, value: 2 },
  ];

  let steps: SlidingWindowStep[] = [];

  switch (algorithm) {
    case "max-sum-subarray-k":
      steps = [...maxSumSubarrayK(initialArray, 3)];
      break;
    case "longest-substring-without-repeat":
      steps = [...longestSubstringWithoutRepeat("ABCAEF")];
      break;
    case "smallest-subarray-with-sum-greater-than-k":
      steps = [...smallestSubarrayWithSumGreaterThanK(initialArray, 3)];
      break;

    default:
      steps = [{ type: "init", array: initialArray }];
  }

  return (
    <VisualizerLayoutWrapper<SlidingWindowStep>
      steps={steps}
      renderVisualizer={(steps) => <SlidingWindowVisualizer steps={steps} />}
      algorithmKey={algorithm ?? ""}
    />
  );
}
