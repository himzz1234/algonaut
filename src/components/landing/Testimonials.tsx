import TestimonialCard from "./TestimonialCard";
import { motion } from "motion/react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Jane D.",
      role: "CS Student",
      quote:
        "AlgoVisualizer made algorithms finally click for me. The visuals kept me engaged and motivated.",
    },
    {
      id: 2,
      name: "Alex P.",
      role: "Interview Prep",
      quote:
        "Practicing with interactive steps gave me confidence for my coding interviews. Super helpful!",
    },
    {
      id: 3,
      name: "Maya K.",
      role: "Hobbyist Developer",
      quote:
        "I always struggled with algorithms, but the guided learning paths made it fun and easy to follow.",
    },
  ];

  const renderTrack = (keySuffix: string, reverse = false) => (
    <motion.div
      className="flex w-max"
      animate={{
        x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      }}
      transition={{
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {[...testimonials, ...testimonials].map((t, idx) => (
        <div
          key={`${t.id}-${keySuffix}-${idx}`}
          className="w-[450px] mx-2 shrink-0"
        >
          <TestimonialCard testimonial={t} />
        </div>
      ))}
    </motion.div>
  );

  return (
    <section className="max-w-6xl mx-auto py-16 flex flex-col justify-center">
      <div className="text-center mb-12">
        <h2
          className="text-3xl py-1 md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
               bg-clip-text text-transparent"
        >
          What Learners{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Say
          </span>
        </h2>
        <p className="mt-2 text-lg md:text-xl text-gray-400">
          Hear from students, interviewees, and developers.
        </p>
      </div>

      <div className="overflow-hidden relative py-1 fade-mask -mx-40">
        {renderTrack("row1", false)}
      </div>

      <div className="mt-16 text-center">
        <p className="text-xl text-gray-300 mb-6">
          Join <span className="text-green-400 font-semibold">100+</span>{" "}
          learners mastering algorithms with AlgoVisualizer.
        </p>
        <button className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition">
          Start Visualizing
        </button>
      </div>
    </section>
  );
}
