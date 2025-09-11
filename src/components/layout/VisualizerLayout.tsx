import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import RotateBanner from "../RotateBanner";
import { useOrientation } from "../../hooks/useOrientation";
import { usePlayback } from "../../context/PlaybackContext";
import type { Step } from "../../algorithms/types";
interface VisualizerLayoutProps<TStep> {
  children: React.ReactNode;
  steps: TStep[];
  controls: React.ReactNode;
  slider: React.ReactNode;
  sidebar?: React.ReactNode;
  info?: React.ReactNode;
  pseudocode: React.ReactNode;
}

export default function VisualizerLayout<TStep extends Step>({
  children,
  steps,
  controls,
  slider,
  info,
  pseudocode,
}: VisualizerLayoutProps<TStep>) {
  const { isFullscreen, stepIndex } = usePlayback();
  const { isPortrait, isMobile } = useOrientation();
  const explanation = steps[stepIndex].explanation ?? "";

  const shouldShowRotateBanner = !isFullscreen && isMobile && isPortrait;
  useEffect(() => {
    if (!shouldShowRotateBanner) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [shouldShowRotateBanner]);

  if (shouldShowRotateBanner) {
    return (
      <main className="bg-[#0f0f14] min-h-screen text-white relative">
        <RotateBanner />
      </main>
    );
  }

  const captionBottomClass = isFullscreen
    ? "bottom-3"
    : isMobile
    ? "bottom-2"
    : "bottom-6";

  return (
    <main className="bg-[#0f0f14] min-h-screen text-white">
      <section className="min-h-[calc(100vh-80px)] max-w-7xl mx-auto sm:px-6 md:px-10 pt-0 pb-8 sm:pt-8">
        <div className="grid grid-cols-12 gap-4">
          <div
            className={`border border-gray-700/60 md:rounded-lg p-4 ${
              isFullscreen
                ? "fixed inset-0 z-50 w-full h-full bg-[#0f0f14] flex flex-col min-h-0"
                : `col-span-12 ${
                    pseudocode ? "lg:col-span-8" : "lg:col-span-12"
                  } relative flex flex-col min-h-0`
            }`}
          >
            <div
              className={`${
                isFullscreen
                  ? "flex-1"
                  : "h-[450px] sm:min-h-[420px] md:min-h-[450px] lg:-h-[490px]"
              }
                relative flex items-center justify-center
                text-gray-500 border border-dashed border-b-0 border-green-600/40 rounded-t-lg rounded-b-sm
                flex-1 
              `}
            >
              {children}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-full px-2 pointer-events-none ${captionBottomClass}`}
              >
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={explanation}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto max-w-[min(100%,52rem)] w-fit whitespace-nowrap bg-black/30 backdrop-blur-md text-center py-2 px-4 rounded text-xs md:text-sm lg:text-base text-white/90 pointer-events-auto"
                  >
                    {explanation}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div>{slider}</div>
            <div>{controls}</div>
          </div>

          {pseudocode && (
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <div className="flex-1 border border-gray-700/60 rounded-lg backdrop-blur-sm">
                {pseudocode}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 px-4 sm:px-0 backdrop-blur-sm">
          {info ?? <div className="text-gray-400">No info available</div>}
        </div>
      </section>
    </main>
  );
}
