import { LearningPathSection } from "../../components/LearningPathSection";
import { modules } from "../../data/modules";
import type { Variants } from "motion";
import { motion } from "motion/react";
import StatsGrid from "../../components/StatsGrid";
import { Helmet } from "react-helmet";

export default function LearnPage() {
  const beginner = modules.filter((m) => m.level === "beginner");
  const intermediate = modules.filter((m) => m.level === "intermediate");
  const interview = modules.filter((m) => m.level === "interview");

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

  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
      }}
    >
      <Helmet>
        <title>Learn Algorithms - Algonaut</title>
        <meta
          name="description"
          content="Follow structured learning paths to master algorithms from beginner fundamentals to advanced interview preparation. Learn step-by-step with visualizations and quizzes."
        />
        <meta property="og:title" content="Learn Algorithms | Algonaut" />
        <meta
          property="og:description"
          content="Explore guided learning paths for algorithms, covering sorting, recursion, graphs, and interview prep topics. Visual and interactive learning at its best."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <header>
        <div className="flex flex-col items-center justify-center lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-0 py-16">
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
              <span className="text-green-500">Learning</span> Paths
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-2 md:mt-4 text-base sm:text-lg md:text-xl text-gray-400 max-w-lg sm:max-w-2xl mx-auto px-2 leading-relaxed"
            >
              Follow guided paths to master algorithmic concepts, <br />
              from the basics to advanced topics.
            </motion.p>
          </motion.div>
        </div>
      </header>

      <section className="lg:max-w-6xl lg:mx-auto px-4 sm:px-6 lg:px-8 md:pt-16 pb-16 space-y-12">
        <StatsGrid />
        <LearningPathSection
          id="path_beginner"
          title="Beginner"
          accentClass="text-green-500"
          modules={beginner}
        />
        <LearningPathSection
          id="path_intermediate"
          title="Intermediate"
          accentClass="text-cyan-400"
          modules={intermediate}
        />
        <LearningPathSection
          id="path_interview_prep"
          title="Interview Prep"
          accentClass="text-fuchsia-400"
          modules={interview}
        />
      </section>
    </div>
  );
}
