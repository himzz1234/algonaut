import { useSearchParams } from "react-router-dom";
import type { Block, SortingStep } from "../../../algorithms/types";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
} from "../../../algorithms/sorting/index";
import SortingVisualizer from "../../../components/visualizers/sorting";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";

export default function SortingPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const initialArray: Block[] = [
    { id: 1, value: 50 },
    { id: 2, value: 40 },
    { id: 3, value: 10 },
    { id: 4, value: 20 },
    { id: 5, value: 60 },
    { id: 6, value: 30 },
  ];

  let steps: SortingStep[] = [];
  switch (algorithm) {
    case "bubble-sort":
      steps = [...bubbleSort(initialArray)];
      break;
    case "insertion-sort":
      steps = [...insertionSort(initialArray)];
      break;
    case "selection-sort":
      steps = [...selectionSort(initialArray)];
      break;
    case "merge-sort":
      steps = [...mergeSort(initialArray)];
      break;
    case "quick-sort":
      steps = [...quickSort(initialArray)];
      break;
    default:
      steps = [{ type: "init", array: initialArray }];
  }

  return (
    <VisualizerLayoutWrapper<SortingStep>
      steps={steps}
      renderVisualizer={(steps) => <SortingVisualizer steps={steps} />}
      algorithmKey={algorithm ?? ""}
    />
  );
}
