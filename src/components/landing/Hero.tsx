import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import type { Variants } from "motion/react";

const container = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.42, 0, 0.58, 1],
      delay,
      staggerChildren: 0.08,
    },
  },
});

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.42, 0, 0.58, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen lg:max-w-6xl lg:mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center min-h-[calc(100vh-180px)] flex flex-col items-center justify-center"
        initial="hidden"
        animate="show"
        variants={container()}
      >
        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight"
        >
          Visualize{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Algorithms
          </span>
          .
        </motion.h1>

        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 bg-clip-text text-transparent leading-tight"
        >
          Learn <span>Faster</span>.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-lg sm:max-w-2xl mx-auto px-2"
        >
          Experience a smarter way to master algorithms with interactive visuals
          and AI-powered explanations that adapt to your learning pace.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4"
        >
          <Link to="/visualize" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition">
              Start Visualizing
            </button>
          </Link>
          <Link to="/algorithms" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 text-base sm:text-lg font-medium text-green-400 border border-green-400 rounded-lg hover:bg-green-400/10 transition">
              Browse Algorithms
            </button>
          </Link>
        </motion.div>
      </motion.div>

      <main className="relative max-w-4xl mx-auto mt-10 md:mt-0">
        <motion.img
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
          src="/images/demo-screenshot.png"
          alt="AlgoVisualizer demo"
          className="w-full h-auto shadow-xl relative z-10 rounded-md sm:rounded-lg"
          loading="eager"
          decoding="async"
          style={{ willChange: "transform, opacity" }}
        />
        <div className="absolute bottom-0 left-0 w-full h-auto sm:h-60 md:h-80 bg-gradient-to-t from-[#000] from-20% to-transparent z-20" />
      </main>
    </div>
  );
}
