import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Faqs() {
  const faqs = [
    {
      question: "Is Algonaut free to use?",
      answer:
        "Yes! You can start exploring algorithms and using basic visualizations completely free. We’re working on a Pro plan with advanced features for power learners.",
    },
    {
      question: "Do I need prior coding experience?",
      answer:
        "Not at all. The visual explanations are beginner-friendly, but you’ll also find advanced details like time & space complexity for deeper study.",
    },
    {
      question: "Which algorithms are included?",
      answer:
        "We cover a wide range, from sorting and searching to graph traversal and dynamic programming. New algorithms are added regularly.",
    },
    {
      question: "Can this help with coding interviews?",
      answer:
        "Definitely. The guided paths and interactive practice steps are designed to boost your problem-solving skills and confidence in interviews.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
            bg-clip-text text-transparent leading-snug"
        >
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-400 text-balance">
          Everything you need to know about Algonaut.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            className="rounded-lg bg-[#121316] py-4 border border-gray-800 overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className={`${
                openIndex === i
                  ? "text-green-400"
                  : "text-white hover:text-green-400"
              } w-full flex items-center justify-between px-6 text-left transition-colors`}
            >
              <span className="text-base sm:text-lg font-medium">
                {faq.question}
              </span>
              <motion.svg
                initial={{ rotate: 0 }}
                animate={openIndex === i ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 ml-2 flex-shrink-0"
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
              </motion.svg>
            </button>

            <AnimatePresence>
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={
                  openIndex === i
                    ? { height: "auto", opacity: 1, marginTop: 10 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden px-6 text-sm sm:text-base text-gray-400 leading-relaxed"
              >
                {faq.answer}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
