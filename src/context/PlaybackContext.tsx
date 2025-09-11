import React, { createContext, useContext, useEffect, useState } from "react";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import { useModal } from "./ModalContext";

export type PlaybackContextType = {
  stepIndex: number;
  stepsLength: number;
  isPlaying: boolean;
  speed: string;
  isFullscreen: boolean;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setSpeed: React.Dispatch<React.SetStateAction<string>>;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlaybackContext = createContext<PlaybackContextType | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  stepsLength: number;
  autoplay?: boolean;
  repeat?: boolean;
  baseSpeed?: number;
};

export function PlaybackProvider({
  children,
  stepsLength,
  autoplay = false,
  repeat = false,
  baseSpeed = 700,
}: ProviderProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [speed, setSpeed] = useState("1x");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { openModal } = useModal();

  const parseMultiplier = (label: string) =>
    parseFloat(label.replace("x", "")) || 1;

  useEffect(() => {
    if (!isPlaying && !autoplay) return;
    if (stepIndex >= stepsLength - 1) {
      if (!repeat) {
        setIsPlaying(false);
        return;
      } else {
        setStepIndex(0);
      }
    }

    const id = setTimeout(() => {
      console.log("hi");
      setStepIndex((i) => Math.min(i + 1, stepsLength - 1));
    }, baseSpeed / parseMultiplier(speed));

    return () => clearTimeout(id);
  }, [isPlaying, stepIndex, stepsLength, speed, autoplay, repeat, baseSpeed]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      const isToggleShortcuts =
        (e.ctrlKey || e.metaKey) && (e.key === "h" || e.key === "H");

      if (isToggleShortcuts) {
        e.preventDefault();
        openModal(<KeyboardShortcuts />);
        return;
      }

      const isSpace =
        e.code === "Space" || e.key === " " || e.key === "Spacebar";

      if (isSpace) {
        if (e.repeat) return;
        e.preventDefault();
        setIsPlaying((p) => {
          if (stepIndex === stepsLength - 1 && !p) {
            setStepIndex(0);
            return true;
          }
          return !p;
        });

        return;
      }

      if (e.key === "ArrowRight" && e.shiftKey) {
        setStepIndex(stepsLength - 1);
        return;
      }

      if (e.key === "ArrowLeft" && e.shiftKey) {
        setStepIndex(0);
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          setStepIndex((i) => Math.min(stepsLength - 1, i + 1));
          break;
        case "ArrowLeft":
          setStepIndex((i) => Math.max(0, i - 1));
          break;
        case "f":
        case "F":
          setIsFullscreen((f) => !f);
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    stepIndex,
    stepsLength,
    setIsPlaying,
    setStepIndex,
    setIsFullscreen,
    openModal,
  ]);

  const ctx: PlaybackContextType = {
    stepIndex,
    stepsLength,
    isPlaying,
    speed,
    isFullscreen,
    setStepIndex,
    setIsPlaying,
    setSpeed,
    setIsFullscreen,
  };

  return (
    <PlaybackContext.Provider value={ctx}>{children}</PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const ctx = useContext(PlaybackContext);
  if (!ctx) throw new Error("usePlayback must be used inside PlaybackProvider");
  return ctx;
}
