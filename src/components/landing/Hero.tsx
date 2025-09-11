import { motion } from "motion/react";
import { Link } from "react-router-dom";
import type { Variants } from "motion/react";
import { FaLock } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import FloydDemo from "../demos/FloydDemo";

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
          className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight"
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
          <Link
            to="/learn/sorting?algorithm=bubble-sort"
            className="w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-6 py-3 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition">
              Start Visualizing
            </button>
          </Link>
          <Link to="/explore" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 text-base sm:text-lg font-medium text-green-400 border border-green-400 rounded-lg hover:bg-green-400/10 transition">
              Browse Algorithms
            </button>
          </Link>
        </motion.div>
      </motion.div>

      <main className="relative max-w-4xl mx-auto mt-10 md:mt-0">
        <div className="rounded-xl bg-[#111] border border-gray-800 overflow-hidden shadow-lg">
          <div className="flex items-center px-3 py-2 bg-[#1a1a1a]">
            <div className="flex space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>

            <div className="ml-5 flex items-center flex-1 max-w-lg bg-black px-3 py-1.5 rounded-md font-mono text-gray-400">
              <FaLock className="text-green-500 mr-2" />
              <span className="text-green-500">https://</span>algonaut.io
            </div>

            <div className="ml-auto text-gray-400">
              <FiMoreHorizontal size={24} />
            </div>
          </div>

          <div className="p-4 bg-black opacity-80">
            <FloydDemo />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[600px] z-20 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="35%" stopColor="#000" stopOpacity="1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,256 C480,320 960,192 1440,256 L1440,320 L0,320 Z"
              fill="url(#gradient)"
            />
          </svg>
        </div>
      </main>
    </div>
  );
}
