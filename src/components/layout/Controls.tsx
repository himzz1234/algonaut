import { MdReplay } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa6";
import { IoPlaySkipForward } from "react-icons/io5";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import Select from "../ui/Select";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import { usePlayback } from "../../context/PlaybackContext";

export default function Controls() {
  const {
    stepIndex,
    stepsLength,
    isPlaying,
    speed,
    setStepIndex,
    setIsPlaying,
    setSpeed,
    isFullscreen,
    setIsFullscreen,
    locked,
  } = usePlayback();

  const isLastStep = stepIndex === stepsLength - 1;

  const btnClass = (disabled: boolean) => `
    active:scale-95 transition-all duration-150
    px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3
    text-sm sm:text-base rounded-md
    ${
      disabled
        ? "opacity-40 pointer-events-none cursor-not-allowed hover:bg-transparent"
        : "hover:bg-[#141414]"
    }
  `;

  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center w-full gap-3">
      <div className="flex justify-center sm:justify-start flex-wrap gap-2 flex-1">
        <button
          disabled={locked}
          onClick={() => setStepIndex(0)}
          className={`${btnClass(locked)} rotate-180`}
          title="Go to first step"
        >
          <TbPlayerTrackNextFilled />
        </button>
        <button
          disabled={locked}
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          className={`${btnClass(locked)} rotate-180`}
          title="Previous step"
        >
          <IoPlaySkipForward />
        </button>
        <button
          disabled={locked}
          onClick={
            isLastStep
              ? () => {
                  setStepIndex(0);
                  setIsPlaying(true);
                }
              : () => setIsPlaying((p) => !p)
          }
          className={`${btnClass(locked)}`}
          title={
            isLastStep ? "Replay from start" : isPlaying ? "Pause" : "Play"
          }
        >
          {isLastStep ? <MdReplay /> : isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          disabled={locked}
          onClick={() => setStepIndex((i) => Math.min(stepsLength - 1, i + 1))}
          className={`${btnClass(locked)}`}
          title="Next step"
        >
          <IoPlaySkipForward />
        </button>
        <button
          disabled={locked}
          onClick={() => setStepIndex(stepsLength - 1)}
          className={`${btnClass(locked)}`}
          title="Go to last step"
        >
          <TbPlayerTrackNextFilled />
        </button>
      </div>

      <div className="flex justify-center sm:justify-end gap-2">
        <button
          onClick={() => setIsFullscreen((f) => !f)}
          className={`${btnClass(false)}`}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {!isFullscreen ? <FaExpandAlt /> : <FaCompressAlt />}
        </button>
        <div className="w-auto">
          <Select
            options={["0.25x", "0.5x", "1x", "1.25x", "1.5x"]}
            selected={speed}
            onSelect={setSpeed}
            placement="top"
            align="right"
          >
            {({ toggle }) => (
              <button
                onClick={toggle}
                className={`${btnClass(locked)}`}
                title="Playback speed"
              >
                <IoSettingsSharp />
              </button>
            )}
          </Select>
        </div>
      </div>
    </div>
  );
}
