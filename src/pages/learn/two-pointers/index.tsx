import { useSearchParams } from "react-router-dom";
import type { Block, TwoPointerStep } from "../../../algorithms/types";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";
import {
  mostWater,
  threeSum,
  twoSum,
  moveZeroes,
  trapWater,
} from "../../../algorithms/two-pointers";
import TwoPointersVisualizer from "../../../components/visualizers/two-pointers";

export default function TwoPointersPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const initialArray: Block[] = [
    { id: 1, value: 3 },
    { id: 2, value: 1 },
    { id: 3, value: 2 },
    { id: 4, value: 4 },
    { id: 5, value: 1 },
    { id: 6, value: 8 },
  ];

  const arrayWithZeroes: Block[] = [
    { id: 1, value: 0 },
    { id: 2, value: 1 },
    { id: 3, value: 0 },
    { id: 4, value: 3 },
    { id: 5, value: 12 },
    { id: 6, value: 0 },
  ];

  let steps: TwoPointerStep[] = [];
  switch (algorithm) {
    case "two-sum-sorted": {
      const sortedArray = [...initialArray].sort((a, b) => a.value - b.value);
      steps = [...twoSum(sortedArray, 7)];
      break;
    }

    case "move-zeroes": {
      steps = [...moveZeroes(arrayWithZeroes)];
      break;
    }

    case "three-sum": {
      const sortedArray = [...initialArray].sort((a, b) => a.value - b.value);
      steps = [...threeSum(sortedArray, 15)];
      break;
    }

    case "container-most-water": {
      steps = [...mostWater(initialArray)];
      break;
    }

    case "trap-rain-water": {
      steps = [...trapWater(initialArray)];
      break;
    }

    default:
      steps = [{ type: "init", array: initialArray }];
  }

  return (
    <VisualizerLayoutWrapper<TwoPointerStep>
      steps={steps}
      renderVisualizer={(steps) => <TwoPointersVisualizer steps={steps} />}
      algorithmKey={algorithm ?? ""}
    />
  );
}
