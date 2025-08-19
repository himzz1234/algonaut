import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VisualizerLayout from "../../components/layout/VisualizerLayout";
import Controls from "../../components/layout/Controls";
import ProgressSlider from "../../components/ui/ProgressSlider";
import type { Block, SortingStep } from "../../algorithms/types";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
} from "../../algorithms/sorting/index";
import SortingVisualizer from "../../components/visualizers/sorting";
import AlgorithmInfoWrapper from "../../components/layout/AlgorithmInfoWrapper";
import { describeSortingStep } from "../../steps/sorting";

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

  const BASE_SPEED = 700;
  const [speed, setSpeed] = useState("1x");
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const parseMultiplier = (label: string) => parseFloat(label.replace("x", ""));

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const id = setTimeout(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    }, BASE_SPEED / parseMultiplier(speed));

    return () => clearTimeout(id);
  }, [isPlaying, stepIndex, steps.length, speed]);

  useEffect(() => {
    if (!stepIndex) setLogs([]);
    setLogs([...describeSortingStep(stepIndex, steps)]);
  }, [stepIndex]);

  return (
    <VisualizerLayout
      slider={
        <ProgressSlider
          stepIndex={stepIndex}
          stepsLength={steps.length}
          onChange={setStepIndex}
          className="-mt-[5px]"
        />
      }
      controls={
        <Controls
          stepIndex={stepIndex}
          stepsLength={steps.length}
          isPlaying={isPlaying}
          speed={speed}
          setStepIndex={setStepIndex}
          setIsPlaying={setIsPlaying}
          setSpeed={setSpeed}
        />
      }
      info={<AlgorithmInfoWrapper algorithmKey={algorithm ?? ""} />}
      logs={logs}
    >
      <SortingVisualizer steps={steps} stepIndex={stepIndex} />
    </VisualizerLayout>
  );
}
