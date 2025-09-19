import { Link } from "react-router-dom";
import ProgressCircle from "../ui/ProgressCircle";
import { useEffect, useState } from "react";
import { FiBookOpen, FiClock } from "react-icons/fi"; // <-- import clock icon

type LearningPathCardProps = {
  title: string;
  description: string;
  progress: number;
  href: string;
  duration?: string;
  lessons: number;
};

export default function LearningPathCard({
  title,
  description,
  progress,
  href,
  duration,
  lessons,
}: LearningPathCardProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 200);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <Link to={href} aria-label={`Go to ${title} learning path`}>
      <div
        className="relative w-full h-auto sm:h-48 rounded-xl p-4 flex flex-col justify-between
        bg-[#0f1014] border border-gray-800 shadow-md
        transition-all duration-500 overflow-hidden group
        hover:scale-[1.03] hover:border-green-400/60 hover:shadow-lg hover:shadow-green-500/20"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-400/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="flex items-start justify-between relative z-10 h-full">
          <div className="pr-3 flex flex-col h-full">
            <h3 className="text-lg sm:text-lg font-semibold text-white">
              {title}
            </h3>

            <p className="text-gray-400 flex-1 text-sm sm:text-base mt-1 line-clamp-3">
              {description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
              <span className="flex items-center gap-1">
                <FiClock className="w-4 h-4" /> {duration}
              </span>
              <span className="flex items-center gap-1">
                <FiBookOpen className="w-4 h-4" /> {lessons} lessons
              </span>
            </div>
          </div>
          <ProgressCircle progress={animatedProgress} />
        </div>
      </div>
    </Link>
  );
}
