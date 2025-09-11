import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

interface LinearProgressBarProps {
  progress: number;
  height?: number;
  trackClassName?: string;
  fillClassName?: string;
  showLabel?: boolean;
  className?: string;
  once?: boolean;
}

export default function LinearProgressBar({
  progress,
  height = 12,
  trackClassName = "bg-[rgba(255,255,255,0.1)]",
  fillClassName = "bg-green-500",
  showLabel = true,
  className = "",
  once = true,
}: LinearProgressBarProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once });

  const motionPct = useMotionValue(0);
  const width = useTransform(motionPct, (v) => `${v}%`);

  useEffect(() => {
    const clamped = Math.max(0, Math.min(100, progress));
    const controls = inView
      ? animate(motionPct, clamped, { duration: 0.9, ease: "easeOut" })
      : animate(motionPct, 0, { duration: 0.3, ease: "easeOut" });

    return () => controls.stop();
  }, [inView, progress]);

  return (
    <div className={`w-full ${className}`} ref={ref}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className={`relative overflow-hidden rounded-full ${trackClassName}`}
        style={{ height }}
      >
        <motion.div
          style={{ width }}
          className={`h-full ${fillClassName} rounded-full`}
          aria-hidden={true}
        />

        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-xs font-medium text-white">
            <motion.span style={{ transform: "translateZ(0)" }}>
              {Math.round(progress)}%
            </motion.span>
          </div>
        )}
      </div>
    </div>
  );
}
