import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiX, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { quizzes, type Question } from "../data/quizzes";

export default function QuizWindow({
  onClose,
  onFinish,
  algorithmKey,
}: {
  algorithmKey: string;
  onClose?: () => void;
  onFinish?: (score: number, total: number) => void;
}) {
  const sampleQuestions: Question[] = quizzes[algorithmKey] ?? [];
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const [phase, setPhase] = useState<"intro" | "quiz" | "finished">("intro");

  if (!sampleQuestions.length) return null;
  const q = sampleQuestions[current];

  const handleAnswer = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (current < sampleQuestions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setPhase("finished");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === "finished") {
      onFinish?.(score, sampleQuestions.length);

      timer = setTimeout(() => {
        onClose?.();
        clearTimeout(timer);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="absolute flex items-center justify-center inset-0 z-20 w-full h-full bg-black/70 backdrop-blur-sm rounded-t-lg rounded-b-sm">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-gradient-to-b from-[#111214] to-[#0f1014] 
               border border-green-600/40 rounded-2xl
               px-6 py-8 sm:px-8 sm:py-6
               w-full max-w-xs sm:max-w-sm md:max-w-md min-h-60 
               text-center text-white shadow-2xl flex flex-col items-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 bg-[#00a73e] rounded-b-full" />

            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-medium mb-3 text-balance leading-normal text-white">
                Congratulations on completing the visualization.
              </h2>
              <p className="text-sm md:text-base text-gray-400 mb-6 text-balance">
                Now, let's test your understanding with a quiz.
              </p>
            </div>

            <button
              onClick={() => setPhase("quiz")}
              className="w-fit px-5 py-2 rounded-md text-sm md:text-base 
             bg-gradient-to-r from-green-500 to-emerald-600
             hover:from-green-400 hover:to-emerald-500
             text-white font-medium shadow-lg
             transition-transform hover:scale-105"
            >
              Start Quiz
            </button>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 sm:w-40 h-10 sm:h-12 bg-green-500/20 blur-2xl rounded-full" />
          </motion.div>
        )}

        {phase === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-gradient-to-b from-[#111214] to-[#0f1014] 
             border border-green-600/40 rounded-xl 
             p-4 sm:p-6 
             w-full max-w-xs sm:max-w-sm md:max-w-md 
             shadow-2xl text-white"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 bg-green-500 rounded-b-full" />

            <button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-red-400"
              onClick={onClose}
            >
              <FiX size={18} className="sm:w-5 sm:h-5" />
            </button>

            <p className="text-xs md:text-sm text-gray-400 mb-2">
              Question {current + 1} of {sampleQuestions.length}
            </p>

            <h2 className="text-base md:text-xl font-medium mb-4">
              {q.question}
            </h2>

            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isCorrect = answered && i === q.answer;
                const isWrong = answered && selected === i && i !== q.answer;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className={`w-full px-3 border-gray-800/40 border py-2 sm:px-4 sm:py-2.5 rounded flex items-center justify-between transition
            ${
              isCorrect
                ? "bg-green-700/80 border-green-500"
                : isWrong
                ? "bg-red-700/80 border-red-500"
                : "bg-gray-800/40 hover:bg-green-700/80"
            }`}
                  >
                    <span className="text-sm md:text-base text-left">
                      {opt}
                    </span>
                    {isCorrect && (
                      <FiCheckCircle className="text-green-300 w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-4 sm:mt-6">
              <button
                onClick={nextQuestion}
                className="w-fit px-5 py-2 rounded-md 
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-green-400 hover:to-emerald-500
                text-white font-medium shadow-lg
                transition-transform hover:scale-105 flex items-center text-sm md:text-base"
              >
                {current < sampleQuestions.length - 1 ? "Next" : "Finish"}
                <FiArrowRight className="w-4 h-4 ml-2 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 sm:w-40 h-10 sm:h-12 bg-green-500/20 blur-2xl rounded-full" />
          </motion.div>
        )}

        {phase === "finished" && (
          <motion.div
            key="finished"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-gradient-to-b from-[#111214] to-[#0f1014] 
               border border-green-600/40 rounded-2xl
               px-6 py-8 sm:px-8 sm:py-6
               w-full max-w-xs sm:max-w-sm md:max-w-md min-h-48 
               text-center text-white shadow-2xl flex flex-col items-center justify-between"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 bg-green-500 rounded-b-full" />
            <h2 className="text-lg md:text-2xl font-medium mb-4 sm:mb-6 leading-snug text-balance">
              Congratulations, you’ve completed this quiz
            </h2>
            <div>
              <p className="text-sm md:text-base text-gray-300">Your score</p>
              <p className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 tracking-tight">
                {score} / {sampleQuestions.length}
              </p>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 sm:w-40 h-10 sm:h-12 bg-green-500/20 blur-2xl rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
