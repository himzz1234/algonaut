import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import RotateBanner from "../RotateBanner";
import { useOrientation } from "../../hooks/useOrientation";
import { usePlayback } from "../../context/PlaybackContext";
import type { Step } from "../../algorithms/types";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import useUpNext from "../../hooks/useUpNext";
import QuizWindow from "../QuizWindow";
import { PseudoCodeBlock } from "./PseudoCodeBlock";
import ProgressSlider from "../ui/ProgressSlider";
import Controls from "./Controls";
import AlgorithmInfoWrapper from "./AlgorithmInfoWrapper";
import { saveProgress } from "../../helpers/progress";
import { useAuth } from "../../context/AuthContext";

interface VisualizerLayoutProps<TStep> {
  type: "demo" | "learn";
  algorithmKey: string;
  children: React.ReactNode;
  steps: TStep[];
}

function UpNextCard() {
  const nextAlgo = useUpNext();
  if (!nextAlgo) return null;
  if (!nextAlgo.href) return null;

  return (
    <Link
      to={nextAlgo.href}
      className="absolute bottom-7.5 right-0 cursor-pointer
        flex items-center justify-between gap-2
        backdrop-blur-md bg-[#0f1014] border border-gray-700/60 shadow-md 
        rounded-l-lg px-3 py-2 w-48
        hover:bg-green-500/40 transition-all z-20"
    >
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-green-400 uppercase">Up Next</span>
        <span className="text-sm sm:text-base mt-2 text-white truncate max-w-32">
          {nextAlgo.name}
        </span>
      </div>
      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      >
        <FiChevronRight className="text-gray-300" size={18} />
      </motion.div>{" "}
    </Link>
  );
}

export default function VisualizerLayout<TStep extends Step>({
  steps,
  children,
  type = "learn",
  algorithmKey,
}: VisualizerLayoutProps<TStep>) {
  const { user } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const { isPortrait, isMobile } = useOrientation();
  const { isFullscreen, stepIndex, isPlaying, setLocked } = usePlayback();
  const explanation = steps[stepIndex]?.explanation ?? "";

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

  useEffect(() => {
    if (!isPlaying && stepIndex === steps.length - 1) {
      if (user)
        saveProgress(user.uid, algorithmKey, { visualizationCompleted: true });

      const timer = setTimeout(() => {
        setShowQuiz(true);
        setLocked(true);
        clearTimeout(timer);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, stepIndex, steps.length, user]);

  const closeQuizWindow = () => {
    setShowQuiz(false);
    setLocked(false);
  };

  const isQuizCompleted = (score: number, total: number) => {
    if (!user) return;
    saveProgress(user.uid, algorithmKey, {
      quizCompleted: true,
      lastQuizScore: score,
      quizTotal: total,
    });
  };

  const captionBottomClass = isFullscreen
    ? "bottom-3"
    : isMobile
    ? "bottom-2"
    : "bottom-6";

  const isDemo = type === "demo";

  return (
    <main className="bg-[#0f0f14] min-h-screen text-white">
      <section className="min-h-[calc(100vh-80px)] max-w-7xl mx-auto sm:px-6 md:px-10 pt-0 pb-8 sm:pt-8">
        <div className="grid grid-cols-12 gap-4">
          <div
            className={`border border-gray-700/60 md:rounded-lg p-4 ${
              isFullscreen
                ? "fixed inset-0 z-50 w-full h-full bg-[#0f0f14] flex flex-col min-h-0"
                : `col-span-12 ${
                    type === "learn" ? "lg:col-span-8" : "lg:col-span-12"
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
              {stepIndex === steps.length - 1 && <UpNextCard />}
              {children}
              {showQuiz && (
                <QuizWindow
                  algorithmKey={algorithmKey}
                  onClose={closeQuizWindow}
                  onFinish={isQuizCompleted}
                />
              )}
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

            <div>
              <ProgressSlider
                stepsLength={steps.length}
                className="-mt-[5px] w-[99.75%] mx-auto"
              />
            </div>

            {!isDemo && <Controls />}
          </div>

          {type === "learn" && (
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <div className="flex-1 border border-gray-700/60 rounded-lg backdrop-blur-sm">
                <PseudoCodeBlock
                  algorithmKey={algorithmKey ?? ""}
                  steps={steps}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 px-4 sm:px-0 backdrop-blur-sm">
          <AlgorithmInfoWrapper algorithmKey={algorithmKey ?? ""} />
        </div>
      </section>
    </main>
  );
}
