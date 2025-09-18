import { motion } from "framer-motion";
import { usePlayback } from "../../context/PlaybackContext";

interface ProgressSliderProps {
  stepsLength: number;
  className?: string;
}

export default function ProgressSlider({
  stepsLength,
  className,
}: ProgressSliderProps) {
  const { stepIndex, setStepIndex } = usePlayback();
  const progress = stepsLength > 1 ? stepIndex / (stepsLength - 1) : 0;

  return (
    <div
      className={`flex-1 h-1 bg-gray-700/60 relative cursor-pointer rounded-full ${className}`}
      onClick={(e) => {
        const rect = (
          e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newIndex = Math.round((x / rect.width) * (stepsLength - 1));
        setStepIndex(newIndex);
      }}
    >
      <motion.div
        className="h-full bg-green-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
