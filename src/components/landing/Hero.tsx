import { motion } from "motion/react";
import { Link } from "react-router-dom";
import type { Variants } from "motion/react";
import { FaLock } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

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
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center md:min-h-screen lg:max-w-6xl lg:mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center md:min-h-[calc(100vh-180px)] flex flex-col items-center justify-center"
        initial="hidden"
        animate="show"
        variants={container()}
      >
        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight"
        >
          Visualize{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Algorithms
          </span>
          .
        </motion.h1>

        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight"
        >
          Learn <span className="text-emerald-500">Faster</span>.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-2 md:mt-3 text-sm sm:text-base md:text-lg text-gray-400 max-w-md sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed"
        >
          Experience a smarter way to master algorithms with interactive visuals
          and AI-powered explanations that adapt to your learning pace.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <Link to="/learn/sorting?algorithm=bubble-sort">
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition">
              Start Visualizing
            </button>
          </Link>

          <Link to="/explore">
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-green-400 border border-green-400 rounded-lg hover:bg-green-400/10 transition">
              Browse Algorithms
            </button>
          </Link>
        </motion.div>
      </motion.div>

      <main className="relative max-w-5xl mx-auto mt-10 md:mt-0">
        <div className="rounded-xl bg-[#111] border border-gray-800 border-b-0 overflow-hidden shadow-lg">
          <div className="flex items-center px-3 py-2 bg-[#1a1a1a]">
            <div className="flex space-x-2">
              <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></span>
              <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></span>
              <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></span>
            </div>

            <div className="mx-2.5 md:mx-0 md:ml-5 text-sm md:text-base flex items-center flex-1 max-w-lg bg-black px-3 py-1.5 rounded-md font-mono text-gray-400">
              <FaLock className="text-green-500 mr-2" />
              <span className="text-green-500">https://</span>algonaut.io
            </div>

            <div className="ml-auto text-gray-400">
              <FiMoreHorizontal size={24} />
            </div>
          </div>

          <div className="bg-black">
            <picture>
              <source srcSet="/images/demo-screenshot.avif" type="image/avif" />
              <img
                src="/images/demo-screenshot.png"
                alt="Algorithm visualizer demo"
                width="338"
                height="209"
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </picture>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
        </div>
      </main>
    </div>
  );
}
