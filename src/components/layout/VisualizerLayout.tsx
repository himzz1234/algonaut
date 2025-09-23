import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import RotateBanner from "../RotateBanner";
import { useOrientation } from "../../hooks/useOrientation";
import { usePlayback } from "../../context/PlaybackContext";
import type { Step } from "../../algorithms/types";
import QuizWindow from "../QuizWindow";
import { PseudoCodeBlock } from "./PseudoCodeBlock";
import ProgressSlider from "../ui/ProgressSlider";
import Controls from "./Controls";
import AlgorithmInfoWrapper from "./AlgorithmInfoWrapper";
import { saveProgress, getProgress } from "../../helpers/progress";
import { useAuth } from "../../context/AuthContext";
import { MdQuiz } from "react-icons/md";
import UpNextCard from "../UpNextCard";

interface VisualizerLayoutProps<TStep> {
  type: "demo" | "learn";
  algorithmKey: string;
  children: React.ReactNode;
  steps: TStep[];
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

  const isDemo = type === "demo";
  const explanation = steps[stepIndex]?.explanation ?? "";

  const shouldShowRotateBanner =
    !isFullscreen && isMobile && isPortrait && !isDemo;

  useEffect(() => {
    if (!shouldShowRotateBanner && !isFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [shouldShowRotateBanner, isFullscreen]);

  useEffect(() => {
    const startQuiz = async () => {
      const progress = await getProgress(user?.uid || "", algorithmKey);
      if (!isPlaying && stepIndex === steps.length - 1) {
        if (user)
          saveProgress(user.uid, algorithmKey, {
            visualizationCompleted: true,
          });

        if (progress?.quizCompleted) return;
        const timer = setTimeout(async () => {
          setShowQuiz(true);
          setLocked(true);
          clearTimeout(timer);
        }, 500);

        return () => clearTimeout(timer);
      }
    };

    startQuiz();
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

  const captionBottomClass = isMobile ? "bottom-16" : "bottom-20";

  return (
    <div className="bg-[#000] min-h-screen text-white">
      {shouldShowRotateBanner ? (
        <RotateBanner />
      ) : (
        <section className="min-h-[calc(100vh-80px)] max-w-7xl mx-auto sm:px-6 md:px-10 pt-0 pb-8 sm:pt-8">
          <div className="grid grid-cols-12 gap-4">
            <div
              className={`border border-gray-700/60 md:rounded-lg ${
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
                text-gray-500 rounded-t-lg rounded-b-sm
                flex-1 
              `}
              >
                <button
                  title="Start quiz"
                  onClick={() => setShowQuiz(true)}
                  className="z-10 absolute right-2.5 top-2.5 active:scale-95 transition-all hover:bg-[#141414] duration-150 px-1 py-1 sm:px-2 sm:py-2 lg:px-2 lg:py-2 text-lg sm:text-2xl rounded-md"
                >
                  <MdQuiz />
                </button>
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
                      className="mx-auto max-w-[min(100%,52rem)] w-fit whitespace-nowrap bg-[#141414]/80 backdrop-blur-md text-center py-2 px-4 rounded text-sm lg:text-base text-white/90 pointer-events-auto"
                    >
                      {explanation}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-5 pb-1 sm:pb-1.5 lg:pb-2">
                <ProgressSlider
                  stepsLength={steps.length}
                  className="mx-auto"
                />

                {!isDemo && <Controls />}
              </div>
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
      )}
    </div>
  );
}
