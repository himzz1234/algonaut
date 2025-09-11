import VisualizerLayout from "./VisualizerLayout";
import Controls from "./Controls";
import ProgressSlider from "../ui/ProgressSlider";
import { PseudoCodeBlock } from "./PseudoCodeBlock";
import type { Step } from "../../algorithms/types";
import AlgorithmInfoWrapper from "./AlgorithmInfoWrapper";
import { PlaybackProvider } from "../../context/PlaybackContext";

type VisualizerLayoutWrapperProps<TStep extends Step> = {
  steps: TStep[];
  algorithmKey: string;
  renderVisualizer: (steps: TStep[]) => React.ReactNode;
  hideControls?: boolean;
  autoplay?: boolean;
  repeat?: boolean;
  pseudocode?: boolean;
};

export default function VisualizerLayoutWrapper<TStep extends Step>({
  steps,
  renderVisualizer,
  algorithmKey,
  hideControls = false,
  autoplay = false,
  repeat = false,
  pseudocode = true,
}: VisualizerLayoutWrapperProps<TStep>) {
  return (
    <PlaybackProvider
      repeat={repeat}
      autoplay={autoplay}
      stepsLength={steps.length}
    >
      <VisualizerLayout
        steps={steps}
        slider={
          <ProgressSlider stepsLength={steps.length} className="-mt-[5px]" />
        }
        controls={!hideControls ? <Controls /> : null}
        info={<AlgorithmInfoWrapper algorithmKey={algorithmKey ?? ""} />}
        pseudocode={
          pseudocode ? (
            <PseudoCodeBlock algorithmKey={algorithmKey} steps={steps} />
          ) : null
        }
      >
        {renderVisualizer(steps)}
      </VisualizerLayout>
    </PlaybackProvider>
  );
}
