import { useSearchParams } from "react-router-dom";
import type { ArrayStep, Block } from "../../../algorithms/types";
import {
  findMinMax,
  kadane,
  reverse,
  rotation,
} from "../../../algorithms/array";
import ArrayVisualizer from "../../../components/visualizers/array";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";

export default function SortingPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const initialArray: Block[] = [
    { id: 1, value: -2 },
    { id: 2, value: 3 },
    { id: 3, value: -4 },
    { id: 4, value: 12 },
    { id: 5, value: -8 },
    { id: 6, value: 10 },
  ];

  let steps: ArrayStep[] = [];
  switch (algorithm) {
    case "reverse-array": {
      steps = [...reverse(initialArray)];
      break;
    }
    case "rotate-array": {
      steps = [...rotation(initialArray, 3)];
      break;
    }
    case "kadane": {
      steps = [...kadane(initialArray)];
      break;
    }
    case "find-min-max": {
      steps = [...findMinMax(initialArray)];
      break;
    }
    default:
      steps = [{ type: "init", array: initialArray }];
  }

  return (
    <VisualizerLayoutWrapper
      steps={steps}
      renderVisualizer={(steps) => <ArrayVisualizer steps={steps} />}
      algorithmKey={algorithm ?? ""}
    />
  );
}
