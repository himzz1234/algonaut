import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ReadySection() {
  return (
    <main className="pt-16 sm:pb-16 flex items-center justify-center max-w-6xl mx-auto sm:px-6 lg:px-8">
      <section className="relative py-16 sm:py-20 md:py-24 w-full overflow-hidden bg-[#0a0b0f] sm:rounded-3xl">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-green-500/30 rounded-full blur-[100px] sm:blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-green-400/20 rounded-full blur-[80px] sm:blur-[100px]" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center px-4">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
              bg-clip-text text-transparent leading-snug"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              master algorithms?
            </span>
          </motion.h2>

          <motion.p className="mt-2 text-base sm:text-lg md:text-xl text-gray-400 text-balance">
            Join thousands of others and learn smarter, faster with Algonaut.
          </motion.p>

          <motion.div className="mt-8 sm:mt-10">
            <Link to="/learn/sorting?algorithm=bubble-sort">
              <button
                className="px-6 sm:px-8 py-3 text-sm sm:text-lg rounded-lg font-medium text-white 
                  bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] 
                  transition-colors duration-300 shadow-lg"
              >
                Start Visualizing
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
