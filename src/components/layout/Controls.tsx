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
  } = usePlayback();

  const isLastStep = stepIndex === stepsLength - 1;

  const btnClass = `active:scale-95 transition-all duration-150 
   px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 
   text-sm sm:text-base
   rounded-md hover:bg-gray-700/30 transition-colors`;

  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center w-full gap-3">
      <div className="flex justify-center sm:justify-start flex-wrap gap-2 flex-1">
        <button
          onClick={() => setStepIndex(0)}
          className={`${btnClass} rotate-180`}
        >
          <TbPlayerTrackNextFilled />
        </button>
        <button
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          className={`${btnClass} rotate-180`}
        >
          <IoPlaySkipForward />
        </button>
        <button
          onClick={
            isLastStep
              ? () => {
                  setStepIndex(0);
                  setIsPlaying(true);
                }
              : () => setIsPlaying((p) => !p)
          }
          className={`${btnClass}`}
        >
          {isLastStep ? <MdReplay /> : isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={() => setStepIndex((i) => Math.min(stepsLength - 1, i + 1))}
          className={`${btnClass}`}
        >
          <IoPlaySkipForward />
        </button>
        <button
          onClick={() => setStepIndex(stepsLength - 1)}
          className={`${btnClass}`}
        >
          <TbPlayerTrackNextFilled />
        </button>
      </div>

      <div className="flex justify-center sm:justify-end gap-2">
        <button
          onClick={() => setIsFullscreen((f) => !f)}
          className={`${btnClass}`}
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
              <button onClick={toggle} className={`${btnClass}`}>
                <IoSettingsSharp />
              </button>
            )}
          </Select>
        </div>
      </div>
    </div>
  );
}
