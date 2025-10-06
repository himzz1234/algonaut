import VisualizerLayout from "./VisualizerLayout";
import type { Step } from "../../algorithms/types";
import { PlaybackProvider } from "../../context/PlaybackContext";
import AlgorithmSEO from "../AlgorithmSEO";

type VisualizerLayoutWrapperProps<TStep extends Step<any>> = {
  type?: "demo" | "learn";
  steps: TStep[];
  algorithmKey: string;
  renderVisualizer: (steps: TStep[]) => React.ReactNode;
  autoplay?: boolean;
  repeat?: boolean;
};

export default function VisualizerLayoutWrapper<TStep extends Step<any>>({
  steps,
  type = "learn",
  renderVisualizer,
  algorithmKey,
  autoplay = false,
  repeat = false,
}: VisualizerLayoutWrapperProps<TStep>) {
  return (
    <>
      <AlgorithmSEO />
      <PlaybackProvider
        key={algorithmKey}
        repeat={repeat}
        autoplay={autoplay}
        stepsLength={steps.length}
      >
        <VisualizerLayout type={type} steps={steps} algorithmKey={algorithmKey}>
          {renderVisualizer(steps)}
        </VisualizerLayout>
      </PlaybackProvider>
    </>
  );
}
