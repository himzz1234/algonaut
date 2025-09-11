import { useSearchParams } from "react-router-dom";
import type { Block, SearchingStep } from "../../../algorithms/types";
import { binarySearch, linearSearch } from "../../../algorithms/searching";
import SearchingVisualizer from "../../../components/visualizers/searching";
import VisualizerLayoutWrapper from "../../../components/layout/VisualizerLayoutWrapper";

export default function SearchingPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const initialArray: Block[] = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 50 },
    { id: 6, value: 60 },
  ];

  let steps: SearchingStep[] = [];
  switch (algorithm) {
    case "linear-search":
      steps = [...linearSearch(initialArray, 30)];
      break;
    case "binary-search":
      steps = [...binarySearch(initialArray, 40)];
      break;
    default:
      steps = [{ type: "init", array: initialArray, target: 20 }];
  }

  return (
    <VisualizerLayoutWrapper<SearchingStep>
      steps={steps}
      renderVisualizer={(steps) => <SearchingVisualizer steps={steps} />}
      algorithmKey={algorithm ?? ""}
    />
  );
}
