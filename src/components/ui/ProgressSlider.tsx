import { motion } from "framer-motion";

interface ProgressSliderProps {
  stepIndex: number;
  stepsLength: number;
  onChange: (index: number) => void;
  className?: string;
}

export default function ProgressSlider({
  stepIndex,
  stepsLength,
  onChange,
  className,
}: ProgressSliderProps) {
  const progress = stepsLength > 1 ? stepIndex / (stepsLength - 1) : 0;

  return (
    <div
      className={`flex-1 h-1 bg-gray-700/60 relative cursor-pointer rounded-b-sm ${className}`}
      onClick={(e) => {
        const rect = (
          e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newIndex = Math.round((x / rect.width) * (stepsLength - 1));
        onChange(newIndex);
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
