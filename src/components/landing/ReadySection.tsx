import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ReadySection() {
  return (
    <main className="py-16 flex items-center justify-center max-w-6xl mx-auto">
      <section className="relative py-24 w-full overflow-hidden bg-[#0a0b0f]  rounded-3xl">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <motion.h2
            className="text-4xl pb-2 md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
            bg-clip-text text-transparent"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              master algorithms?
            </span>
          </motion.h2>

          <motion.p className="text-lg md:text-xl text-gray-400 mt-2 text-balance">
            Join thousands of others and learn smarter, faster with
            Algovisualizer.
          </motion.p>

          <motion.div className="mt-10">
            <Link to="/visualize">
              <button
                className="px-8 py-3 text-lg rounded-lg font-medium text-white 
                bg-green-600 hover:bg-green-400 transition-colors
                shadow-lg "
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
