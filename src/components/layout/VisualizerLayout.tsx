import { useEffect, useRef } from "react";
import Navbar from "../Navbar";
import { motion, AnimatePresence } from "motion/react";
import RotateBanner from "../RotateBanner";
import { useOrientation } from "../../hooks/useOrientation";

interface VisualizerLayoutProps {
  children: React.ReactNode;
  controls: React.ReactNode;
  slider: React.ReactNode;
  sidebar?: React.ReactNode;
  info?: React.ReactNode;
  logs?: string[];
  isFullScreen: boolean;
}

export default function VisualizerLayout({
  children,
  controls,
  slider,
  sidebar,
  info,
  logs = [],
  isFullScreen,
}: VisualizerLayoutProps) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const { isPortrait, isMobile } = useOrientation();

  useEffect(() => {
    if (sidebarRef?.current) {
      sidebarRef.current.scrollTo({
        top: sidebarRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [logs]);

  const shouldShowRotateBanner = !isFullScreen && isMobile && isPortrait;
  useEffect(() => {
    if (!shouldShowRotateBanner) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [shouldShowRotateBanner]);

  if (shouldShowRotateBanner) {
    return (
      <main className="bg-[#0f0f14] min-h-screen text-white relative">
        <RotateBanner />
      </main>
    );
  }

  const captionBottomClass = isFullScreen
    ? "bottom-3"
    : isMobile
    ? "bottom-2"
    : "bottom-6 sm:bottom-8 md:bottom-[12.5%]";

  const latestLog = logs.length ? logs[logs.length - 1] : "";

  return (
    <main className="bg-[#0f0f14] min-h-screen text-white">
      <Navbar />
      <section className="min-h-[calc(100vh-80px)] max-w-7xl mx-auto sm:px-6 md:px-10 pt-0 pb-8 sm:pt-8">
        <div className="grid grid-cols-12 gap-6">
          <div
            className={`border border-gray-700/60 md:rounded-lg p-4 ${
              isFullScreen
                ? "fixed inset-0 z-50 w-full h-full bg-[#0f0f14] flex flex-col min-h-0"
                : "col-span-12 md:col-span-8 relative flex flex-col min-h-0"
            }`}
          >
            <div
              className={`
                relative flex items-center justify-center
                text-gray-500 border border-dashed border-green-600/40 rounded-t-lg rounded-b-sm
                flex-1 min-h-[280px] md:min-h-[320px] lg:min-h-[410px]
              `}
            >
              {children}

              {(isFullScreen || isMobile) && latestLog && (
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-full px-2 pointer-events-none ${captionBottomClass}`}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={latestLog}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mx-auto max-w-[min(90%,52rem)] text-center p-2 rounded text-sm sm:text-base md:text-xl text-white/90 pointer-events-auto"
                    >
                      {latestLog}
                    </motion.p>
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div>{slider}</div>
            <div>{controls}</div>
          </div>

          <div className="hidden md:block col-span-4 border border-gray-700/60 rounded-lg p-4 backdrop-blur-sm">
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

        <div className="mt-5 px-4 sm:px-0 backdrop-blur-sm">
          {info ?? <div className="text-gray-400">No info available</div>}
        </div>
      </section>
    </main>
  );
}
