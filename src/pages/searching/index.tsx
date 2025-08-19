import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VisualizerLayout from "../../components/layout/VisualizerLayout";
import Controls from "../../components/layout/Controls";
import ProgressSlider from "../../components/ui/ProgressSlider";
import type { Block, SearchingStep } from "../../algorithms/types";
import AlgorithmInfoWrapper from "../../components/layout/AlgorithmInfoWrapper";
import { binarySearch, linearSearch } from "../../algorithms/searching";
import SearchingVisualizer from "../../components/visualizers/searching";
import { describeSearchingStep } from "../../steps/searching";

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
  }, [isPlaying, stepIndex, speed]);

  useEffect(() => {
    if (!stepIndex) setLogs([]);
    setLogs([...describeSearchingStep(stepIndex, steps)]);
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
      <SearchingVisualizer steps={steps} stepIndex={stepIndex} />
    </VisualizerLayout>
  );
}
