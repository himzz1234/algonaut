import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { algorithms, type AlgorithmMeta } from "../../data/algorithms";
import Footer from "../../components/Footer";
import type { Variants } from "motion";
import { motion } from "motion/react";
import Select from "../../components/ui/Select";

const ALGO_CATEGORIES = [
  "All",
  "Sorting",
  "Arrays",
  "Linked Lists",
  "Strings",
  "Searching",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
];

function AlgoCard({ algorithm }: { algorithm: AlgorithmMeta }) {
  const Wrapper: any = algorithm.href ? Link : "div";
  const wrapperProps: any = algorithm.href ? { to: algorithm.href } : {};

  const isComingSoon = !algorithm.href;

  return (
    <Wrapper
      {...wrapperProps}
      aria-label={
        algorithm.href
          ? `Open ${algorithm.name}`
          : `${algorithm.name} (Coming Soon)`
      }
      className={`block transition-transform duration-150 ${
        algorithm.href ? "hover:-translate-y-1" : "opacity-95"
      }`}
    >
      <article
        className={`relative w-full h-52 rounded-xl p-4 flex flex-col
          bg-[#0f1014] border border-gray-700/60
          shadow-md transition-all duration-300 overflow-hidden
          ${
            algorithm.href
              ? "hover:shadow-green-500/20 hover:border-green-400/50 group"
              : "opacity-80"
          }
        `}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-green-500/8 via-transparent to-green-400/8
            opacity-0 ${
              algorithm.href ? "group-hover:opacity-100" : ""
            } transition-opacity duration-300 pointer-events-none`}
        />

        <div className="flex flex-col items-start flex-1 relative z-10">
          <h3 className="text-base md:text-xl font-medium text-white line-clamp-1">
            {algorithm.name}
          </h3>

          <p className="mt-1 flex-1 text-gray-400 text-sm md:text-[15px] leading-normal line-clamp-4">
            {algorithm.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 items-center">
            {algorithm?.tags && (
              <div className="flex flex-wrap gap-2">
                {algorithm?.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-sm font-light bg-gray-700/40 text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {isComingSoon && (
          <div className="absolute inset-0 rounded-xl bg-black/30 pointer-events-none" />
        )}
      </article>
    </Wrapper>
  );
}

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("Any");

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

  const DIFFICULTY_OPTIONS = ["Any", "Easy", "Medium", "Hard"];

  const filtered = useMemo(() => {
    return Object.values(algorithms).filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (difficultyFilter !== "Any" && a.difficulty !== difficultyFilter)
        return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q)
      );
    });
  }, [query, category, difficultyFilter]);

  return (
    <>
      <Navbar />

      <header>
        <div className="flex flex-col items-center justify-center lg:max-w-6xl lg:mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container()}
            className="text-center"
          >
            <motion.h1
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent leading-tight"
            >
              <span className="text-green-500">Algorithm</span> Library
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-2 md:mt-4 text-base sm:text-lg md:text-xl text-gray-400 max-w-lg sm:max-w-2xl mx-auto px-2 leading-relaxed"
            >
              A place to explore algorithms on demand, search what you need, and
              see them come to life through visualization.
            </motion.p>
          </motion.div>
        </div>
      </header>

      <section className="lg:max-w-6xl lg:mx-auto px-4 sm:px-6 lg:px-8 md:pt-16 pb-16 space-y-12">
        <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-xl bg-white/5 dark:bg-black/30 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search algorithms..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 py-2.5 rounded-md border border-white/10 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm sm:text-base"
            />
          </div>

          <div className="w-full sm:w-56 flex flex-1 gap-3">
            <Select
              options={DIFFICULTY_OPTIONS}
              selected={difficultyFilter}
              onSelect={(v) => setDifficultyFilter(v)}
              placement="bottom"
            >
              {({ toggle, isOpen }) => (
                <button
                  onClick={toggle}
                  className="w-full h-full px-4 py-2 rounded-md flex justify-between items-center bg-[#0f1014] backdrop-blur-sm text-gray-200 border border-gray-700/60 hover:border-green-400/50 hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-green-400 transition-all duration-200 text-sm sm:text-base"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                >
                  {difficultyFilter}
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </Select>

            <Select
              options={ALGO_CATEGORIES}
              selected={category}
              onSelect={(v) => setCategory(v)}
              placement="bottom"
            >
              {({ toggle, isOpen }) => (
                <button
                  onClick={toggle}
                  className="w-full h-full px-4 py-2 rounded-md flex justify-between items-center bg-[#0f1014] backdrop-blur-sm text-gray-200 border border-gray-700/60 hover:border-green-400/50 hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-green-400 transition-all duration-200 text-sm sm:text-base"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                >
                  {category}
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </Select>
          </div>
        </div>

        <main>
          <div className="grid grid-cols-12 gap-8">
            <aside className="col-span-3">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <ul className="flex flex-col gap-2">
                  {ALGO_CATEGORIES.map((c) => (
                    <li key={c}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md ${
                          category === c
                            ? "bg-green-600/20 text-green-300"
                            : "text-gray-200 hover:bg-gray-800/40"
                        }`}
                        onClick={() => setCategory(c)}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <section className="col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.length === 0 ? (
                  <div className="col-span-3 text-center text-gray-400">
                    No algorithms match your filters.
                  </div>
                ) : (
                  filtered.map((algo, index) => (
                    <AlgoCard key={index} algorithm={algo} />
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </section>

      <Footer />
    </>
  );
}
