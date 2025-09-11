import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  once?: boolean;
}

export default function ProgressCircle({
  progress,
  size = 52,
  strokeWidth = 4,
  className,
  once = true,
}: ProgressCircleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const motionPct = useMotionValue(0);
  const dashOffset = useTransform(motionPct, (v) => {
    return circumference - (v / 100) * circumference;
  });

  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    const controls = inView
      ? animate(motionPct, Math.max(0, Math.min(100, progress)), {
          duration: 0.9,
          ease: "easeOut",
        })
      : animate(motionPct, 0, { duration: 0.3, ease: "easeOut" });

    const unsubscribe = motionPct.on("change", (v) => {
      setDisplayPct(Math.round(v));
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [inView, progress]);

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden={false}
    >
      <svg
        width={size}
        height={size}
        className="rotate-[-90deg]"
        role="img"
        aria-label={`${Math.round(progress)}%`}
      >
        <circle
          stroke="rgba(255,255,255,0.06)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        <motion.circle
          stroke="#00c77b"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "none" }}
        />
      </svg>

      <span className="absolute text-xs text-white select-none pointer-events-none">
        {displayPct}%
      </span>
    </div>
  );
}
