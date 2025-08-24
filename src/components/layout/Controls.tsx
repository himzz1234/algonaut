import { MdReplay } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa6";
import { IoPlaySkipForward } from "react-icons/io5";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import Select from "../ui/Select";
import { MdFullscreen } from "react-icons/md";
import { IoInformation } from "react-icons/io5";

interface ControlsProps {
  stepIndex: number;
  stepsLength: number;
  isPlaying: boolean;
  speed: string;
  setStepIndex: (i: number | ((prev: number) => number)) => void;
  setIsPlaying: (v: boolean | ((prev: boolean) => boolean)) => void;
  setSpeed: (s: string) => void;
  toggleFullScreen: () => void;
}

export default function Controls({
  stepIndex,
  stepsLength,
  isPlaying,
  speed,
  setStepIndex,
  setIsPlaying,
  setSpeed,
  toggleFullScreen,
}: ControlsProps) {
  const isLastStep = stepIndex === stepsLength - 1;

  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center w-full gap-3">
      {/* Playback controls */}
      <div className="flex justify-center sm:justify-start flex-wrap gap-2 flex-1">
        <button
          onClick={() => setStepIndex(0)}
          className="active:scale-95 duration-150 px-3 py-2 border-[2px] rotate-180 border-gray-700/60 rounded hover:border-green-400 transition"
        >
          <TbPlayerTrackNextFilled />
        </button>
        <button
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          className="active:scale-95 duration-150 px-3 py-2 border-[2px] rotate-180 border-gray-700/60 rounded hover:border-green-400 transition"
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
          className="active:scale-95 transition-all duration-150 px-3 py-2 cursor-pointer border-[2px] border-gray-700/60 rounded hover:border-green-400 font-medium"
        >
          {isLastStep ? <MdReplay /> : isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={() => setStepIndex((i) => Math.min(stepsLength - 1, i + 1))}
          className="active:scale-95 duration-150 px-3 py-2 border-[2px] border-gray-700/60 rounded hover:border-green-400 transition"
        >
          <IoPlaySkipForward />
        </button>
        <button
          onClick={() => setStepIndex(stepsLength - 1)}
          className="active:scale-95 duration-150 px-3 py-2 border-[2px] border-gray-700/60 rounded hover:border-green-400 transition"
        >
          <TbPlayerTrackNextFilled />
        </button>
      </div>

      {/* Info + fullscreen + speed */}
      <div className="flex justify-center sm:justify-end gap-2">
        <button className="active:scale-95 duration-150 px-3 py-2 border-[2px] border-gray-700/60 rounded hover:border-green-400 transition">
          <IoInformation />
        </button>
        <button
          onClick={toggleFullScreen}
          className="active:scale-95 duration-150 px-3 py-2 border-[2px] border-gray-700/60 rounded hover:border-green-400 transition"
        >
          <MdFullscreen />
        </button>
        <div className="w-auto">
          <Select
            options={["0.25x", "0.5x", "1x", "1.25x", "1.5x"]}
            selected={speed}
            onSelect={setSpeed}
            placement="top"
          >
            {({ toggle }) => (
              <button
                onClick={toggle}
                className="active:scale-95 duration-150 px-3 py-2 border-[2px] border-gray-700/60 rounded hover:border-green-400 transition"
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
