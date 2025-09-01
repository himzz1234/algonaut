import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VisualizerLayout from "../../components/layout/VisualizerLayout";
import Controls from "../../components/layout/Controls";
import ProgressSlider from "../../components/ui/ProgressSlider";
import type { Cell, PathfindingStep } from "../../algorithms/types";
import AlgorithmInfoWrapper from "../../components/layout/AlgorithmInfoWrapper";
import PathfindingVisualizer from "../../components/visualizers/pathfinding";
import { bfs, dfs } from "../../algorithms/pathfinding";
import { describePathfindingStep } from "../../steps/pathfinding";
import { PseudoCodeBlock } from "../../components/layout/PseudoCodeBlock";

export default function PathfindingPage() {
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get("algorithm");

  const initialGrid: Cell[][] = [
    [
      { id: 1, row: 0, col: 0, weight: 10 },
      { id: 2, row: 0, col: 1, weight: 10 },
      { id: 3, row: 0, col: 2, weight: 10 },
      { id: 4, row: 0, col: 3, weight: 10 },
    ],
    [
      { id: 5, row: 1, col: 0, weight: 10 },
      { id: 6, row: 1, col: 1, weight: 10 },
      { id: 7, row: 1, col: 2, weight: 10 },
      { id: 8, row: 1, col: 3, weight: 10 },
    ],
    [
      { id: 9, row: 2, col: 0, weight: 10 },
      { id: 10, row: 2, col: 1, weight: 10 },
      { id: 11, row: 2, col: 2, weight: 10 },
      { id: 12, row: 2, col: 3, weight: 10 },
    ],
    [
      { id: 13, row: 3, col: 0, weight: 10 },
      { id: 14, row: 3, col: 1, weight: 10 },
      { id: 15, row: 3, col: 2, weight: 10 },
      { id: 16, row: 3, col: 3, weight: 10 },
    ],
  ];

  let steps: PathfindingStep[] = [];
  switch (algorithm) {
    case "bfs":
      steps = [...bfs(initialGrid, { row: 2, col: 2 })];
      break;
    case "dfs":
      steps = [...dfs(initialGrid, { row: 2, col: 2 })];
      break;
    default:
      steps = [
        {
          type: "init",
          grid: initialGrid,
          start: { row: 0, col: 0 },
          target: { row: 0, col: 0 },
        },
      ];
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
  }, [isPlaying, stepIndex, speed]);

  useEffect(() => {
    if (!stepIndex) setLogs([]);
    setLogs([...describePathfindingStep(stepIndex, steps)]);
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
          activeLines={steps[stepIndex]?.lines ?? []}
        />
      }
    >
      <PathfindingVisualizer steps={steps} stepIndex={stepIndex} />
    </VisualizerLayout>
  );
}
