import { useEffect, useRef } from "react";
import Navbar from "../Navbar";
import { motion, AnimatePresence } from "motion/react";

interface VisualizerLayoutProps {
  children: React.ReactNode;
  controls: React.ReactNode;
  slider: React.ReactNode;
  sidebar?: React.ReactNode;
  info?: React.ReactNode;
  logs?: string[];
}

export default function VisualizerLayout({
  children,
  controls,
  slider,
  sidebar,
  info,
  logs = [],
}: VisualizerLayoutProps) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sidebarRef?.current) {
      sidebarRef.current.scrollTo({
        top: sidebarRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [logs]);

  return (
    <main className="bg-[#0f0f14] min-h-screen text-white">
      <Navbar />
      <section className="min-h-[calc(100vh-80px)] max-w-7xl mx-auto px-10 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 border border-gray-700/60 rounded-lg p-4 backdrop-blur-sm">
            <div className="h-[420px] flex items-center text-gray-500 border border-dashed border-green-600/40 rounded-t-lg rounded-b-sm">
              {children}
            </div>
            {slider}
            {controls}
          </div>

          <div className="col-span-4 border border-gray-700/60 rounded-lg p-4 backdrop-blur-sm">
            {sidebar ?? (
              <>
                <div className="mb-4 font-medium text-lg text-white">
                  Algorithm Steps
                </div>
                <div
                  ref={sidebarRef}
                  className="max-h-[420px] overflow-y-auto text-sm text-gray-400 space-y-2 no-scrollbar"
                >
                  <AnimatePresence>
                    {logs.map((log, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="border border-gray-700/60 p-2 rounded"
                      >
                        {log}
                      </motion.p>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 backdrop-blur-sm">
          {info ?? <div className="text-gray-400">No info available</div>}
        </div>
      </section>
    </main>
  );
}
