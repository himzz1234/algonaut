import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VisualizerLayout from "../../components/layout/VisualizerLayout";
import Controls from "../../components/layout/Controls";
import ProgressSlider from "../../components/ui/ProgressSlider";
import type { ArrayStep, Block } from "../../algorithms/types";
import AlgorithmInfoWrapper from "../../components/layout/AlgorithmInfoWrapper";
import ArrayVisualizer from "../../components/visualizers/array";
import { reverse, rotation } from "../../algorithms/array";
import { describeArrayStep } from "../../steps/array";
import { PseudoCodeBlock } from "../../components/layout/PseudoCodeBlock";

export default function ArrayPage() {
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

  let steps: ArrayStep[] = [];
  switch (algorithm) {
    case "reverse-array":
      steps = [...reverse(initialArray)];
      break;
    case "rotate-array":
      steps = [...rotation(initialArray, 2)];
      break;
    default:
      steps = [{ type: "init", array: initialArray, op: "reverse" }];
  }

  const BASE_SPEED = 700;
  const [speed, setSpeed] = useState("1x");
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    setLogs([...describeArrayStep(stepIndex, steps)]);
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
          isFullScreen={isFullscreen}
          toggleFullScreen={() => setIsFullscreen((f) => !f)}
        />
      }
      isFullScreen={isFullscreen}
      info={<AlgorithmInfoWrapper algorithmKey={algorithm ?? ""} />}
      logs={logs}
      pseudocode={
        <PseudoCodeBlock
          algorithmKey={algorithm ?? ""}
          activeLines={steps[stepIndex].lines ?? []}
        />
      }
    >
      <ArrayVisualizer steps={steps} stepIndex={stepIndex} />
    </VisualizerLayout>
  );
}
